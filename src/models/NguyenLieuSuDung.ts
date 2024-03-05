import { model, Schema, Types } from "mongoose";

const DOCUMENT_NAME = "NguyenLieuSuDung";
const COLLECTION_NAME = "NguyenLieuSuDungs";

const nguyenLieuSuDung = new Schema(
    {
        nguyenLieu: {
            type: Schema.Types.ObjectId,
            ref: "NguyenLieu",
        },
        monAn: {
            type: Schema.Types.ObjectId,
            ref: "MonAn",
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

export default model(DOCUMENT_NAME, nguyenLieuSuDung, COLLECTION_NAME);
