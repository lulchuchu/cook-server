import mongoose, { model, Schema } from "mongoose";

const DOCUMENT_NAME = "NhomMonAn";
const COLLECTION_NAME = "NhomMonAns";

const nhomMonAn = new Schema(
    {
        ten: {
            type: String,
        },
        nguoiDung: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        monAns: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MonAn",
            },
        ],
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model(DOCUMENT_NAME, nhomMonAn, COLLECTION_NAME);
