"use server";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { loginSchema } from "@/schemas/loginSchema";
import { LoginResult } from "@/types/loginResult";

export const loginAction = async(_prevState: LoginResult, formData: FormData):Promise<LoginResult> => {
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

        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, parsed.data.email, parsed.data.password);
        
        const idToken = await userCredential.user.getIdToken();

        const response = await fetch('/api/auth/set-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ idToken }),
        })

        if(!response.ok) {
            return {
                success: false,
                generalError: "Failed to set session cookie. Please try again later.",
            }
        }
        return { success: true };
  
}