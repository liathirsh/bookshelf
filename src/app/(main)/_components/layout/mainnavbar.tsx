"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export const MainNavbar = () => {
    const { user } = useAuth();

    return (
        <div>
        <Button asChild variant="default">
            <Link href="/"> Home </Link>
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
        </>
        )}
    </div>
    )
}
