"use client";
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import RippleButton from './animata/button/ripple_button';

interface ServiceData {
  name: string;
  color: string;
  subServices: string[];
  illustrationSrc: string;
  buttonSrc: string;
}

const services: ServiceData[] = [
  {
    name: 'Marketing',
    color: 'bg-purple-500',
    subServices: ['SEO', 'Social Media Marketing', 'PPC Advertising', 'Content Marketing', 'Email Marketing',],
    illustrationSrc: '/videos/marketing.webm',
    buttonSrc: '/services/marketing',
  },
  {
    name: 'Design',
    color: 'bg-red-500',
    subServices: ['UI/UX Design', 'Social Media Posts', 'Poster & Flyer Designing', 'Business Cards Design', 'Mockups', 'Brochures', 'Branding'],
    illustrationSrc: '/videos/design.webm',
    buttonSrc: '/services/design',
  },
  {
    name: 'Technology',
    color: 'bg-blue-500',
    subServices: ['Web Development', 'App Development', 'Wordpress Website', 'API Development & Integration', 'CMS Development', 'E-Commerce Development', 'Custom Web Application Development'],
    illustrationSrc: '/videos/technology.webm',
    buttonSrc: '/services/technology',
  },

];

interface ServiceItemProps {
  service: ServiceData;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px 0px' });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      height: 0,
      marginTop: 0,
      transition: { duration: 1.5, ease: 'easeIn' } // Slow exit animation
    },
    visible: {
      opacity: 1,
      y: 0,
      height: 'auto',
      marginTop: 20,
      transition: { duration: 1, ease: 'easeOut' } // Slow enter animation
    },
  };

  return (
    <div className="p-10">
      <div ref={ref} className="flex content-start gap-5">
        <div className="relative">
          <div className={`w-10 h-10 md:w-15 md:h-15 ${service.color} rounded-full`}></div>
          <div className="absolute inset-0 border-2 border-dashed border-white rounded-full"></div>
        </div>
        <span className="text-3xl md:text-5xl font-semibold">{service.name}</span>
      </div>
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={controls}
        className="overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center gap-0 pl-10">
          {/* Sub-services List */}
          <div className="flex-1">
            <ul className="space-y-3">
              {service.subServices.map((subService) => (
                <li key={subService} className="text-2xl">{subService}</li>
              ))}
            </ul>
            <div className='mt-10'>
              <a
                href={service.buttonSrc}
                className="w-full rounded px-9 py-4 text-xl text-white transition-colors md:w-fit inline-flex items-center justify-center"
              >
                <RippleButton>
                  Explore {service.name}
                </RippleButton>
              </a>
            </div>
          </div>

          {/* Illustration */}

          <div className="flex-1">
            <video
              className="w-full h-60 sm:h-0 md:h-[50vh] object-contain rounded-lg"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={service.illustrationSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Services: React.FC = () => {
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Duration of the scroll (higher = slower)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="py10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col gap-3">
          {services.map((service) => (
            <ServiceItem key={service.name} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;