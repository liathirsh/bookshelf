"use client"

import Image from "next/image"
import RomantasyLogo from "../../../../public/romantasylogo.png"

export const Hero = () => {
    return (
        <div className="absolute inset-0 -z-10 w-full h-full opacity-50">
            <Image 
                src={RomantasyLogo}
                alt="Etherial forest background"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center'  
                }}
            />
        </div>
    )
}