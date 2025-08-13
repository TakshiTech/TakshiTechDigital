'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TextParallaxContentExample } from '@/components/TextParallax';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SocialSidebar from '@/components/SocialSidebar';
import Cursor from '@/components/Cursor';
import { CircleHeading } from '@/ui/CircleHeading';
import ScrollContactForm from '@/components/ScrollContactForm';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Marketing',
    description: 'Building responsive, interactive, and modern websites that suit your needs.',
    icon: '🌐',
    link: '/services/marketing',
  },
  {
    id: 2,
    title: 'Design',
    description: 'Creating seamless mobile applications for both Android and iOS platforms.',
    icon: '📈',
    link: '/services/design',
  },
  {
    id: 3,
    title: 'Technology',
    description: 'Designing user-friendly and visually appealing interfaces for a better user experience.',
    icon: '📱',
    link: '/services/technology',
  },
];

const ServicesClient: React.FC = () => {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <Cursor />
      <ScrollContactForm />

      {/* Hero Section */}
      <section className="w-full h-[100vh] bg-gray-100 flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: "url('/images/background3.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(3px)',
          }}
        />
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute text-center w-full z-10"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-black">SERVICES</h1>
        </motion.div>

        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
          onClick={() => {
            window.scrollBy({
              top: window.innerHeight * 0.8,
              left: 0,
              behavior: 'smooth',
            });
          }}
        >
          <span className="mb-2 text-black text-lg font-medium opacity-80">scroll down</span>
          <svg
            className="animate-bounce w-10 h-10 text-black opacity-70"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.link}
                className="flex flex-col items-center bg-white p-10 md:p-12 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-xs mx-auto"
              >
                <div className="text-7xl md:text-8xl mb-6 text-blue-500">{service.icon}</div>
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 text-lg">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      <CircleHeading />
      <TextParallaxContentExample />
      <Footer />
    </>
  );
};

export default ServicesClient;
