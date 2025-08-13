

"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

const portfolioItems = [
  {
    id: 1,
    title: 'Avi Enterprises: Sustainable Engineering Solutions ',
    category: 'Website Design',
    image: '/images/portfolio/avi-enterprises.png',
    description: "Designed and developed a modern, responsive website for AVI Enterprises, a company specializing in sustainable water treatment and plant operation solutions. The site highlights the brand's service offerings—ranging from UF-RO-DM systems to EPC projects and 3D plant modeling—through a clean, user-friendly interface. Features include clear service segmentation, intuitive navigation, and optimized call-to-actions for lead generation.",
    tags: ['Website Design'],
  },
  {
    id: 2,
    title: 'E-Commerce Project: Tykoza – Multi-Category Online Shopping Platform',
    category: 'Marketing, SEO & Website Design',
    image: '/images/portfolio/portfolio9.png',
    description: 'WebDigital Bazaar designed and developed Tykoza, a visually engaging and user-friendly multi-category eCommerce website. Featuring a clean layout and intuitive navigation, Tykoza offers a wide range of products including furniture, fashion, electronics, and accessories, all under one roof.Built with a strong focus on UI/UX design, this platform includes features like featured/new product listings, promotional banners, product search, category-wise filters, secure login, and cart functionalities. Tykoza is fully responsive, SEO-optimized, and performance-tuned to deliver a smooth online shopping experience across all devices.This project highlights our proficiency in creating modern, scalable eCommerce solutions that drive sales and enhance customer retention.'
,
    tags: ['Marketing', 'SEO', 'Website Design'],
  },
  {
    id: 3,
    title: 'Easy Fly Scan – UK-Based Travel & Booking Platform',
    category: 'Website Design & SEO',
    image: '/images/portfolio/portfolio8.png',
    description: "WebDigital Bazaar successfully launched Easy Fly Scan – an international travel website crafted for users across the United Kingdom. This intuitive platform allows users to seamlessly book hotels, hire cabs, and plan travel experiences across major UK destinations. With a sleek, mobile-responsive design and user-friendly interface, Easy Fly Scan enhances the travel booking process through automation, clarity, and convenience.Our development focused on integrating reliable booking functionalities, interactive maps, real-time availability, and secure payment systems. Designed with performance and SEO in mind, this project highlights our capability in building global-standard travel solutions that cater to both local and international audiences.",
    tags: ['SEO', 'Website Design'],
  },
  {
    id: 4,
    title: 'E-Commerce Project: Hiparo – Men’s Fashion Store',
    category: 'Website Design & Marketing',
    image: '/images/portfolio/portfolio6.png',
    description: "WebDigital Bazaar developed Hiparo, a modern men’s fashion e-commerce store powered by WordPress and WooCommerce. This stylish and responsive website offers a seamless shopping experience with a focus on premium design, smooth navigation, and mobile-first performance.Hiparo showcases a wide range of men’s clothing and accessories, complete with product filters, secure checkout, and integrated payment gateways. Built with SEO best practices, fast loading speeds, and user engagement in mind, this project highlights our expertise in creating scalable and conversion-driven online stores tailored for the fashion industry.",
    tags: ['Website Design' ,'Marketing'],
  },

  {
    
    id: 5,
    title: ' ShopNeck – Complete Online Clothing Store',
    category: 'Marketing, SEO & Website Design',
    image: '/images/portfolio/portfolio4.png',
    description: "WebDigital Bazaar proudly built ShopNeck, a full-featured eCommerce clothing store designed to deliver a premium online shopping experience. Developed with modern web technologies and eCommerce frameworks, ShopNeck offers a wide range of apparel for all age groups and styles, combining aesthetic design with functional performance.The website includes advanced features like smart product filtering, responsive layouts, secure checkout, inventory management, and seamless payment integration. Optimized for search engines and mobile devices, ShopNeck is a showcase of our ability to develop robust, scalable, and conversion-focused fashion retail platforms.",
    tags: ['Website Design' , ' SEO', 'Marketing'],
  },
  {
    id: 6,
    title: 'Nikamma Global Solutions – Academic Support Platform ',
    category: 'Marketing & Website Design',
    image: '/images/portfolio/portfolio7.png',
    description: "WebDigital Bazaar proudly developed Nikamma Global Solutions – a dynamic and user-centric educational website designed to assist students with assignment solutions, project help, and academic guidance. Built with modern web technologies, this platform offers intuitive navigation, responsive design, and SEO-optimized content tailored for academic success.Our team focused on delivering a clean, professional layout with high performance, ensuring fast load times and mobile compatibility. This project reflects our expertise in creating niche-specific digital platforms that enhance user engagement and deliver measurable results.",
    tags: ['Website Design', 'Marketing'],
  },
];


const PortfolioClient: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filters = [
    'All',
    'Marketing',
    'SEO',
    'Website Design',
  ];

  const filteredItems = filter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.tags.includes(filter));

  return (
    <>
    <Navbar/>
    <SocialSidebar/>
    <div className="bg-gray-100 min-h-screen">

     <section
              className="w-full h-[100vh] relative overflow-hidden flex items-center justify-center"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/background4.webp')",
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
                  PORTFOLIO
                </h1>
                <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-600">
                   VIew Our Work
                </p>
              </motion.div>
      </section>


      {/* Hero Section with Filter Buttons */}
      <section className="bg-white py-12 mt-20 ">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Portfolio</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-full border transition ${
                  filter === filterOption
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section - Full Width Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col md:flex-row w-full"
              >
                {/* Image on the Left */}
                <div className="md:w-1/3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-48 md:h-full object-contain"
                  />
                </div>
                {/* Content on the Right */}
                <div className="md:w-2/3 p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#00FF99] to-[#00BFFF] text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-6">
            Let’s create something extraordinary together. Contact us to discuss your next project.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default PortfolioClient;