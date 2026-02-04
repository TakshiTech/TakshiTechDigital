'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const clients = [
    {
        name: 'Nexa Herbal',
        logo: '/images/clients/nexaherbal.png',
        url: 'https://nexaherbal.in',
    },
    {
        name: 'Clap Service',
        logo: '/images/clients/clapservice.png',
        url: 'https://clapservice.in',
    },
    {
        name: 'Swikriti Enterprises',
        logo: '/images/clients/swikriti.png',
        url: 'https://swikritienterprises.com',
    },
    {
        name: 'BBIFTA Film Academy',
        logo: '/images/clients/bbifta.png',
        url: 'https://bbiftafilmacademy.com',
    },
    {
        name: 'Sharda Hospital',
        logo: '/images/clients/sharda.png',
        url: 'https://www.shardahospital.org',
    },
]

export default function Clients() {
    return (
        <section className="w-full py-10 md:py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-10 md:gap-16 lg:gap-20">
                    {clients.map((c) => (
                        <Link
                            key={c.name}
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-32 h-16 md:w-40 md:h-20 lg:w-48 lg:h-24 transition-all duration-300 hover:scale-105 filter grayscale hover:grayscale-0 hover:drop-shadow-md"
                        >
                            <Image
                                src={c.logo}
                                alt={`${c.name} logo`}
                                fill
                                className="object-contain"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
