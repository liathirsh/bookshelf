import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

  const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app);
  export const googleAuthProvider = new GoogleAuthProvider();
  export { serverTimestamp };
  
  export let analytics: ReturnType<typeof getAnalytics> | null = null;
  if( typeof window !== 'undefined'){
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app)
        }
    });
  };