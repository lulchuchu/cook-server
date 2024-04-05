import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'Nguoidung';
const COLLECTION_NAME = 'Nguoidungs';

const NguoiDung = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        username: { type: String, required: true },
        img: { type: String },
        address: { type: String },
        tel: { type: String },
        emailVerified: { type: Boolean },
        diet: { type: String },
        selectCountry: [{ type: String }],
    },
    {
        timestamps: true,
        COLLECTION_NAME: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, NguoiDung, COLLECTION_NAME);
