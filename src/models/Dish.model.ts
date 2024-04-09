import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Dish';
const COLLECTION_NAME = 'Dishs';

const Dish = new Schema(
    {
        name: {
            type: String,
        },
        video: { type: String },
        imgDes: {
            type: String,
        },
        description: {
            type: String,
        },
        country: { type: String },
        type: { type: String },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Account',
            },
        ],
        defaultPortion: { type: Number },
        ingredients: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient',
        },
        utenils: {
            type: String,
        },
        nuttrition: {
            type: Array,
        },
        step: { type: Array },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, Dish, COLLECTION_NAME);
