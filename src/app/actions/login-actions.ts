
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { loginSchema } from "@/schemas/loginSchema";
import { LoginResult } from "@/types/loginResult";

export const loginAction = async(formData: FormData):Promise<LoginResult> => {
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

    try { 
        await signInWithEmailAndPassword(auth, parsed.data.email, parsed.data.password);
        return { success: true };
    } catch (error) {
        console.error(error)
        return { success: false, generalError: "Invalid password or email" }
    }
}