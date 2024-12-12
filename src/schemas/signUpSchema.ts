"use client";

import { z } from 'zod'

export const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    displayName: z.string().min(5, "Name must be at least 5 characters")
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;