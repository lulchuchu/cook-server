import { model, Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'Rating';
const COLLECTION_NAME = 'Ratings';

const Rating = new Schema(
    {
        dish: {
            type: Schema.Types.ObjectId,
            ref: 'Dish',
        },
        account: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
        },
        score: {
            type: Number,
        },
        img: {
            type: String,
        },
        content: {
            type: String,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, Rating, COLLECTION_NAME);
