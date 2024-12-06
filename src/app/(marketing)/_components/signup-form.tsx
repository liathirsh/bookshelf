"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { signUpSchema, SignUpFormValues } from "@/schemas/auth";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export function SignUpForm() {
    const { toast } = useToast();

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            displayName: "",
        },
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const password = form.watch("password");
    const displayName = form.watch("displayName");
    const email = form.watch("email");

    const isFormValid = 
        displayName && displayName.length >= 5 &&
        email && emailRegex.test(email) && 
        password && password.length >=6;

    async function onSubmit(data: SignUpFormValues) {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(user, { displayName: data.displayName });

            await setDoc(doc(db, "users", user.uid), {
                email: data.email,
                displayName: data.displayName,
                createdAt: new Date(),
            });
            toast({ title: "Account created successfully!" });
        } catch (error) {
            toast({ title: "Error creating account" })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <p className="text-sm text-red-500 mt-1">
                                { displayName && displayName.length < 6
                                    ? "Username must be at least 5 characters."
                                    : ""
                                }
                            </p>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <p className="text-sm text-red-500 mt-1">
                                { email && !emailRegex.test(email)
                                    ? "Please enter a valid email address"
                                    : ""
                                }
                            </p>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Your password" {...field} />
                            </FormControl>
                            <p className="text-sm text-red-500 mt-1">
                                { password && password.length < 6
                                    ? "Password must be at least 6 characters."
                                    : ""
                                }
                            </p>
                        </FormItem>
                    )}
                />               
                <div className="flex justify-center">
                    <Button type="submit" disabled={!isFormValid || form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Creating Account..." : "Sign Up"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};