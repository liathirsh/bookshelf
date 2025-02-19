import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    try {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
        
        console.log('Firebase Admin Environment Check:', {
            hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
            hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
            hasPrivateKey: !!privateKey,
            environment: process.env.NODE_ENV,
            projectIdLength: process.env.FIREBASE_PROJECT_ID?.length,
            clientEmailLength: process.env.FIREBASE_CLIENT_EMAIL?.length,
            privateKeyLength: privateKey?.length
        });

        if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
            const missing = [
                !process.env.FIREBASE_PROJECT_ID && 'FIREBASE_PROJECT_ID',
                !process.env.FIREBASE_CLIENT_EMAIL && 'FIREBASE_CLIENT_EMAIL',
                !privateKey && 'FIREBASE_PRIVATE_KEY'
            ].filter(Boolean);
            
            throw new Error(`Missing Firebase Admin credentials: ${missing.join(', ')}`);
        }

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey,
            }),
        });
        console.log('Firebase Admin initialized successfully');
    } catch (error) {
        console.error('Firebase Admin initialization error:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
    }
}

export const auth = admin.auth();
export const firestore = admin.firestore();