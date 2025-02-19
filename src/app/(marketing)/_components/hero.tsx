"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                    <Image
                        src="/heropic.png"
                        fill
                        alt="Hero"
                        priority
                        className="object-contain dark:hidden"
                    />
                    
                </div>
            </div>
            <div className="text-center">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                    Your Books, Your Journey
                </h1>
                <p className="text-muted-foreground text-sm sm:text-lg md:text-xl mt-4">
                    Track your reading journey, one page at a time
                </p>
                <Button size="lg" asChild className="mt-6">
                    <Link href="/dashboard">
                        Get Started
                    </Link>
                </Button>
            </div>
        </div>
    )
}