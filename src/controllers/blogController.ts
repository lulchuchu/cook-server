import { Request, Response } from 'express';
import BlogModels from '../models/Blog.models';
import CommentBlogModels from '../models/CommentBlog.models';
import NguoiDungModel from "../models/NguoiDung.model";

interface IBlog {
    author: object;
    title: string;
    imgDes: string;
    content: string;
    shortDes: string;
    accountLike: any;
    numberLike: number;
    comments: any;
}       

class BlogController {
    async createBlog(req: Request, res: Response): Promise<void> {
        const bodyRequest = req.body;

        const newBlog = new BlogModels({
            title: bodyRequest.title,
            imgDes: bodyRequest.imgDes,
            content: bodyRequest.content,
            shortDes: bodyRequest.shortDes,
            author: bodyRequest.author,
            acountLike: [],
            numberLike: 0,
            comments: [],
        });

        try {
            const savedBlog = await newBlog.save();
            if (savedBlog) {
                res.status(200).send({ message: 'Successfully' });
            } else {
                res.status(401).send({ message: 'Failed' });
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    getBlogs(req: Request, res: Response) {
        BlogModels.find({})
            .then(blogs => {
                res.status(200).send(blogs);
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }

    async getComment(req: Request, res: Response):Promise<void> {
        try {
            const comments = await BlogModels.findOne({_id: req.params.idBlog})
                .populate('comments')
                .exec();
            
            if (!comments) {
                res.status(404).send({'message': 'Not found'});
            }
            res.status(200).send(comments);
        }
        catch(err: any) {
            res.status(err.status).send({'message': err.message});
        }
    }

    async handleLike(req: Request, res: Response):Promise<void> {
        try {
            const data = req.body;
            const blog = await BlogModels.findOne({'_id': data.idBlog});

            const updated = await blog?.updateOne({
                'accountLike': blog.accountLike.push(data.idUser),
                'numberLike': blog.numberLike ? blog.numberLike + 1 : 1
            });

            if (updated) {
                res.status(200).send({'message': 'Updated successfully!'});
            }
            else {
                res.status(401).send({'message': 'Updated failed!'});
            }
        }
        catch (err: any) {
            res.status(500).send({'message': err.message});
        }
        
    }

    async handleDislike(req: Request, res: Response) : Promise<void> {
        try {
            const data = req.body;
            const blog = await BlogModels.findOne({'_id': data.idBlog});

            const updated = await blog?.updateOne({
                'accountLike': blog.accountLike.filter(function (user) {
                    return user !== data.idUser;
                }),
                'numberLike': blog.numberLike ? blog.numberLike - 1 : 0
            });

            if (updated) {
                res.status(200).send({'message': 'Updated successfully!'});
            }
            else {
                res.status(401).send({'message': 'Updated failed!'});
            }
        }
        catch (err: any) {
            res.status(500).send({'message': err.message});
        }
    }
}

export default new BlogController();
