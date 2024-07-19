const admin = require('firebase-admin');
import {config} from "dotenv";
config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_BUCKET,
});

const bucket = admin.storage().bucket();

export default bucket;
