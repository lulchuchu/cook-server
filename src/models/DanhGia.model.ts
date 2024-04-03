import { model, Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'DanhGia';
const COLLECTION_NAME = 'DanhGias';

const danhGia = new Schema(
    {
        congThuc: {
            type: Schema.Types.ObjectId,
            ref: 'MonAn',
        },
        nguoiDung: {
            type: Schema.Types.ObjectId,
            ref: 'NguoiDung',
        },
        diemDanhGia: {
            type: Number,
        },
        noiDung: {
            type: String,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, danhGia, COLLECTION_NAME);
