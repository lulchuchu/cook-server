import { Request, Response } from 'express';
import BlogModels from '../models/Blog.models';
import bucket from '../configs/firebase';

interface Post {
    _id: string;
    content: string;
    author: string;
    accountLike: string[];
    numberShare: number;
    numberLike: number;
    imgDes: string[];
    comments: string[];
}

class BlogController {
    async createBlog(req: Request, res: Response): Promise<void> {
        const bodyRequest = req.body;
        const uriList = bodyRequest.imgDes;
        const urlImages = [];
        try {
            for (const image of uriList) {
                const decodedImage = Buffer.from(image.uri, 'base64');

                const filename = `images/${Date.now()}.${image.type || 'png'}`;
                const file = bucket.file(filename);

                await file.save(decodedImage, {
                    metadata: {
                        contentType: `image/${image.type || 'png'}`,
                    },
                });
                const url = await file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491',
                });
                urlImages.push(url[0]);
            }
        } catch (error) {
            console.log(error);
        }

        const newBlog = new BlogModels({
            imgDes: urlImages,
            content: bodyRequest.content,
            author: bodyRequest.author,
            acountLike: [],
            numberLike: 0,
            numberShare: 0,
            comments: [],
        });

        try {
            const savedBlog = await newBlog.save();
            if (savedBlog) {
                res.status(200).send(savedBlog);
            } else {
                res.status(400).send({ message: 'Failed' });
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async getBlogs(req: Request, res: Response) {
        try {
            const blogs = await BlogModels.find({}).populate('author').exec();
            res.status(200).send(blogs.reverse());
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    }

    async handleLike(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const updated = await BlogModels.updateOne(
                { _id: data.idBlog },
                {
                    $push: { accountLike: data.idUser },
                    $inc: { numberLike: 1 },
                },
            );

            if (updated) {
                res.status(200).send({ message: 'Updated successfully!' });
            } else {
                res.status(401).send({ message: 'Updated failed!' });
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async handleDislike(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const updated = await BlogModels.updateOne(
                { _id: data.idBlog },
                {
                    $pull: { accountLike: data.idUser },
                    $inc: { numberLike: -1 },
                },
            );

            if (updated) {
                res.status(200).send({ message: 'Updated successfully!' });
            } else {
                res.status(401).send({ message: 'Updated failed!' });
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }
}

export default new BlogController();
