"use client";

import { z } from 'zod'

export const signUpSchema = z.object({
    email: z.string().email("Invalid eamil address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    displayName: z.string().min(4, "Name must be at least 4 characters")
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;