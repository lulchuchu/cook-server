import { model, Schema, Types } from "mongoose";

const DOCUMENT_NAME = "MonAn";
const COLLECTION_NAME = "MonAns";

const monAn = new Schema(
    {
        ten: {
            type: String,
        },
        hinhAnh: {
            type: String,
        },
        moTa: {
            type: String,
        },
        congThuc: [
            {
                type: Schema.Types.ObjectId,
                ref: "CongThuc",
            },
        ],
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model(DOCUMENT_NAME, monAn, COLLECTION_NAME);
