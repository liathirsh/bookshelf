"use client";

import { MainNavbar } from "./_components/layout/mainnavbar";
import { Hero } from "./_components/hero";

const MainPageLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className="min-h-screen flex flex-col">
            <MainNavbar />
            <main className="flex-1">
                <Hero />
                {children}
            </main>
        </div>
    )
};

export default MainPageLayout;