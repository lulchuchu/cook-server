import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'CommentDish';
const COLLECTION_NAME = 'CommentDishes';

const CommentDish = new Schema(
    {
        idDish: {
            type: Schema.Types.ObjectId,
            ref: 'Dish',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
        },
        content: { type: String },
        img: { type: String },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Account',
            },
        ],
        dislikes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Account',
            },
        ],
    },
    {
        timestamps: true,
        COLLECTION_NAME: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, CommentDish, COLLECTION_NAME);
