'use client'

import React from 'react'
import Image from 'next/image'

const partners = [
    {
        name: 'PhonePe',
        logo: '/images/partners/phonepe.png',
    },
    {
        name: 'Sharda Hospital',
        logo: '/images/partners/sharda.png',
    },
]

export default function Partners() {
    return (
        <section className="w-full py-10 md:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-wrap items-center justify-center gap-16 md:gap-32">
                    {partners.map((p) => (
                        <div key={p.name} className="relative w-48 h-24 md:w-64 md:h-32 transition-all duration-300 hover:scale-110 filter grayscale-0 hover:drop-shadow-lg">
                            <Image
                                src={p.logo}
                                alt={`${p.name} logo`}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
