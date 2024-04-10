import mongoose, { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'AccountLikeDish';
const COLLECTION_NAME = 'AccountLikeDishs';

const AccountLikeDish = new Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
        dish: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish',
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

export default model(DOCUMENT_NAME, AccountLikeDish, COLLECTION_NAME);
