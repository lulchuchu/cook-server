import { model } from "mongoose";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DOCUMENT_NAME = 'account';
const COLLECTION_NAME = 'accounts';

const account = new Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
        username: {type: String},
        img: {type: String},
        address: {type: String},
        tel: {type: String},
    },
    {
        timestamps: true,
        COLLECTION_NAME: COLLECTION_NAME
    }
);

module.exports = mongoose.model(DOCUMENT_NAME, account);

