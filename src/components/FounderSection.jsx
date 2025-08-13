"use client";
import React from "react";
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import TiltedCard from "../ui/TiltedCard";

function FounderSection() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-screen-xl mx-auto text-center sm:text-left">
        {/* Founder Info Container */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false, amount: "some" }}
          className="flex flex-col sm:flex-row items-center justify-between border-2 border-gray-300 p-6 rounded-lg shadow-lg"
        >
          {/* Left Section - Text and Heading */}
          <div className="sm:w-2/3">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              className="text-5xl font-bold mb-6 text-center sm:text-left"
            >
              Meet The Founder
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
              className="text-2xl font-semibold mb-2"
            >
              Shaurya Sarin
            </motion.h3>
            <p className="text-lg mb-4">
              Founder, Head of Marketing & Sales at Web Digital Bazaar.
            </p>

            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }}
              className="flex space-x-6 mt-4 sm:justify-start justify-center"
            >
              <a
                href="https://in.linkedin.com/in/shauryasarin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  size={30}
                  className="text-blue-500 hover:text-blue-700" />
              </a>
              <a
                href="https://www.instagram.com/sarinshaurya/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook
                  size={30}
                  className="text-blue-600 hover:text-blue-800" />
              </a>
              {/* <a
                href="https://www.instagram.com/shauryasarin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  size={30}
                  className="text-pink-500 hover:text-pink-700" />
              </a>
              <a
                href="https://www.twitter.com/shauryasarin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter
                  size={30}
                  className="text-blue-400 hover:text-blue-600" />
              </a> */}
            </motion.div>
            
          </div>

          <TiltedCard
            imageSrc="/images/founder.webp"
            altText="Web Digital Bazaar CEO Shaurya Sarin"
            captionText=" Shaurya Sarin"

            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true} />
        </motion.div>
      </div>
    </section>
  );
}

export default FounderSection;