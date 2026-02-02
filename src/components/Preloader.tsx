'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
    const [complete, setComplete] = useState(false);
    const [percent, setPercent] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Optional: Check session storage if you want it once per session.
        // Commented out for dev so you can see it on refresh.
        /*
        const hasShown = sessionStorage.getItem('hasShownPreloader_v2');
        if (hasShown) {
          setComplete(true);
          return;
        }
        */

        setDimension({ width: window.innerWidth, height: window.innerHeight });
        document.body.style.overflow = 'hidden';

        // Animate percentage smoother
        const interval = setInterval(() => {
            setPercent((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Smaller increments, faster updates for perceived smoothness
                const inc = Math.random() * 2 + 0.5;
                return Math.min(prev + inc, 100);
            });
        }, 50); // faster tick

        // Done after ~2.8s
        const timeout = setTimeout(() => {
            setComplete(true);
            document.body.style.overflow = '';
            // sessionStorage.setItem('hasShownPreloader_v2', 'true');
        }, 2800);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            document.body.style.overflow = '';
        };
    }, []);

    const slideUp = {
        initial: { top: 0 },
        exit: {
            top: '-100vh',
            transition: { duration: 1, ease: [0.87, 0, 0.13, 1], delay: 0.1 }
        }
    }

    const opacity = {
        initial: { opacity: 0 },
        enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
    }

    return (
        <AnimatePresence mode="wait">
            {!complete && (
                <motion.div
                    variants={slideUp}
                    initial="initial"
                    exit="exit"
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950 text-white"
                >
                    <motion.div
                        className="flex flex-col items-center justify-center gap-8 relative z-10"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -100, transition: { duration: 0.5 } }} // Fade content out before curtain lifts
                    >
                        {/* Logo Pulse */}
                        <div
                            className="relative w-72 h-32 md:w-96 md:h-40"
                        >
                            <Image
                                src="/images/animated-logo.gif"
                                alt="Loading..."
                                fill
                                className="object-contain"
                                unoptimized
                                priority
                            />
                        </div>

                        {/* Percentage / Progress Line */}
                        <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                            <motion.div
                                className="absolute left-0 top-0 bottom-0 bg-emerald-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.floor(percent)}%` }} // Snap to floor to avoid sub-pixel jitter
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                        </div>

                        <p className="text-neutral-500 font-mono text-xs tracking-widest uppercase">
                            Loading Experience {Math.floor(percent)}%
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
