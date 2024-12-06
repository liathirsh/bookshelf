"use client"

import { Button } from '@/components/ui/button';
import { SignUpForm } from '../_components/signup-form';
import { useRouter } from "next/navigation";
import { GoogleSignUpButton } from "../_components/googleSignUp";

const SignUp = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="flex flex-col items-center justify-center w-full max-w-md px-6 py-10 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
                    Sign Up for the Bookshelf Community      
                </h1>    
                    <SignUpForm />
                        <p className="mt-4"> Already have an account? </p>
                        <Button className="flex justify-center" onClick={()=> router.push("/login")}> Log In </Button>
                        <GoogleSignUpButton />
            </div>
        </div>
    );
};

export default SignUp;