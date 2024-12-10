"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { loginSchema } from "@/schemas/loginSchema";
import { ForgotPasswordDialog } from "./forgotPasswordDialog";


type LoginFormValues = z.infer<typeof loginSchema>;

export function LogInForm() {
    const { toast } = useToast();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data:LoginFormValues) {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast({title: "Login Successful", description: "Welcome back!"})
        } catch (error) {
            toast({ title: "Login Failed", description: "Invalid email or password"})
            console.error(error)
        }
    }

    const isFormValid = form.formState.isValid && !form.formState.isSubmitting;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <p className="text-sm text-red-500 mt-1">
                                {form.formState.errors.email?.message}
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
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <p className="text-sm text-red-500 mt-1">
                                {form.formState.errors.password?.message}
                            </p>
                        </FormItem>
                    )}
                />
                 <div className="text-sm text-center mt-4 mb-4">
                    <ForgotPasswordDialog />
                </div>
                <Button type="submit" className="w-full" disabled={!isFormValid}>
                    {form.formState.isSubmitting ? "Logging In..." : "Log In"}
                </Button>
            </form>
        </Form>
    )
}