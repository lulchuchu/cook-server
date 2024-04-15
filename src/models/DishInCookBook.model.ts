import mongoose, { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'DishInCookBook';
const COLLECTION_NAME = 'DishInCookBooks';

const DishInCookBook = new Schema(
    {
        cookBook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CookBook',
        },
        dish: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish',
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, DishInCookBook, COLLECTION_NAME);
