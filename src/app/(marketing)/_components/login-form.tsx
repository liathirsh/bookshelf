"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { loginAction } from "@/app/actions/login-actions";
import { ForgotPasswordDialog } from "./forgotPasswordDialog";
import { LoginResult } from "@/types/loginResult";
import { useRouter } from "next/navigation";

const initialState: LoginResult = {
    success: false,
    fieldErrors: {},
    generalError: "",
}

export function LogInForm() {
    const [state, formAction] = useActionState(loginAction, initialState);

    const router = useRouter();

    
    if (state.success) {
        router.push("/dashboard");
    }

    return (
        <form action={formAction} className="space-y-4">
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
                    <p className="text-sm text-red-500 mt-1">
                        {state.fieldErrors.email}
                    </p>
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
                />
                {state.fieldErrors?.password && (
                    <p className="text-sm text-red-500 mt-1">
                        {state.fieldErrors.password}
                    </p>
                )}
            </div>
           
            {state.generalError && (
                <p className="text-sm text-red-500 text-center mt-2">
                    {state.generalError}
                </p>
            )}

            {state.success && (
                <p className="text-sm text-green-500 text-center mt-2">
                    Welcome back! Login successful.
                </p>
            )}

                <div className="text-sm text-center mt-4 mb-4">
                <ForgotPasswordDialog />
            </div>
            <Button type="submit" variant="secondary" className="w-full" disabled={state.success}>
                {state.success ? "Logged In!" : "Log In"}
            </Button>
        </form>
    )
}