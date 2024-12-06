"use client";

import { LogInForm } from "../_components/login-form";
import { GoogleSignUpButton } from "../_components/googleSignUp";

const login = () => {
   return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center justify-center w-full max-w-md px-6 py-10 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
                Log In
            </h1>  
           <LogInForm />
           <GoogleSignUpButton />
        </div>
    </div>
   )
}

export default login;