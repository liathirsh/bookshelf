"use client";

import { MainNavbar } from "./_components/layout/mainnavbar";
import { Toaster } from "react-hot-toast";
import { Hero } from "./_components/hero";
import { InfiniteBackground } from './_components/background';

const MainPageLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className="min-h-screen flex flex-col">
            <MainNavbar />
            <main className="flex-1">
                <InfiniteBackground />
                <Hero />
                {children}
                <Toaster />
            </main>
        </div>
    )
};

export default MainPageLayout;