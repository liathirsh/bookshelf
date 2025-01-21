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
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;

        await updateProfile(user, { displayName });

        await setDoc(doc(db, "users", user.uid), {
            email,
            displayName,
            createdAt: new Date(),
        })

        await initializeUserShelves(user.uid);

        return { success: true };
    } catch (error ) {
        console.error("Sign Up Error:", error)
        
        return { success: false, generalError: "Failed to create account. Please try again."}
    }
}