import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { initializeUserShelves } from "@/lib/firestore/users";
import { signUpSchema } from "@/schemas/signUpSchema";
import { SignUpResult } from "@/types/signupResult";

export async function signUpAction(formData: FormData): Promise<SignUpResult> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const displayName = formData.get("displayName") as string;

    const parsed = signUpSchema.safeParse({ email, password, displayName })
    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return {
            success: false,
            fieldErrors: {
                email: errors.email?.[0] || "",
                password: errors.password?.[0] || "",
                displayName: errors.displayName?.[0] || "",
            },
            generalError:""
        };
    }

    try {
        const checkEmailResponse = await fetch('/api/auth/check-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (!checkEmailResponse.ok) {
            throw new Error('Failed to check email availability');
        }

        const emailCheck = await checkEmailResponse.json();
        if (!emailCheck.available) {
            return {
                success: false,
                generalError: "This email is already registered. Please try logging in instead."
            };
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;

        await updateProfile(user, { displayName });

        const idToken = await user.getIdToken();

        const sessionResponse = await fetch('/api/auth/set-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ idToken }),
        });

        if (!sessionResponse.ok) {
            throw new Error('Failed to establish session');
        }

        await setDoc(doc(db, "users", user.uid), {
            email,
            displayName,
            createdAt: new Date(),
        });

        await initializeUserShelves(user.uid);

        return { success: true };
    } catch (error) {
        console.error("Sign Up Error:", error);
        return { 
            success: false, 
            generalError: error instanceof Error ? error.message : "Failed to create account. Please try again."
        };
    }
}