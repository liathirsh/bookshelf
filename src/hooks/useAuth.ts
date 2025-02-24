"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
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
                    console.log('Getting ID token...');
                    const idToken = await firebaseUser.getIdToken(true);
                    console.log('ID token length:', idToken.length);

                    const response = await fetch('/api/auth/set-session', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({ idToken }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || 'Failed to set session');
                    }

                    setState({ user: firebaseUser, loading: false });
                } catch (error) {
                    console.error('Auth error:', {
                        message: error instanceof Error ? error.message : 'Unknown error',
                        user: firebaseUser?.uid
                    });
                    setState({ 
                        user: null, 
                        loading: false, 
                        error: error instanceof Error ? error.message : 'Authentication failed'
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