import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "CommentDish";
const COLLECTION_NAME = "CommentDishes";

const CommentDish = new Schema(
    {
        idDish: {
            type: Schema.Types.ObjectId,
            ref: "MonAn",
        },
        idNguoiDung: {
            type: Schema.Types.ObjectId,
            ref: "NguoiDung",
        },
        content: { type: String },
        img: { type: String },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "NguoiDung",
            },
        ],
        dislikes: [
            {
                type: Schema.Types.ObjectId,
                ref: "NguoiDung",
            },
        ],
    },
    {
        timestamps: true,
        COLLECTION_NAME: COLLECTION_NAME,
    }
);

export default model(DOCUMENT_NAME, CommentDish, COLLECTION_NAME);
