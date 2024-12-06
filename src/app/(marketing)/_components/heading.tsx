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
        <div className="max-w-3xl space-y-4 text-center font-extrabold">
            <h1 className="text-3xl sm:text-5xl md:text-6xl "> 
                Welcome to your Bookshelf    
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium ">
            A place to find your next read and chat all things fantasy books
            </h3>
        {loading ? (
            <Spinner /> 
        ) : user ? (
            <Button asChild>
                <Link href="/dashboard">
                    Enter Bookshelf
                </Link>
            </Button>
        
        ) : (
            <Button onClick={()=> router.push('/sign-up')}>
                Join BookShelf Free
                <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
        )}   
        </div>
    );
};
