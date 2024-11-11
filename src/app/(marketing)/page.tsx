"use client";

import  { Heading } from "./_components/heading";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";

const MarketingPage = () => {
    return (
        <div className="min-h-full flex flex-col">
            <Navbar />
            <div className="flex flex-col items-center justify-center text-center md:justify-start gap-y-8 flex-1 px-6 pb-10">
                <Heading />
                <Hero />
            </div>
            <Footer />
        </div>
    )
}

export default MarketingPage;