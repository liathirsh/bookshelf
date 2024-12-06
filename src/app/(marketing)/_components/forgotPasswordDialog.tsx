"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export function ForgotPasswordDialog() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { toast } = useToast();

    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    const isEmailValid = isValidEmail(email)

    async function handleReset() {
        if(!isEmailValid) {
            toast({ title: "Invalid Email", description: "Please enter a valid email address" })
            return;
        }
        setIsSubmitting(true);
        try {
            await sendPasswordResetEmail(auth, email);
            toast({ title: "Password reset", description: "Password reset email sent!" });
            setEmail("");
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-blue-500 hover:underline text-sm">Forgot Password?</button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Reset Your Password</DialogTitle>
                <DialogDescription>
                    Enter your email. You will get a link to reset your password
                </DialogDescription>
                <div className="mt-4">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`mb-2 ${!isEmailValid && email ? "border-red-500" : ""}`}
                    />
                    <p className="text-sm text-red-500">
                        {!isEmailValid && email ? "Please enter a valid email address" : ""}
                    </p>
                    <Button onClick={handleReset} disabled={isSubmitting || !isEmailValid}>
                        {isSubmitting ? "Sending..." : "Send Reset Email"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}