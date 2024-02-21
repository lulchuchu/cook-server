import { model, Schema, Types } from "mongoose";

const DOCUMENT_NAME = "DiaChi";
const COLLECTION_NAME = "DiaChis";

const diaChi = new Schema(
    {
        soNha: {
            type: String,
        },
        duong: {
            type: String,
        },
        phuong: {
            type: String,
        },
        quan: {
            type: String,
        },
        thanhPho: {
            type: String,
        },
        quocGia: {
            type: String,
        },
        ghiChu: {
            type: String,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model(DOCUMENT_NAME, diaChi, COLLECTION_NAME);
