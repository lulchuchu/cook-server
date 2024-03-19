import {model, Schema} from "mongoose";

const DOCUMENT_NAME = 'Blog';
const COLLECTION_NAME = 'Blogs';

const Blog = new Schema({
    title: { type: String, required: true },
    imgDes: {type: String, required: true},
    content: {type: String, required: true},
    shortDes: {type: String, required: true},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'NguoiDung',
        required: true
    },
    accountLike: [{
        type: Schema.Types.ObjectId,
        ref: 'NguoiDung'
    }],
    numberLike: {type: Number},
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'CommentBlog'
    }],
}, {
    timestamps: true,
    COLLECTION_NAME: COLLECTION_NAME
});

export default model(DOCUMENT_NAME, Blog, COLLECTION_NAME);