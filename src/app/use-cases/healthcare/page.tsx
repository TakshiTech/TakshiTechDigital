"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SocialSidebar from '@/components/SocialSidebar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

const UseCases: React.FC = () => {
  return (

    <div className="bg-gray-50 min-h-screen">
        <Navbar/>
        <SocialSidebar/>
         <section
              className="w-full h-[100vh] relative overflow-hidden flex items-center justify-center"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/usecase/healthcare.webp')",
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
                  USE CASES
                </h1>
                <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-600">
                   [Healthcare]
                   
                </p>
              </motion.div>
      </section>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
           Digital Marketing Use Cases for Healthcare
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
           At Web Digital Bazaar, we help healthcare providers connect with patients and build trust through digital strategies tailored for the medical industry. From boosting local visibility and managing online reputation to generating patient inquiries, our proven solutions empower hospitals, clinics, and wellness brands to grow sustainably and ethically in the digital age.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-12">
            Use Cases for Digital Marketing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Use Case 1: Building a Strong Online Presence */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Building a Strong Online Presence
              </h3>
              <p className="text-gray-600">
                Hospitals and clinics create modern websites and optimize for SEO to ensure patients easily find their services online, boosting credibility and trust.
              </p>
            </div>

            {/* Use Case 2: Growing Local Visibility */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Growing Local Visibility
              </h3>
               <p className="text-gray-600">
              Healthcare providers use local SEO and Google Business Profiles to appear in searches like “doctor near me,” driving more footfall and local patient calls.
              </p>
            </div>

            {/* Use Case 3: Generating Patient Leads Through Paid Campaigns */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Generating Patient Leads Through Paid Campaigns
              </h3>
               <p className="text-gray-600">
                Clinics and doctors run Google Ads and Meta Ads targeting patients searching for specific treatments, ensuring high-quality inquiries and appointment bookings.
              </p>
            </div>

            {/* Use Case 4: Managing Online Reputation */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Managing Online Reputation
              </h3>
               <p className="text-gray-600">
                Doctors and hospitals actively manage patient reviews and ratings on platforms like Google and Healthgrades, helping build trust and attract new patients.
              </p>
            </div>

            {/* Use Case 5: Educating Patients with Content Marketing */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Educating Patients with Content Marketing
              </h3>
              <p className="text-gray-600">
                Healthcare practices publish blogs, videos, and guides to answer patient questions, improving SEO and positioning themselves as trusted experts.
              </p>
            </div>

            {/* Use Case 6: Promoting Telehealth Services */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Promoting Telehealth Services
              </h3>
               <p className="text-gray-600">
               Hospitals and clinics market telehealth services through social media, SEO, and email campaigns to reach patients seeking convenient virtual care options.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* Video Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-8">
            See Healthcare in Action
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
             Watch how WebDigitaBazaar uses Healthcare to transform digital marketing
            strategies, from automated outreach to content creation and beyond.
          </p>
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/jzlvK44NRGA?si=Fi3BieYWtfjdpkx-" 
                  title="Healthcare in Digital Marketing"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>


       {/* What Makes WebDigitaBazaar Different Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12">
            What Makes WebDigitaBazaar Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ease of Use */}
            <div>
              <div className="text-4xl text-green-600 mb-4">👆</div>
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Ease of Use
              </h3>
              <p className="text-gray-600">
                You don’t need to be a tech expert to use our AI tools. We offer a
                user-friendly interface, detailed reports, and drag-and-drop
                editors that everyone can use.
              </p>
            </div>

            {/* Great Value */}
            <div>
              <div className="text-4xl text-green-600 mb-4">💎</div>
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Great Value
              </h3>
              <p className="text-gray-600">
                Our flexible pricing model is designed to allow any business to
                access high-end AI tools and support them as they grow. Pay by
                usage, not by number of contacts.
              </p>
            </div>

            {/* Superb Customer Support */}
            <div>
              <div className="text-4xl text-green-600 mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Superb Customer Support
              </h3>
              <p className="text-gray-600">
                Our unparalleled 24/7 customer care is provided in 6 languages,
                across web, social, and email. Phone support is available on
                WebDigitaBazaar Enterprise plans.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
           Let’s Build Your Digital Success Story
          </h2>
          <p className="text-lg mb-8 max-w-lg mx-auto">
           Whether you're just starting out or scaling up, your business can benefit from proven digital marketing use cases tailored to your goals. At Web Digital Bazaar, we combine strategy, design, and performance to deliver meaningful results.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
     <Footer/>
    </div>
  );
};


export default UseCases;