import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Store';
const COLLECTION_NAME = 'Stores';

const Store = new Schema(
    {
        address: { type: String },
        latitude: { type: String },
        longitude: { type: String },
        tel: { type: String },
        staf: { type: String },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, Store, COLLECTION_NAME);
