"use server";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginSchema } from "@/schemas/loginSchema";
import { LoginResult } from "@/types/loginResult";

export const loginAction = async(_prevState: LoginResult, formData: FormData): Promise<LoginResult> => {
    try {
        const email = formData.get("email");
        const password = formData.get("password");
        
        const parsed = loginSchema.safeParse({ email, password });

        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;
            return { 
                success: false, 
                fieldErrors: {
                    email: fieldErrors.email?.[0],
                    password: fieldErrors.password?.[0],
                },
            };
        }

        const userCredential = await signInWithEmailAndPassword(auth, parsed.data.email, parsed.data.password);
        const idToken = await userCredential.user.getIdToken();
        
        const origin = process.env.NODE_ENV === 'production'
            ? 'https://bookshelf-neon-one.vercel.app'
            : 'http://localhost:3000';

        const response = await fetch(`${origin}/api/auth/set-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ idToken }),
            redirect: 'follow',
        });

        if (response.redirected) {
            return { success: true };
        }

        const data = await response.json();
        
        if (!response.ok || !data.success) {
            return {
                success: false,
                generalError: data.error || "Failed to set session cookie. Please try again later.",
            };
        }

        return { success: true };
    } catch (error) {
        console.error('LoginAction error:', error);
        return {
            success: false,
            generalError: "An unexpected error occurred. Please try again.",
        };
    }
}