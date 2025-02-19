import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    // Log environment variables presence (not their values)
    console.log('Checking Firebase Admin environment variables:');
    console.log('FIREBASE_PROJECT_ID exists:', !!process.env.FIREBASE_PROJECT_ID);
    console.log('FIREBASE_CLIENT_EMAIL exists:', !!process.env.FIREBASE_CLIENT_EMAIL);
    console.log('FIREBASE_PRIVATE_KEY exists:', !!process.env.FIREBASE_PRIVATE_KEY);

    // Handle private key with or without quotes
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey) {
        // Remove any surrounding quotes and properly handle newlines
        privateKey = privateKey.replace(/\\n/g, '\n');
        privateKey = privateKey.replace(/^["']|["']$/g, '');
    }

    const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey
    };

    // Validate credentials
    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
        const missingVars = [];
        if (!serviceAccount.projectId) missingVars.push('FIREBASE_PROJECT_ID');
        if (!serviceAccount.clientEmail) missingVars.push('FIREBASE_CLIENT_EMAIL');
        if (!serviceAccount.privateKey) missingVars.push('FIREBASE_PRIVATE_KEY');
        
        throw new Error(
            `Missing Firebase Admin credentials: ${missingVars.join(', ')}`
        );
    }

    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
        });
        console.log('Firebase Admin initialized successfully');
    } catch (error) {
        console.error('Firebase Admin initialization error:', error);
        throw error;
    }
}

export const auth = admin.auth();
export const firestore = admin.firestore();