import { model, Schema, Types } from "mongoose";

const DOCUMENT_NAME = "ThanhPhanDinhDuongNguyenLieu";
const COLLECTION_NAME = "ThanhPhanDinhDuongNguyenLieus";

const thanhPhanDinhDuongNguyenLieu = new Schema(
    {
        thanhPhanDinhDuong: {
            type: Schema.Types.ObjectId,
            ref: "ThanhPhanDinhDuong",
        },
        nguyenLieu: {
            type: Schema.Types.ObjectId,
            ref: "NguyenLieu",
        },
        soLuong: {
            type: Number,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model(
    DOCUMENT_NAME,
    thanhPhanDinhDuongNguyenLieu,
    COLLECTION_NAME
);
