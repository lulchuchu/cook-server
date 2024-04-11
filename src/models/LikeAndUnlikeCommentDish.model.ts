import mongoose, { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'LikeAndUnlikeCommentDish';
const COLLECTION_NAME = 'LikeAndUnlikeCommentDishes';

const LikeAndUnlikeCommentDish = new Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
        commentDish: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CommentDish',
        },
        state: {
            type: Number,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, LikeAndUnlikeCommentDish, COLLECTION_NAME);
