"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Spinner } from "@/components/ui/spinner"
import { useAuth, signInWithGoogle, logout } from "@/hooks/useAuth";
import { UserProfileModal } from "./user-profile-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const Navbar = () => {
    const { user, loading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleAvatarClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false)


    return (
        <div className="flex flex-row px-4 py-2">
            <Button asChild variant="default">
                <Link href="/"> Bookshelf </Link>
            </Button>
            <div className="flex items-center gap-1 ml-2">
                {loading ? (
                    <Spinner />
                ) : user ? (
                    <>
                    <Button asChild variant="default">
                        <Link href="/bookshelf"> Enter Bookshelf </Link>
                    </Button>
                    <Button variant="default" onClick={logout}> Log Out </Button>
                    <div className="ml-auto cursor-pointer" onClick={handleAvatarClick}>
                        <Avatar>
                            <AvatarImage
                                src={user.photoURL || ""}
                                alt={user.displayName || "User"}
                            />
                            <AvatarFallback>
                                {user.displayName?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                    </div>
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
            { user && (
                <UserProfileModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    user={{
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL
                    }}
                />
            )}
        </div>
    )
}
