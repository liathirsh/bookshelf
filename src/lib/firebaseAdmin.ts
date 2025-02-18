import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    console.log('Project ID:', process.env.FIREBASE_PROJECT_ID);
    console.log('Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
    console.log('Private Key exists:', !!process.env.FIREBASE_PRIVATE_KEY);
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : undefined;

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        })
    })
}

export const auth = admin.auth()
export const firestore = admin.firestore()