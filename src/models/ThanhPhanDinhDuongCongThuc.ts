import { model, Schema, Types } from "mongoose";

const DOCUMENT_NAME = "ThanhPhanDinhDuongCongThuc";
const COLLECTION_NAME = "ThanhPhanDinhDuongCongThucs";

const thanhPhanDinhDuongCongThuc = new Schema(
    {
        congThuc: {
            type: Schema.Types.ObjectId,
            ref: "CongThuc",
        },
        thanhPhanDinhDuong: {
            type: Schema.Types.ObjectId,
            ref: "ThanhPhanDinhDuong",
        },
        hamLuong: {
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
    thanhPhanDinhDuongCongThuc,
    COLLECTION_NAME
);
