import {Request, Response} from "express";
import BlogModels from "../models/Blog.models";

class blogController {
    async createBlog (req: Request, res: Response) {
        const bodyRequest = req.body;
        const newBlog = new BlogModels({
            title: bodyRequest.title,
            imgDes: bodyRequest.imgDes,
            content: bodyRequest.content,
            shortDes: bodyRequest.shortDes,
            author: bodyRequest.author,
            acountLike: [],
            numberLike: 0,
            comments: []
        });

        try {
            const savedBlog = await newBlog.save();
            if (savedBlog) {
                res.status(200).send({"message": "Successfully"});
            }
            else {
                res.status(401).send({"message": "Failed"});
            }
        }
        catch(err: any) {
            res.status(500).send({'message': err.message});
        }
    }
};

module.exports = new blogController;