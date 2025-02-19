"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import googlelogin from "../../../../public/googlelogin.png"
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, googleAuthProvider } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export function GoogleSignUpButton() {
    const router = useRouter();
    const { toast } = useToast();

    async function handleGoogleSignUp() {
        try {
            if (/mobile|android|iphone/i.test(navigator.userAgent)) {
                await signInWithRedirect(auth, googleAuthProvider);
            } else {
                const result = await signInWithPopup(auth, googleAuthProvider);
                const idToken = await result.user.getIdToken();

                const response = await fetch("/api/auth/set-session", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        // Add CSRF protection
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    credentials: 'include', // Important for cookies
                    body: JSON.stringify({ idToken }),
                });

                if(!response.ok){
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to set session cookie");
                }

                router.push("/dashboard");
            }
        } catch (error) {
            toast({ 
                title: "Sign In Failed" ,
                description: error instanceof Error ? error.message : "Please try again",
                variant: "destructive"
            });
            console.error(error);
        }
    }

    return (
        <Button variant="ghost" className="mt-4" onClick={handleGoogleSignUp}>
            <Image src={googlelogin} alt="Google Login" width={175} />
        </Button>
    );
}