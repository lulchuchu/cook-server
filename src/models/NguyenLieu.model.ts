import { model, Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'NguyenLieu';
const COLLECTION_NAME = 'NguyenLieus';

const nguyenLieu = new Schema(
    {
        ten: {
            type: Array,
        },
        soluong: {
            type: Array,
        },
        donvitinh: {
            type: Array,
        },
        gia: {
            type: Array,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, nguyenLieu, COLLECTION_NAME);
