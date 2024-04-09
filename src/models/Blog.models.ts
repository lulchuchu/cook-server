import { model, Schema } from 'mongoose';
const DOCUMENT_NAME = 'Blog';
const COLLECTION_NAME = 'Blogs';

const Blog = new Schema(
    {
        content: { type: String, required: true },
        imgDes: { type: Array },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            required: true,
        },
        accountLike: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Account',
            },
        ],
        numberShare: { type: Number },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'CommentBlog',
            },
        ],
    },
    {
        timestamps: true,
        COLLECTION_NAME: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, Blog, COLLECTION_NAME);
