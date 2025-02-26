"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ForgotPasswordDialog } from "./forgotPasswordDialog";

export function LogInForm() {
  const [state, setState] = useState({
    success: false,
    fieldErrors: {} as { email?: string; password?: string },
    generalError: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setState({ success: false, fieldErrors: {}, generalError: "" });

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch("/api/auth/set-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setState((prev) => ({ ...prev, success: true }));
      } else {
        setState((prev) => ({
          ...prev,
          generalError: data.error || "Failed to set session cookie.",
        }));
      }
    } catch (error) {
      console.error("Login error:", error);
      setState((prev) => ({ ...prev, generalError: "Login failed. Please try again." }));
    }
  };

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.refresh();
        router.replace("/dashboard");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input id="email" name="email" type="email" placeholder="Enter your email" required />
        {state.fieldErrors.email && (
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
        />
        {state.fieldErrors.password && (
          <p className="text-sm text-red-500 mt-1">{state.fieldErrors.password}</p>
        )}
      </div>

      {state.generalError && (
        <p className="text-sm text-red-500 text-center mt-2">{state.generalError}</p>
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
  );
}

export default LogInForm;