import { model, Schema, Types } from "mongoose";

const DOCUMENT_NAME = "ThanhPhanDinhDuong";
const COLLECTION_NAME = "ThanhPhanDinhDuongs";

const thanhPhanDinhDuong = new Schema(
    {
        ten: {
            type: String,
        },
        donViDo: {
            type: String,
        },
        hamLuongTrong100g: {
            type: Number,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model(DOCUMENT_NAME, thanhPhanDinhDuong, COLLECTION_NAME);
