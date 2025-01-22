"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/hooks/useAuth";
import { useAuthContext } from "@/context/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const MainNavbar = () => {
    const { user } = useAuthContext();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/")
        } catch(error) {
            console.log("Logout failed:", error)
        }
    };
    return (
        <div>
            <Button asChild variant="default">
                <Link href="/dashboard"> Home </Link>
            </Button>
            {user && (
            <>
                <Button asChild variant="default">
                    <Link href="/books"> My Books </Link>
                </Button>
                <Button asChild variant="default">
                    <Link href="/browse"> Browse </Link>
                </Button>
                <Button asChild variant="default">
                    <Link href="/community"> Community </Link>
                </Button>
                <Button asChild variant="default">
                    <Link href="/community"> Community </Link>
                </Button>
                <Button variant="default" onClick={handleLogout}> Log Out </Button>
            </>
            )}
    </div>
    )
}
