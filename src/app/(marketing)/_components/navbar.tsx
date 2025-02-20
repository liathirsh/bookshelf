"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Spinner } from "@/components/ui/spinner"
import { logout } from "@/hooks/useAuth";
import { useAuthContext } from "@/context/auth-context"
import { UserProfileModal } from "./user-profile-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
    const { user, loading } = useAuthContext();
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleAvatarClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false)

    return (
        <nav className="absolute top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link 
                        href="/" 
                        className="text-xl font-semibold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_60%)] hover:opacity-90 transition-opacity"
                    >
                        Bookshelf
                    </Link>

                    <div className="flex items-center gap-4">
                        {loading ? (
                            <Spinner className="text-white" />
                        ) : user ? (
                            <>
                                <Button 
                                    asChild
                                    className="bg-white/20 backdrop-blur-sm text-white border border-white/20
                                             hover:bg-white/30 transition-all duration-200
                                             [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]"
                                >
                                    <Link href="/dashboard">Enter Bookshelf</Link>
                                </Button>
                                <Button 
                                    onClick={logout}
                                    className="bg-black/30 backdrop-blur-sm text-white border border-white/20
                                                hover:bg-black/40 transition-all duration-200
                                                [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]"
                                >
                                    Log Out
                                </Button>
                                <div 
                                    className="cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={handleAvatarClick}
                                >
                                    <Avatar className="border-2 border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                                        <AvatarImage
                                            src={user.photoURL || ""}
                                            alt={user.displayName || "User"}
                                        />
                                        <AvatarFallback className="bg-black/30 text-white">
                                            {user.displayName?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </>
                        ) : (
                            <>
                                <Button 
                                    asChild
                                    className="bg-white/20 backdrop-blur-sm text-white border border-white/20
                                             hover:bg-white/30 transition-all duration-200
                                             [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]"
                                >
                                    <Link href="/login">Enter Bookshelf</Link>
                                </Button>
                                <Button 
                                    asChild
                                    className="bg-black/30 backdrop-blur-sm text-white border border-white/20
                                             hover:bg-black/40 transition-all duration-200
                                             [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]"
                                >
                                    <Link href="/sign-up">Join Bookshelf</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {user && (
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
        </nav>
    )
}
