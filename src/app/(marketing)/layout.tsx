"use client";

import Image from "next/image";

const MarketingLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className="min-h-screen relative">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0">
                    <Image
                        src="/images/heropic.png"
                        alt="Background hero image"
                        fill
                        priority
                        className="object-cover"
                        quality={100}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />
            </div>
            
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
};

export default MarketingLayout;