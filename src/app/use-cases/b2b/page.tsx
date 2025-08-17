"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SocialSidebar from '@/components/SocialSidebar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

const b2b: React.FC = () => {
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
                  backgroundImage: "url('/images/usecase/b2b.webp')",
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
                   [B2B Businesses]
                </p>
              </motion.div>
      </section>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
           Digital Marketing Use Cases for B2B Businesses
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
           At Takshi Tech Digital, we help B2B businesses connect with the right clients and build strong industry relationships through smart digital marketing. Whether you’re offering services, products, or technology solutions, our strategies generate quality leads, nurture prospects, and position your brand as an industry leader. We turn complex B2B sales cycles into steady business growth.
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
            Use Cases for B2B Businesses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Use Case 1: Generating Qualified Leads Online */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Generating Qualified Leads Online
              </h3>
              <p className="text-gray-600">
                B2B companies use SEO, LinkedIn marketing, and content offers to attract decision-makers searching for specific services or solutions.
              </p>
            </div>

            {/* Use Case 2: Nurturing Prospects with Email Marketing */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Nurturing Prospects with Email Marketing
              </h3>
              <p className="text-gray-600">
                Businesses send targeted email campaigns with valuable insights and offers to move prospects through long B2B sales cycles.
              </p>
            </div>

            {/* Use Case 3: Building Industry Authority through Content */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Building Industry Authority through Content
              </h3>
              <p className="text-gray-600">
                Companies publish blogs, whitepapers, and case studies to demonstrate expertise and build trust with potential clients.
              </p>
            </div>

            {/* Use Case 4: Running Targeted Ads for Niche Audiences */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Running Targeted Ads for Niche Audiences
              </h3>
              <p className="text-gray-600">
                B2B businesses leverage LinkedIn Ads, Google Ads, and programmatic campaigns to reach precise audiences based on industry, role, and interests.
              </p>
            </div>

            {/* Use Case 5: Showcasing Products and Services Online*/}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
               Showcasing Products and Services Online
              </h3>
              <p className="text-gray-600">
                Businesses develop professional websites highlighting services, case studies, and solutions to impress potential clients and partners.
              </p>
            </div>

            {/* Use Case 6: Managing Online Reputation and Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Managing Online Reputation and Reviews
              </h3>
              <p className="text-gray-600">
                B2B firms actively manage testimonials and online mentions to maintain credibility and influence purchasing decisions among corporate buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

       {/* Video Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-8">
            See B2B in Action
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Watch how WebDigitaBazaar uses B2B to transform digital marketing
            strategies, from automated outreach to content creation and beyond.
          </p>
         <div className="flex justify-center">
  <div className="w-full max-w-4xl">
    <div className="relative" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        src="https://www.youtube.com/embed/EfUXyuAtayw"
        title="Case Studies - B2B"
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
            Ready to Revolutionize Your Marketing?
          </h2>
          <p className="text-lg mb-8 max-w-lg mx-auto">
            Partner with WebDigitaBazaar to integrate AI into your operations and
            achieve unparalleled efficiency and results.
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

export default b2b;