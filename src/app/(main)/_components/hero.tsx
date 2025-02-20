"use client"

import Image from "next/image"

const fantasyLogo = "/images/romantasylogo.png"

export const Hero = () => {
    return (
        <div className="absolute inset-0 -z-10 w-full h-full opacity-50">
            <Image 
                src={fantasyLogo}
                alt="Romantasy logo"
                fill
                priority
                className="object-cover object-center"
                quality={100}
                sizes="100vw"
            />
        </div>
    )
}