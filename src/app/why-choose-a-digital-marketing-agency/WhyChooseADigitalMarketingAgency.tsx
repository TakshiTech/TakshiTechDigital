"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FloatNavbar from '@/components/FloatNavbar';

const WhyChooseADigitalMarketingAgency: React.FC = () => {
  // Refs for scroll detection
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);
  const section7Ref = useRef(null);
  const section8Ref = useRef(null);
  const section10Ref = useRef(null);

  // Detect when sections are in view
  const section1InView = useInView(section1Ref, { once: false, amount: 0.3 });
  const section2InView = useInView(section2Ref, { once: false, amount: 0.3 });
  const section3InView = useInView(section3Ref, { once: false, amount: 0.3 });
  const section4InView = useInView(section4Ref, { once: false, amount: 0.3 });
  const section5InView = useInView(section5Ref, { once: false, amount: 0.3 });
  const section6InView = useInView(section6Ref, { once: false, amount: 0.3 });
  const section7InView = useInView(section7Ref, { once: false, amount: 0.3 });
  const section8InView = useInView(section8Ref, { once: false, amount: 0.3 });
  const section10InView = useInView(section10Ref, { once: false, amount: 0.3 });

  // Animation variants for Section 1 heading
  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeInOut' } },
  };

  // Animation variants for Section 1 subheading
  const subheadingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: 'easeInOut' } },
  };

  // Animation variants for Section 1 button
  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.5, ease: 'easeInOut' } },
  };

  // Animation variants for Section 2 icon
  const section2IconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 2 heading
  const section2HeadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' } },
  };

  // Animation variants for Section 2 bullet points (container)
  const section2ListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  // Animation variants for each bullet point in Section 2
  const section2ItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 2 image
  const section2ImageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 3 icon
  const section3IconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 3 heading
  const section3HeadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' } },
  };

  // Animation variants for Section 3 bullet points (container)
  const section3ListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  // Animation variants for each bullet point in Section 3
  const section3ItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 3 images
  const section3ImageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 4 icon
  const section4IconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 4 heading
  const section4HeadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' } },
  };

  // Animation variants for Section 4 bullet points (container)
  const section4ListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  // Animation variants for each bullet point in Section 4
  const section4ItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 4 image
  const section4ImageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 5 icon
  const section5IconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 5 heading
  const section5HeadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' } },
  };

  // Animation variants for Section 5 bullet points (container)
  const section5ListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  // Animation variants for each bullet point in Section 5
  const section5ItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 5 image
  const section5ImageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 6 icon
  const section6IconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 6 heading
  const section6HeadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' } },
  };

  // Animation variants for Section 6 bullet points (container)
  const section6ListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  // Animation variants for each bullet point in Section 6
  const section6ItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 6 image
  const section6ImageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 7 icon
  const section7IconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 7 heading
  const section7HeadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' } },
  };

  // Animation variants for Section 7 bullet points (container)
  const section7ListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  // Animation variants for each bullet point in Section 7
  const section7ItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 7 image
  const section7ImageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 8 icon
  const section8IconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 8 heading
  const section8HeadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' } },
  };

  // Animation variants for Section 8 bullet points (container)
  const section8ListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  // Animation variants for each bullet point in Section 8
  const section8ItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 8 image
  const section8ImageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.6, ease: 'easeInOut' } },
  };

  // Animation variants for Section 10 heading
  const section10HeadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  // Animation variants for Section 10 subheading
  const section10SubheadingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' } },
  };

  // Animation variants for Section 10 button
  const section10ButtonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.4, ease: 'easeInOut' } },
  };

  // Animation variants for Section 10 contact details (container)
  const section10ContactVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.6,
      },
    },
  };

  // Animation variants for each contact item in Section 10
  const section10ContactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  return (
    <>
      <FloatNavbar />
      <div className="flex flex-col">
        {/* Section 1: Main Content Section */}
        <div
          ref={section1Ref}
          className="min-h-screen bg-black flex flex-col justify-center items-start px-10 md:px-20 py-10"
        >
          <motion.h1
            className="text-white text-5xl md:text-7xl font-bold leading-tight"
            variants={headingVariants}
            initial="hidden"
            animate={section1InView ? "visible" : "hidden"}
          >
            WHY SHOULD <br />
            YOU CHOOSE A <br />
            <span className="text-yellow-400">DIGITAL MARKETING AGENCY</span> <br />
            OVER A TEAM OF OWN
          </motion.h1>
          <motion.p
            className="text-white text-xl md:text-2xl mt-6"
            variants={subheadingVariants}
            initial="hidden"
            animate={section1InView ? "visible" : "hidden"}
          >
            We are an award-winning design agency that enable brands to make their mark in history.
          </motion.p>
          <motion.button
            className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-pink-500 text-white font-semibold text-lg rounded-full hover:from-blue-700 hover:to-pink-600 transition"
            variants={buttonVariants}
            initial="hidden"
            animate={section1InView ? "visible" : "hidden"}
          >
            WORK WITH US
          </motion.button>
        </div>

        {/* Section 2: Expertise and Specialization */}
        <div
          ref={section2Ref}
          className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-10 gap-12 md:gap-20"
        >
          {/* Left: Text Content */}
          <div className="md:w-1/2">
            <motion.div
              className="flex items-center mb-6"
              variants={section2IconVariants}
              initial="hidden"
              animate={section2InView ? "visible" : "hidden"}
            >
              <svg className="w-12 h-12 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 2Z" fill="#3B82F6" />
                <path d="M18 21.5L15.5 14H8.5L6 21.5L12 17L18 21.5Z" fill="#EC4899" />
              </svg>
            </motion.div>
            <motion.h2
              className="text-black text-4xl md:text-6xl font-bold mb-6"
              variants={section2HeadingVariants}
              initial="hidden"
              animate={section2InView ? "visible" : "hidden"}
            >
              EXPERTISE AND SPECIALIZATION
            </motion.h2>
            <motion.ul
              className="text-black text-xl md:text-2xl space-y-4"
              variants={section2ListVariants}
              initial="hidden"
              animate={section2InView ? "visible" : "hidden"}
            >
              <motion.li className="flex items-start" variants={section2ItemVariants}>
                <span className="mr-3">-</span> Agencies often have specialized teams with diverse skills.
              </motion.li>
              <motion.li className="flex items-start" variants={section2ItemVariants}>
                <span className="mr-3">-</span> Access to a range of experts in SEO, social media, content, etc.
              </motion.li>
            </motion.ul>
          </div>

          {/* Right: Bottle Image */}
          <motion.div
            className="md:w-1/2 flex justify-center mt-10 md:mt-0"
            variants={section2ImageVariants}
            initial="hidden"
            animate={section2InView ? "visible" : "hidden"}
          >
            <img
              src="https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Bottle"
              className="w-96 h-auto md:w-[450px] md:h-[650px]"
            />
          </motion.div>
        </div>

        {/* Section 3: Cost Efficiency */}
        <div
          ref={section3Ref}
          className="min-h-screen bg-black flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-10"
        >
          {/* Left: Images */}
          <motion.div
            className="md:w-1/2 flex flex-col md:flex-row gap-6 mb-10 md:mb-0 mr-10"
            variants={section3ImageVariants}
            initial="hidden"
            animate={section3InView ? "visible" : "hidden"}
          >
            <img
              src="https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Bottle"
              className="w-64 h-64 md:w-72 md:h-72 object-cover"
            />
            <img
              src="https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Dropper"
              className="w-64 h-64 md:w-72 md:h-72 object-cover"
            />
          </motion.div>

          {/* Right: Text Content */}
          <div className="md:w-1/2">
            <motion.div
              className="flex justify-end mb-6"
              variants={section3IconVariants}
              initial="hidden"
              animate={section3InView ? "visible" : "hidden"}
            >
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#EC4899" strokeWidth="2" />
                <path d="M12 2L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 2Z" fill="#3B82F6" />
              </svg>
            </motion.div>
            <motion.h2
              className="text-white text-4xl md:text-6xl font-bold mb-6"
              variants={section3HeadingVariants}
              initial="hidden"
              animate={section3InView ? "visible" : "hidden"}
            >
              COST EFFICIENCY
            </motion.h2>
            <motion.ul
              className="text-white text-xl md:text-2xl space-y-4"
              variants={section3ListVariants}
              initial="hidden"
              animate={section3InView ? "visible" : "hidden"}
            >
              <motion.li className="flex items-start" variants={section3ItemVariants}>
                <span className="mr-3">-</span> Agencies may provide cost savings compared to hiring and training an in-house team.
              </motion.li>
              <motion.li className="flex items-start" variants={section3ItemVariants}>
                <span className="mr-3">-</span> No need for salaries, benefits, and ongoing training expenses.
              </motion.li>
            </motion.ul>
          </div>
        </div>

        {/* Section 4: Advanced Tools and Technologies */}
        <div
          ref={section4Ref}
          className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-10 gap-12 md:gap-20"
        >
          {/* Left: Text Content */}
          <div className="md:w-1/2">
            <motion.h2
              className="text-black text-4xl md:text-6xl font-bold mb-6"
              variants={section4HeadingVariants}
              initial="hidden"
              animate={section4InView ? "visible" : "hidden"}
            >
              ADVANCED TOOLS AND TECHNOLOGIES
            </motion.h2>
            <motion.div
              className="flex items-center mb-6"
              variants={section4IconVariants}
              initial="hidden"
              animate={section4InView ? "visible" : "hidden"}
            >
              <svg className="w-12 h-12 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 6Z" fill="#3B82F6" />
                <path d="M12 6L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 6Z" fill="#EC4899" transform="translate(-2, -2)" />
                <path d="M12 6L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 6Z" fill="#A855F7" transform="translate(2, 2)" />
              </svg>
            </motion.div>
            <motion.ul
              className="text-black text-xl md:text-2xl space-y-4"
              variants={section4ListVariants}
              initial="hidden"
              animate={section4InView ? "visible" : "hidden"}
            >
              <motion.li className="flex items-start" variants={section4ItemVariants}>
                <span className="mr-3">-</span> Agencies typically have access to cutting-edge tools and technologies.
              </motion.li>
              <motion.li className="flex items-start" variants={section4ItemVariants}>
                <span className="mr-3">-</span> In-house teams might struggle to afford or keep up with the latest marketing tools.
              </motion.li>
            </motion.ul>
          </div>

          {/* Right: Laptop Image */}
          <motion.div
            className="md:w-1/2 flex justify-center mt-10 md:mt-0"
            variants={section4ImageVariants}
            initial="hidden"
            animate={section4InView ? "visible" : "hidden"}
          >
            <img
              src="https://images.pexels.com/photos/6476245/pexels-photo-6476245.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Laptop"
              className="w-96 h-auto md:w-[450px] md:h-[650px]"
            />
          </motion.div>
        </div>

        {/* Section 5: Scalability and Flexibility */}
        <div
          ref={section5Ref}
          className="min-h-screen bg-black flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-10 gap-12 md:gap-20"
        >
          {/* Left: Bottle Image */}
          <motion.div
            className="md:w-1/2 flex justify-center mt-10 md:mt-0"
            variants={section5ImageVariants}
            initial="hidden"
            animate={section5InView ? "visible" : "hidden"}
          >
            <img
              src="https://images.pexels.com/photos/6476595/pexels-photo-6476595.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Bottle"
              className="w-96 h-auto md:w-[450px] md:h-[650px]"
            />
          </motion.div>

          {/* Right: Text Content */}
          <div className="md:w-1/2">
            <motion.div
              className="flex items-center mb-6"
              variants={section5IconVariants}
              initial="hidden"
              animate={section5InView ? "visible" : "hidden"}
            >
              <svg className="w-12 h-12 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 2Z" fill="#3B82F6" />
                <path d="M12 2L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 2Z" fill="#EC4899" transform="translate(-2, -2)" />
                <path d="M12 2L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 2Z" fill="#A855F7" transform="translate(2, 2)" />
              </svg>
            </motion.div>
            <motion.h2
              className="text-white text-4xl md:text-6xl font-bold mb-6"
              variants={section5HeadingVariants}
              initial="hidden"
              animate={section5InView ? "visible" : "hidden"}
            >
              SCALABILITY AND FLEXIBILITY
            </motion.h2>
            <motion.ul
              className="text-white text-xl md:text-2xl space-y-4"
              variants={section5ListVariants}
              initial="hidden"
              animate={section5InView ? "visible" : "hidden"}
            >
              <motion.li className="flex items-start" variants={section5ItemVariants}>
                <span className="mr-3">-</span> Agencies can quickly scale efforts up or down based on your needs and scale up or down as required.
              </motion.li>
              <motion.li className="flex items-start" variants={section5ItemVariants}>
                <span className="mr-3">-</span> In-house teams may be less flexible and more challenging to adjust to market demands.
              </motion.li>
            </motion.ul>
          </div>
        </div>

        {/* Section 6: Faster Results */}
        <div
          ref={section6Ref}
          className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-10 gap-12 md:gap-20"
        >
          {/* Left: Text Content */}
          <div className="md:w-1/2">
            <motion.h2
              className="text-black text-4xl md:text-6xl font-bold mb-6"
              variants={section6HeadingVariants}
              initial="hidden"
              animate={section6InView ? "visible" : "hidden"}
            >
              FASTER RESULTS
            </motion.h2>
            <motion.div
              className="flex items-center mb-6"
              variants={section6IconVariants}
              initial="hidden"
              animate={section6InView ? "visible" : "hidden"}
            >
              <svg className="w-12 h-12 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 6Z" fill="#3B82F6" />
                <path d="M12 6L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 6Z" fill="#EC4899" transform="translate(-2, -2)" />
                <path d="M12 6L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 6Z" fill="#A855F7" transform="translate(2, 2)" />
              </svg>
            </motion.div>
            <motion.ul
              className="text-black text-xl md:text-2xl space-y-4"
              variants={section6ListVariants}
              initial="hidden"
              animate={section6InView ? "visible" : "hidden"}
            >
              <motion.li className="flex items-start" variants={section6ItemVariants}>
                <span className="mr-3">-</span> Agencies often have established processes, leading to quicker campaign implementation.
              </motion.li>
              <motion.li className="flex items-start" variants={section6ItemVariants}>
                <span className="mr-3">-</span> In-house teams might face learning curves and take longer to achieve results.
              </motion.li>
            </motion.ul>
          </div>

          {/* Right: Laptop Image */}
          <motion.div
            className="md:w-1/2 flex justify-center mt-10 md:mt-0"
            variants={section6ImageVariants}
            initial="hidden"
            animate={section6InView ? "visible" : "hidden"}
          >
            <img
              src="https://images.pexels.com/photos/6476805/pexels-photo-6476805.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Laptop"
              className="w-96 h-auto md:w-[450px] md:h-[650px]"
            />
          </motion.div>
        </div>

        {/* Section 7: Mitigating Risks */}
        <div
          ref={section7Ref}
          className="min-h-screen bg-black flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-10 gap-12 md:gap-20"
        >
          {/* Left: Bottle Image */}
          <motion.div
            className="md:w-1/2 flex justify-center mt-10 md:mt-0"
            variants={section7ImageVariants}
            initial="hidden"
            animate={section7InView ? "visible" : "hidden"}
          >
            <img
              src="https://images.pexels.com/photos/7414105/pexels-photo-7414105.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Bottle"
              className="w-96 h-auto md:w-[450px] md:h-[650px]"
            />
          </motion.div>

          {/* Right: Text Content */}
          <div className="md:w-1/2">
            <motion.div
              className="flex items-center mb-6"
              variants={section7IconVariants}
              initial="hidden"
              animate={section7InView ? "visible" : "hidden"}
            >
              <svg className="w-12 h-12 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 2Z" fill="#3B82F6" />
                <path d="M12 2L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 2Z" fill="#EC4899" transform="translate(-2, -2)" />
                <path d="M12 2L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 2Z" fill="#A855F7" transform="translate(2, 2)" />
              </svg>
            </motion.div>
            <motion.h2
              className="text-white text-4xl md:text-6xl font-bold mb-6"
              variants={section7HeadingVariants}
              initial="hidden"
              animate={section7InView ? "visible" : "hidden"}
            >
              MITIGATING RISKS
            </motion.h2>
            <motion.ul
              className="text-white text-xl md:text-2xl space-y-4"
              variants={section7ListVariants}
              initial="hidden"
              animate={section7InView ? "visible" : "hidden"}
            >
              <motion.li className="flex items-start" variants={section7ItemVariants}>
                <span className="mr-3">-</span> Agencies can offer a level of risks mitigation with experienced professionals.
              </motion.li>
              <motion.li className="flex items-start" variants={section7ItemVariants}>
                <span className="mr-3">-</span> In-house teams may face challenges in handling unforeseen marketing issues.
              </motion.li>
            </motion.ul>
          </div>
        </div>

        {/* Section 8: Measurable Results and Analytics */}
        <div
          ref={section8Ref}
          className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-10 gap-12 md:gap-20"
        >
          {/* Left: Text Content */}
          <div className="md:w-1/2">
            <motion.h2
              className="text-black text-4xl md:text-6xl font-bold mb-6"
              variants={section8HeadingVariants}
              initial="hidden"
              animate={section8InView ? "visible" : "hidden"}
            >
              MEASURABLE RESULTS AND ANALYTICS
            </motion.h2>
            <motion.div
              className="flex items-center mb-6"
              variants={section8IconVariants}
              initial="hidden"
              animate={section8InView ? "visible" : "hidden"}
            >
              <svg className="w-12 h-12 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 6Z" fill="#3B82F6" />
                <path d="M12 6L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 6Z" fill="#EC4899" transform="translate(-2, -2)" />
                <path d="M12 6L14.5 9.5H21L15.5 14L18 21.5L12 17L6 21.5L8.5 14L3 9.5H9.5L12 6Z" fill="#A855F7" transform="translate(2, 2)" />
              </svg>
            </motion.div>
            <motion.ul
              className="text-black text-xl md:text-2xl space-y-4"
              variants={section8ListVariants}
              initial="hidden"
              animate={section8InView ? "visible" : "hidden"}
            >
              <motion.li className="flex items-start" variants={section8ItemVariants}>
                <span className="mr-3">-</span> Agencies often provide detailed analytics and reports for campaign performance.
              </motion.li>
              <motion.li className="flex items-start" variants={section8ItemVariants}>
                <span className="mr-3">-</span> In-house teams may find it challenging to generate comprehensive analytics.
              </motion.li>
            </motion.ul>
          </div>

          {/* Right: Laptop Image */}
          <motion.div
            className="md:w-1/2 flex justify-center mt-10 md:mt-0"
            variants={section8ImageVariants}
            initial="hidden"
            animate={section8InView ? "visible" : "hidden"}
          >
            <img
              src="https://images.pexels.com/photos/6801643/pexels-photo-6801643.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Laptop"
              className="w-96 h-auto md:w-[450px] md:h-[650px]"
            />
          </motion.div>
        </div>

        {/* Section 10: Call to Action / Contact Details */}
        <div
          ref={section10Ref}
          className="min-h-screen bg-black flex flex-col justify-center items-center px-10 md:px-20 py-10 text-center"
        >
          <motion.h2
            className="text-white text-4xl md:text-6xl font-bold mb-6"
            variants={section10HeadingVariants}
            initial="hidden"
            animate={section10InView ? "visible" : "hidden"}
          >
            READY TO GROW YOUR BUSINESS?
          </motion.h2>
          <motion.p
            className="text-white text-xl md:text-2xl mb-8"
            variants={section10SubheadingVariants}
            initial="hidden"
            animate={section10InView ? "visible" : "hidden"}
          >
            Contact us today to see how we can help you achieve your goals.
          </motion.p>
          <motion.button
            className="mb-12 px-8 py-4 bg-gradient-to-r from-blue-600 to-pink-500 text-white font-semibold text-lg rounded-full hover:from-blue-700 hover:to-pink-600 transition"
            variants={section10ButtonVariants}
            initial="hidden"
            animate={section10InView ? "visible" : "hidden"}
          >
            <a href="/contact">GET IN TOUCH</a>
          </motion.button>
          <motion.div
            className="flex flex-col md:flex-row gap-6 text-white text-xl md:text-2xl"
            variants={section10ContactVariants}
            initial="hidden"
            animate={section10InView ? "visible" : "hidden"}
          >
            <motion.div className="flex items-center" variants={section10ContactItemVariants}>
              <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <a href="mailto:info@takshitechdigital.com" className="hover:underline">info@takshitechdigital.com</a>
            </motion.div>
            <motion.div className="flex items-center" variants={section10ContactItemVariants}>
              <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <a href="tel:+91 8860692013" className="hover:underline">+91 8851099103</a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseADigitalMarketingAgency;