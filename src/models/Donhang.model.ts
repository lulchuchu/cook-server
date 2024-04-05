import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Donhang';
const COLLECTION_NAME = 'Donhangs';

const Donhang = new Schema(
    {
        img: { type: String },
        nameDish: { type: String },
        dish: { type: Schema.Types.ObjectId, ref: 'MonAn' },
        customer: { type: Schema.Types.ObjectId, ref: 'Nguoidung' },
        ingredient: { type: Schema.Types.ObjectId, ref: 'NguyenLieu' },
        meal: { type: Number },
        state: { type: String },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, Donhang, COLLECTION_NAME);
