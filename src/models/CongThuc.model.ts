import { model, Schema, Types } from "mongoose";

const DOCUMENT_NAME = "CongThuc";
const COLLECTION_NAME = "CongThucs";

const congThuc = new Schema(
    {
        ten: {
            type: String,
        },
        moTa: {
            type: String,
        },
        hinhAnh: {
            type: String,
        },
        thoiGian: {
            type: Number,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model(DOCUMENT_NAME, congThuc, COLLECTION_NAME);
