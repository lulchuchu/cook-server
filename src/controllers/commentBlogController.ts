import { Request,Response } from "express";
import CommentBlogModels from "../models/CommentBlog.models";
import BlogModels from "../models/Blog.models";

class CmtBlogController {
    async createComment (req: Request, res: Response) {
        const bodyData = req.body;
        const newComment = new CommentBlogModels({
            author: bodyData.author,
            content: bodyData.content,
            numberLike: 0,
            idBlog: bodyData.idBlog
        });
        try {
            const savedCmt = await newComment.save();
            if (savedCmt) {
                res.status(200).send({'message': 'Comment saved successfully'});
            }
            else {
                res.status(401).send({'message': 'Comment not saved successfully'});
            }
        }
        catch(err:any) {
            res.status(500).send({'message': err.message});
        }
    }

};

module.exports = new CmtBlogController;