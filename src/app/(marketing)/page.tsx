"use client";

import  { Heading } from "./_components/heading";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";
// import { AlertMessage } from "../(main)/_components/alert-message";

const MarketingPage = () => {
    return (
        <div className="min-h-full flex flex-col">
            {/* <AlertMessage /> */}
            <Navbar />
            <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
                <Heading />
                <Hero />
            </div>
            <Footer />
        </div>
    )
}

export default MarketingPage;