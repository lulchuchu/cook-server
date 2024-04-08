import { model, Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'HoaDon';
const COLLECTION_NAME = 'HoaDons';

const hoaDon = new Schema(
    {
        cart: {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: 'Store',
        },
        total: {
            type: Number,
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
        },
        tel: String,
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, hoaDon, COLLECTION_NAME);
