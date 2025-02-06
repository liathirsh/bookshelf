"use client";

import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { Heading } from "./_components/heading";

const MarketingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center">
                <Heading />
            </main>
            <Footer />
        </div>
    )
}

export default MarketingPage;