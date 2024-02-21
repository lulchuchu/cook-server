import { model, Schema, Types } from "mongoose";

const DOCUMENT_NAME = "HoaDon";
const COLLECTION_NAME = "HoaDons";

const hoaDon = new Schema(
    {
        danhSachMuas: [
            {
                type: Schema.Types.ObjectId,
                ref: "DanhSachMua",
            },
        ],
        diaChi: {
            type: Schema.Types.ObjectId,
            ref: "DiaChi",
        },
        tongTien: {
            type: Number,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model(DOCUMENT_NAME, hoaDon, COLLECTION_NAME);
