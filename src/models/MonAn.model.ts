import mongoose, { model, Schema } from "mongoose";

const DOCUMENT_NAME = "MonAn";
const COLLECTION_NAME = "MonAns";

const monAn = new Schema(
    {
        name: {
            type: String,
        },
        video: { type: String },
        imgDes: {
            type: String,
        },
        description: {
            type: String,
        },
        country: { type: String },
        type: { type: String },
        rating: [
            {
                type: Schema.Types.ObjectId,
                ref: "DanhGia",
            },
        ],
        defaultPortion: { type: Number },
        ingredients: {
            type: Schema.Types.ObjectId,
            ref: "NguyenLieu",
        },
        dungcu: {
            type: String,
        },
        nuttrition: {
            type: Array,
        },
        step: { type: Array },
        storeUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model(DOCUMENT_NAME, monAn, COLLECTION_NAME);
