"use client";

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export function InfiniteBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, -200]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <motion.div 
                ref={containerRef}
                style={{ y }}
                className="absolute inset-0"
            >
                <div 
                    className="absolute inset-0 bg-[#D6C8BD] opacity-5"
                    style={{ 
                        backgroundSize: 'clamp(100px, 12vw, 250px)',
                        transform: 'rotate(15deg)',
                        backgroundRepeat: 'repeat',
                        height: '200%', 
                    }}
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#A0968D]/50 to-[#D6C8BD]" />
        </div>
    );
} 