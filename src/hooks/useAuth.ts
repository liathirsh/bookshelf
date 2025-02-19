import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const idToken = await firebaseUser.getIdToken(true);
                    const response = await fetch('/api/auth/set-session', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        credentials: 'include',
                        body: JSON.stringify({ idToken }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to set session');
                    }
                } catch (error) {
                    console.error('Error setting session:', error);
                }
            }
            setUser(firebaseUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return { user, loading };
}

export function signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

export function logout() {
    return signOut(auth);
}