"use client"


import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Spinner } from "@/components/ui/spinner"
import { useAuth, signInWithGoogle, logout } from "@/hooks/useAuth";


export const Navbar = () => {
    const { user, loading } = useAuth();

    return (
        <div className="flex flex-row px-4">
            <Button asChild variant="default">
                <Link href="/"> Bookshelf </Link>
            </Button>
            <div>
                {loading ? (
                    <Spinner />
                ) : user ? (
                    <>
                    <Button asChild variant="default">
                        <Link href="/bookshelf"> Enter Bookshelf </Link>
                    </Button>
                    <Button variant="default" onClick={logout}> Log Out </Button>
                    </>
                ) : (
                    <>
                    <Button variant="default" onClick={signInWithGoogle}>
                        Log in with Google
                    </Button>
                    <Button variant="default" asChild>
                        <Link href="/sign-up"> Join Bookshelf</Link>
                    </Button>
                    </>
                )}
            </div>
        </div>
    )
}
