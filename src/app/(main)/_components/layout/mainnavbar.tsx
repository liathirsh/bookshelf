"use client";

import { logout } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const MainNavbar = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            setIsMenuOpen(false);
            await logout();
            router.push("/")
        } catch(error) {
            console.log("Logout failed:", error)
        }
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/dashboard" className="text-xl font-semibold text-gray-800">
                            Bookshelf
                        </Link>
                    </div>

                    <div className="sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden sm:flex sm:space-x-8">
                        <Link 
                            href="/dashboard"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <Link 
                            href="/books"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                        >
                            My Books
                        </Link>
                        <Link 
                            href="/browse"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                        >
                            Browse
                        </Link>
                        <Link 
                            href="/recommendations"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            
                            <span>AI Recommendor</span>
                            
                        </Link>
                    </div>

                    <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg`}>
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link 
                                href="/dashboard"
                                onClick={handleLinkClick}
                                className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors"
                            >
                                Home
                            </Link>
                            <Link 
                                href="/books"
                                onClick={handleLinkClick}
                                className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors"
                            >
                                My Books
                            </Link>
                            <Link 
                                href="/browse"
                                onClick={handleLinkClick}
                                className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors"
                            >
                                Browse
                            </Link>
                            <Link 
                                href="/recommendations"
                                onClick={handleLinkClick}
                                className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors"
                            >
                                AI Recommendor
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>

                    <div className="hidden sm:block">
                        <button 
                            onClick={handleLogout}
                            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium
                                     hover:bg-gray-800 transition-colors duration-200"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
