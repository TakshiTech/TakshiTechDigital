"use client";
import React, { useState, useEffect } from 'react';

interface TestimonialData {
  logoSrc: string;
  testimonial: string;
  author: string;
  role: string;
}

const testimonials: TestimonialData[] = [
  {
    logoSrc: 'images/testimonial/testimonial1.png',
    testimonial: 'Web Digital Bazaar transformed our online presence with their expert digital marketing strategies. From SEO to paid campaigns, every service delivered measurable results. Highly recommended for business growth!',
    author: 'Ankit Sharma',
    role: 'Founder',
  },
  {
    logoSrc: 'images/testimonial/testimonial2.png',
    testimonial: 'The team at Web Digital Bazaar designed an outstanding and user-friendly website for us. Their attention to detail, creative approach, and timely delivery exceeded our expectations',
    author: 'Pooja Mehta',
    role: 'Marketing Head',
  },
  {
    logoSrc: 'images/testimonial/testimonial3.png',
    testimonial: 'We approached Web Digital Bazaar for tech solutions and were impressed by their professionalism and innovative approach. Their custom solutions simplified our operations and improved efficiency.',
    author: 'Rahul Verma',
    role: 'CEO',
  },
];

const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { logoSrc, testimonial, author, role } = testimonials[currentIndex];

  return (
    <div className="relative bg-white text-black py-10 px-5">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-5">
        {/* Testimonial Content */}
        <div className="bg-white text-black rounded-lg p-5 flex flex-col md:flex-row items-center gap-5 w-full">
          <img src={logoSrc} alt="Company Logo" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
          <div className="flex-1 text-center md:text-left">
            <p className="text-base md:text-lg">{testimonial}</p>
            <p className="mt-3 text-teal-500 font-semibold text-sm md:text-base">{author},</p>
            <p className="text-teal-500 text-sm md:text-base">{role}</p>
          </div>
        </div>

        {/* Arrows (Below on Mobile, Sides on Desktop) */}
        <div className="flex justify-center gap-4 mt-4 md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:right-0 md:mt-0 md:justify-between md:px-5">
          <button 
            onClick={handlePrev}
            className="text-black border border-black rounded-full p-2 hover:bg-gray-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button 
            onClick={handleNext}
            className="text-black border border-black rounded-full p-2 hover:bg-gray-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;