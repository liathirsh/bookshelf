"use client"

import { useAuth } from "@/hooks/useAuth";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Heading = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto text-center space-y-8">
            
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white
                          tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                          [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
                Welcome to Your<br />
                Bookshelf
            </h1>
            <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto leading-relaxed
                         drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                         [text-shadow:_1px_1px_4px_rgb(0_0_0_/_80%)]">
                A place to find your next fantasy read and get AI Recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                {loading ? (
                    <Spinner /> 
                ) : user ? (
                    <>
                        <Button asChild variant="outline">
                            <Link href="/browse">
                                Explore Bookshelf
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/dashboard">
                                Enter Bookshelf
                                <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                    </>
                ) : (
                    <>
                        
                        <Button onClick={() => router.push('/sign-up')}>
                            Enter Bookshelf
                            <ArrowRight className="ml-2" />
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};
