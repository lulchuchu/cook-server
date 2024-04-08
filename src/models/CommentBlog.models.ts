import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'CommentBlog';
const COLLECTION_NAME = 'CommentBlogs';

const CommentBlog = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            required: true,
        },
        content: { type: String, required: true },
        numberLike: { type: Number },
        idBlog: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
        },
    },
    {
        timestamps: true,
        COLLECTION_NAME: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, CommentBlog, COLLECTION_NAME);
