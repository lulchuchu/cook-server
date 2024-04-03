import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'MonAn';
const COLLECTION_NAME = 'MonAns';

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
                ref: 'DanhGia',
            },
        ],
        storeUsers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'NguoiDung',
            },
        ],
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'NguoiDung',
            },
        ],
        defaultPortion: { type: Number },
        ingredients: {
            type: Schema.Types.ObjectId,
            ref: 'NguyenLieu',
        },
        utenils: {
            type: String,
        },
        nuttrition: {
            type: Array,
        },
        step: { type: Array },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, monAn, COLLECTION_NAME);
