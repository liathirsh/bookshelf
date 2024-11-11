"use client"

import Image from "next/image"
import HeroPic from "../../../../public/HeroPic.png"

export const Hero = () => {
    return (
        <div className="absolute inset-0 -z-10 w-full h-full">
            <Image 
                src={HeroPic}
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