"use client";

import { logout } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const MainNavbar = () => {
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
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/dashboard" className="text-xl font-semibold text-gray-800">
                            Bookshelf
                        </Link>
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
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                        >
                            Recommendations
                        </Link>
                    </div>

                    <div>
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
