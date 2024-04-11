import mongoose, { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'CookBook';
const COLLECTION_NAME = 'CookBooks';

const CookBook = new Schema(
    {
        name: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
        // dishs: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Dish',
        //     },
        // ],
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, CookBook, COLLECTION_NAME);
