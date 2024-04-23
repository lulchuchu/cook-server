import { Request, Response } from 'express';
import CommentBlogModels from '../models/CommentBlog.model';
import BlogModels from '../models/Blog.models';
import bucket from '../configs/firebase';

class CmtBlogController {
    async createComment(req: Request, res: Response) {
        const bodyData = req.body;
        var url = '';
        const imgUri = bodyData.img;
        if (imgUri && imgUri?.uri !== '') {
            const decodedImage = Buffer.from(imgUri.uri, 'base64');
            const filename = `images/${Date.now()}.${imgUri.type}`;
            
            const file = bucket.file(filename);

            await file.save(decodedImage, {
                metadata: {
                    contentType: `image/${imgUri.type}`
                }
            });

            const result = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            });
            url = result[0];
        }
        const newComment = new CommentBlogModels({
            author: bodyData.author,
            content: bodyData.content,
            likes: [],
            img: url,
            idBlog: bodyData.idBlog,
        });
        try {
            const savedCmt = await newComment.save();
            if (savedCmt) {
                await BlogModels.updateOne({ _id: bodyData.idBlog }, { $push: { comments: savedCmt._id } });
                res.status(200).send(savedCmt);
            } else {
                res.status(401).send({ message: 'Comment not saved successfully' });
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async getCommentOfBlog(req: Request, res: Response): Promise<void> {
        try {
            const cmts = await CommentBlogModels.find({ idBlog: req.query.idBlog }).populate('author').exec();
            res.status(200).send(cmts.reverse());
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async likeCommentBlog(req: Request, res: Response): Promise<void> {
        try {
            const {idCmt, idUser} = req.body;

            const updateCmt = await CommentBlogModels.updateOne({_id: idCmt}, {
                $push: {
                    likes: idUser
                }
            });

            if (updateCmt) {
                res.status(200).send({message: 'Like successfully'});
            }
            else {
                res.status(400).send({message: 'Like failed'});
            }
        }
        catch(err: any) {
            res.status(500).send({ message: err.message});
        }
    }

    async dislikeCommentBlog(req: Request, res: Response): Promise<void> {
        try {
            const {idCmt, idUser} = req.body;

            const updateCmt = await CommentBlogModels.updateOne({_id: idCmt}, {
                $pull: {
                    likes: idUser
                }
            });

            if (updateCmt) {
                res.status(200).send({message: 'Dislike successfully'});
            }
            else {
                res.status(400).send({message: 'Dislike failed'});
            }
        }
        catch(err: any) {
            res.status(500).send({ message: err.message});
        }
    }
    
}

export default new CmtBlogController();
