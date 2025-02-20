"use client"

import Image from "next/image";
import { Button } from '@/components/ui/button';
import { SignUpForm } from '../_components/signup-form';
import { useRouter } from "next/navigation";
import { GoogleSignUpButton } from "../_components/googleSignUp";

const SignUp = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen relative">
            <div className="absolute inset-0">
                <Image
                    src="/images/book.png"
                    alt="Book background"
                    fill
                    priority
                    className="object-cover"
                    quality={100}
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gray-50/80" />
            </div>
            <div className="flex flex-col items-center justify-center w-full max-w-md px-6 py-10 bg-white shadow-md rounded-lg z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
                    Sign Up for Bookshelf      
                </h1>    
                <SignUpForm />
                <p className="mt-4"> Already have an account? </p>
                <Button variant="secondary" className="flex justify-center" onClick={()=> router.push("/login")}> Log In </Button>
                <GoogleSignUpButton />
            </div>
        </div>
    );
};

export default SignUp;