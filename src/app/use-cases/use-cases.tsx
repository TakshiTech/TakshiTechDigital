"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SocialSidebar from '@/components/SocialSidebar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

const UseCasesComponent = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <SocialSidebar />
      <section
        className="w-full h-[100vh] relative overflow-hidden flex items-center justify-center"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/usecase/usecase.webp')",
            filter: "blur(2px)",
            transform: "scale(1.1)",
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
            ...
          </p>
        </motion.div>
      </section>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Digital Marketing Use Cases that Deliver Results
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            We at Web Digital Bazaar think that digital marketing is a
            strategy-driven approach to addressing actual business problems, not
            just social media posts or advertisements. Whether you want to build
            brand awareness, generate qualified leads, increase online sales, or
            grow your local presence, our digital marketing use cases demonstrate
            how results are achieved with the right tools, tactics, and creativity.
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
                <span className="text-black text-base underline">Use Case:</span>{" "}
                For startups or offline businesses going digital
                <br />
                <span className="text-black text-base underline">Solution:</span>{" "}
                Website development, SEO, social media branding
                <br />
                <span className="text-black text-base underline">Result:</span>{" "}
                Establishes brand credibility, improves discoverability, and sets a
                strong digital foundation
              </p>
            </div>

            {/* Use Case 2: Generating Leads Through Paid Campaigns */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Generating Leads Through Paid Campaigns
              </h3>
              <p className="text-gray-600">
                <span className="text-black text-base underline">Use Case:</span>{" "}
                For service providers, consultants, and local businesses
                <br />
                <span className="text-black text-base underline">Solution:</span>{" "}
                Meta Ads, Google Ads, landing pages with lead forms
                <br />
                <span className="text-black text-base underline">Result:</span>{" "}
                Targeted traffic that converts into high-quality leads and direct
                inquiries
              </p>
            </div>

            {/* Use Case 3: Boosting Sales for Product-Based Businesses */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Boosting Sales for Product-Based Businesses
              </h3>
              <p className="text-gray-600">
                <span className="text-black text-base underline">Use Case:</span>{" "}
                For eCommerce and product sellers
                <br />
                <span className="text-black text-base underline">Solution:</span>{" "}
                Conversion-optimized websites, Google Shopping Ads, Instagram
                marketing
                <br />
                <span className="text-black text-base underline">Result:</span>{" "}
                Increased product visibility, improved ROI, and consistent online
                orders
              </p>
            </div>

            {/* Use Case 4: Growing Local Visibility */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Growing Local Visibility
              </h3>
              <p className="text-gray-600">
                <span className="text-black text-base underline">Use Case:</span>{" "}
                For businesses serving specific cities or neighborhoods
                <br />
                <span className="text-black text-base underline">Solution:</span>{" "}
                Local SEO, Google Business Profile optimization, map pack ranking
                <br />
                <span className="text-black text-base underline">Result:</span>{" "}
                More local traffic, footfalls, and phone calls from nearby customers
              </p>
            </div>

            {/* Use Case 5: Productivity Automation */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Productivity Automation
              </h3>
              <p className="text-gray-600">
                <span className="text-black text-base underline">Use Case:</span>{" "}
                For startups or offline businesses going digital
                <br />
                <span className="text-black text-base underline">Solution:</span>{" "}
                Website development, SEO, social media branding
                <br />
                <span className="text-black text-base underline">Result:</span>{" "}
                Establishes brand credibility, improves discoverability, and sets a
                strong digital foundation
              </p>
            </div>

            {/* Use Case 6: Creating Brand Awareness and Engagement */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Creating Brand Awareness and Engagement
              </h3>
              <p className="text-gray-600">
                <span className="text-black text-base underline">Use Case:</span>{" "}
                For creators, artists, influencers, and new brands
                <br />
                <span className="text-black text-base underline">Solution:</span>{" "}
                Social media content strategies, reels, influencer collaborations
                <br />
                <span className="text-black text-base underline">Result:</span>{" "}
                Builds recognition, grows followers, and fosters long-term
                engagement
              </p>
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
            Whether you're just starting out or scaling up, your business can
            benefit from proven digital marketing use cases tailored to your goals.
            At Web Digital Bazaar, we combine strategy, design, and performance to
            deliver meaningful results.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UseCasesComponent;