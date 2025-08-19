'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DraggableCardBody, DraggableCardContainer } from '@/ui/draggable-card';
import FramerStacking from '@/components/FramerStacking';
import ScrollFloat from '@/ui/ScrollFloat';
import { ServicesTimeline } from '@/components/ServicesTimeline';
// import { DreamTeam } from '@/components/DreamTeam';
import Navbar from '@/components/Navbar';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';

const items = [
  { title: 'UI/UX ', image: '/images/work/UiUx.png', className: 'absolute top-10 left-[20%] rotate-[-5deg]' },
  { title: 'SEO', image: '/images/work/Seo.png', className: 'absolute top-40 left-[25%] rotate-[-7deg]' },
  { title: 'Social Media', image: '/images/work/SocialMedia.png', className: 'absolute top-5 left-[40%] rotate-[8deg]' },
  { title: 'Marketing', image: '/images/work/Marketing.png', className: 'absolute top-32 left-[55%] rotate-[10deg]' },
  { title: 'Content Writing', image: '/images/work/ContentWriting.png', className: 'absolute top-20 right-[35%] rotate-[2deg]' },
  { title: 'E-commerce', image: '/images/work/E-commerce.png', className: 'absolute top-24 left-[45%] rotate-[-7deg]' },
  { title: 'Branding', image: '/images/work/Branding.png', className: 'absolute top-8 left-[30%] rotate-[4deg]' },
];

const AboutClient = () => {
  return (
    <>
      <Navbar />
      <SocialSidebar />

      {/* Hero Section */}
       <section
              className="w-full h-[100vh] relative overflow-hidden flex items-center justify-center"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/background1.webp')",
                  filter: "blur(2px)",
                  transform: "scale(1.1)", // prevents edges from showing when blurred
                }}
              ></div>
      
              {/* Overlay color for readability (optional) */}
              <div className="absolute inset-0 bg-white/50"></div>
      
              {/* Content */}
              <motion.div
                initial={{ y: "-150%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute text-center w-full"
              >
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-black">
                  ABOUT US
                </h1>
                <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-600">
                   Welcome to the Takshi Tech Digital Marketing Agency
                </p>
              </motion.div>
            </section>

      {/* Services Timeline */}
      <ServicesTimeline />

      {/* Dream Team */}
      {/* <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
        Our Dream Team
      </ScrollFloat>
      <DreamTeam /> */}

      {/* What We Do */}
      <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
        What We Do
      </ScrollFloat>
      <section className="w-full h-auto bg-white text-white py-12">
        <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
          <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
            People don’t buy what you do, they buy why you do it.
          </p>
          {items.map((item, index) => (
            <DraggableCardBody key={index} className={item.className}>
              <img src={item.image} alt={item.title} className="pointer-events-none relative z-10 h-80 w-80 object-cover" />
              <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                {item.title}
              </h3>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </section>

      {/* Our Experience */}
      <section className="w-full bg-slate-950 text-white py-12">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 gap-10">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img src="/images/work/Experience.jpg" alt="About Us Image" className="w-full h-auto max-h-[60vh] object-cover rounded-lg shadow-lg" />
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
                Our Experience
              </ScrollFloat>
            </h2>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-[#dadada] leading-relaxed">
              At Takshi Tech Digital, our journey began with a simple mission — to help businesses unlock their true potential through smart digital marketing.
              One of our earliest projects involved managing the complete online presence for a local retail brand. From redesigning their website and running
              targeted ad campaigns to boosting their social media engagement, we delivered a 300% increase in traffic and a significant rise in sales within
              three months.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="w-full h-auto bg-white text-black py-8 sm:py-12">
        <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div
            className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="/images/work/Mission.png"
              alt="About Us Image"
              className="w-full max-w-[500px] h-[70vh] object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          <motion.div
            className="lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
                Our Mission
              </ScrollFloat>
            </h2>
            <p className="mt-4 text-base sm:text-lg lg:text-2xl text-[#333333] lg:ml-10">
              At Takshi Tech Digital, our mission is straightforward: to support organizations of all sizes—from emerging startups to established corporations—
              with their marketing needs. We are committed to providing tailored solutions that ensure every business, regardless of scale, has the tools and
              expertise to thrive in the digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <FramerStacking />
      <div className="bg-color-white h-2" />
      <Footer />
    </>
  );
};

export default AboutClient;
