import { model, Schema, Types } from "mongoose";

const DOCUMENT_NAME = "dish";
const COLLECTION_NAME = "dishes";

const dish = new Schema(
    {
        name: {
            type: String,
        },
        nation: {
            type: String,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model(DOCUMENT_NAME, dish);
