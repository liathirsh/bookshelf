"use client";

import { MainNavbar } from "./_components/layout/mainnavbar";
import { Hero } from "./_components/hero";

const MainPageLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className = "h-auto overflow-y-visible md:h-screen md:overflow-y-auto">
            <MainNavbar />
            <main className="h-full pt-10">
                <Hero />
                {children}
            </main>
        </div>
    )
};

export default MainPageLayout;