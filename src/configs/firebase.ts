const admin = require('firebase-admin');

const serviceAccount = require('../../kitchenstories-7031c-firebase-adminsdk-w1g4h-f9ce3b0ba6.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://kitchenstories-7031c.appspot.com',
});

const bucket = admin.storage().bucket();

export default bucket;
