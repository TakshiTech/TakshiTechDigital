"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';

const TermsClient: React.FC = () => {
  return (
    <>
    <Navbar/>
    <SocialSidebar/>
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
     <section className="bg-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms and Conditions</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
             Understand the rules and guidelines for using takshitechdigital’s services.
          </p>
        </div>
      </section>
      {/* Table of Contents */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Table of Contents</h2>
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <ul className="space-y-2 text-gray-700">
                <li>
                  <a href="#terms-conditions" className="hover:text-blue-600 transition">1. Terms & Conditions</a>
                </li>
                <li>
                  <a href="#cancellation-refund" className="hover:text-blue-600 transition">2. Cancellation & Refund Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Terms and Conditions Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 id="terms-conditions" className="text-4xl font-bold mb-4">Terms & Conditions</h2>
            <p className="text-gray-600 mb-4"><strong>Last updated on</strong> 03-06-2025 18:57:57</p>
            <p className="text-gray-600 mb-4">
              Due to nature of our business we don't have have a refund policy.
            </p>
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
          <p className="text-lg mb-6">
            <b>Email</b>: info@takshitechdigital.com
            </p>
            <p className="text-lg mb-6">
           <b>Phone</b>: +91 8851099103
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

export default TermsClient;