import { Request, Response } from 'express';
import CommentBlogModels from '../models/CommentBlog.models';
import BlogModels from '../models/Blog.models';

class CmtBlogController {
    async createComment(req: Request, res: Response) {
        const bodyData = req.body;
        const newComment = new CommentBlogModels({
            author: bodyData.author,
            content: bodyData.content,
            numberLike: 0,
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
            const cmts = await CommentBlogModels.find({ idBlog: req.param('idBlog') })
                .populate('author')
                .exec();
            res.status(200).send(cmts.reverse());
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }
}

export default new CmtBlogController();
