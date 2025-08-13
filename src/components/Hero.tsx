"use client";
import React from "react";


const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background GIF */}
     <img
        src="/images/hero.gif"
        alt="Hero Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
        {/* Example Button */}
        {/* 
        <a
          href="#contact-us"
          className="px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-400 hover:text-white transition"
        >
          Contact Us <i className="bx bx-right-arrow-alt ml-2 text-xl"></i>
        </a>
        */}
      </div>
    </section>
  );
};

export default Hero;