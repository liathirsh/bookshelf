import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    console.log('Initializing Firebase Admin with:', {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKeyExists: !!process.env.FIREBASE_PRIVATE_KEY
    });

    const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    };

    console.log('Service Account:', {
        projectId: serviceAccount.projectId,
        clientEmail: serviceAccount.clientEmail,
        privateKeyExists: !!serviceAccount.privateKey
    });

    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
        });
    } catch (error) {
        console.error('Firebase Admin initialization error:', error);
        throw error;
    }
}

export const auth = admin.auth();
export const firestore = admin.firestore();