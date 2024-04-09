import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Cart';
const COLLECTION_NAME = 'Carts';

const Cart = new Schema(
    {
        img: { type: String },
        nameDish: { type: String },
        dish: { type: Schema.Types.ObjectId, ref: 'Dish' },
        customer: { type: Schema.Types.ObjectId, ref: 'Account' },
        ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
        meal: { type: Number },
        state: { type: String },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, Cart, COLLECTION_NAME);
