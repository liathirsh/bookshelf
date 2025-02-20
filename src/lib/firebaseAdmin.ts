import * as admin from 'firebase-admin';

function formatPrivateKey(key: string | undefined) {
    return key ? key.replace(/\\n/g, '\n') : undefined;
}

function getFirebaseAdminApp() {
    if (admin.apps.length > 0) {
        return admin.apps[0]!;
    }

    const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
        throw new Error('Missing Firebase Admin credentials');
    }

    return admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        }),
    });
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