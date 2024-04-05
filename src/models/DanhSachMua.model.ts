import { model, Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'DanhSachMua';
const COLLECTION_NAME = 'DanhSachMuas';

const danhSachMua = new Schema(
    {
        ingredient: {
            type: Schema.Types.ObjectId,
            ref: 'NguyenLieu',
        },
        tongTien: {
            type: Number,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, danhSachMua, COLLECTION_NAME);
