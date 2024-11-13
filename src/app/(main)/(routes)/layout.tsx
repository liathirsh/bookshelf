"use client";

const MainPageLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className = "h-full">
            <main className="h-full pt-10">
                {children}
            </main>
        </div>
    )
};

export default MainPageLayout;