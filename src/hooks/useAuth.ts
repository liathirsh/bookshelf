import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { AuthState } from "@/types/auth";

const initialState: AuthState = {
    user: null,
    loading: true
};

export function useAuth() {
    const [state, setState] = useState<AuthState>(initialState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const idToken = await firebaseUser.getIdToken(true);
                    const response = await fetch('/api/auth/set-session', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({ idToken }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to set session');
                    }
                    
                    setState({ user: firebaseUser, loading: false });
                } catch (error) {
                    console.error('Error setting session:', error);
                    setState({ 
                        user: null, 
                        loading: false, 
                        error: 'Authentication failed' 
                    });
                    await signOut(auth);
                }
            } else {
                setState({ user: null, loading: false });
            }
        });

        return () => unsubscribe();
    }, []);

    return state;
}

export function signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

export async function logout() {
    try {
        await signOut(auth);
        await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
        console.error('Logout error:', error);
    }
}