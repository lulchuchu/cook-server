import { model, Schema, Types } from "mongoose";

const DOCUMENT_NAME = "NguoiDung";
const COLLECTION_NAME = "NguoiDungs";

const nguoiDung = new Schema(
    {
        ten: {
            type: String,
        },
        email: {
            type: String,
        },
        matKhau: {
            type: String,
        },
        diaChi: [
            {
                type: Schema.Types.ObjectId,
                ref: "DiaChi",
            },
        ],
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model(DOCUMENT_NAME, nguoiDung, COLLECTION_NAME);
