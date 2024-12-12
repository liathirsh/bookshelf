"use client";

import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpAction } from "@/app/actions/sign-up-action";
import { SignUpResult } from "@/types/signupResult";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const initialState: SignUpResult = {
    success: false,
    fieldErrors: {},
    generalError: "",
}

export function SignUpForm() {
    const router = useRouter();

    const signUpActionHandler = async(prevState: SignUpResult, formData: FormData): Promise<SignUpResult> => {
        const result = await signUpAction(formData);
        return result;
    }

    const [state, formAction] = useActionState(signUpActionHandler, initialState);

    useEffect(() => {
        if (state.success) {
            router.push("/dashboard");
        }
    }, [state.success, router]);

    return (
       <form action={formAction} className="space-y-4">
        <div>
            <label htmlFor="displayName" className="block text-sm font-medium">
                Username
            </label>
            <Input
                id="displayName"
                name="displayName"
                placeholder="Enter your username"
                required
                minLength={5}
            />
            {state.fieldErrors?.displayName && (
                <p className="text-sm text-red-500 mt-1">{state.fieldErrors.displayName}</p>                
            )}
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium">
                Email
            </label>
            <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
            />
            {state.fieldErrors?.email && (
                <p className="text-sm text-red-500 mt-1">{state.fieldErrors.email}</p>
            )}
        </div>
        <div> 
            <label htmlFor="password" className="block text-sm font-medium">
                Password
            </label>
            <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                minLength={6}
            />
            {state.fieldErrors?.password && (
                <p className="text-sm text-red-500 mt-1">{state.fieldErrors.password}</p>
            )}
        </div>
        {state.generalError && (
            <p className="text-sm text-red-500 text-center mt-2">{state.generalError}</p>
        )}
        {state.success && (
            <p className="text-sm text-green-500 text-center mt-2">
                Account created successfully. Welcome to Bookshelf! 
            </p>
        )}
        <Button type="submit" className="w-full" disabled={state.success}>
            {state.success ? <Spinner /> : "Sign Up"}
        </Button>
       </form>
    );
};