"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from '@/components/ui/spinner';

interface ProtectedRoutesProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRoutesProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            localStorage.setItem(
                "alertMessage",
                JSON.stringify({
                    type: "error",
                    title: "Please log in first",
                })
            )
            router.push("/")                                
        }
    }, [loading, user, router]);

    if(loading) return <div><Spinner /></div>
    
    return <>{user ? children: null}</>
}