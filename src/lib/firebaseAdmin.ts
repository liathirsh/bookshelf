import * as admin from 'firebase-admin';

function getFirebaseAdminApp() {
    if (admin.apps.length > 0) {
        return admin.apps[0]!;
    }

    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    
    if (!privateKey) {
        throw new Error('FIREBASE_PRIVATE_KEY is missing');
    }

    // Handle both formats of private key
    const formattedKey = privateKey.includes('-----BEGIN PRIVATE KEY-----')
        ? privateKey.replace(/\\n/g, '\n')
        : privateKey;

    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL) {
        throw new Error('Missing Firebase Admin credentials');
    }

    try {
        return admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: formattedKey,
            }),
        });
    } catch (error) {
        console.error('Firebase Admin initialization error:', error);
        throw error;
    }
}

const app = getFirebaseAdminApp();

if (process.env.NODE_ENV !== 'production') {
    console.log('Firebase Admin Environment Check:', {
        hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
        hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
        environment: process.env.NODE_ENV,
    });
}

export const auth = admin.auth(app);
export const firestore = admin.firestore(app);