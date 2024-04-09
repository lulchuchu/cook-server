import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Ingredient';
const COLLECTION_NAME = 'Ingredients';

const Ingredient = new Schema(
    {
        name: {
            type: Array,
        },
        quantity: {
            type: Array,
        },
        unit: {
            type: Array,
        },
        price: {
            type: Array,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, Ingredient, COLLECTION_NAME);
