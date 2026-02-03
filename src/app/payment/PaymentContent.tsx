
import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SocialSidebar from '@/components/SocialSidebar';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function PaymentContent() {
  const searchParams = useSearchParams();
  const planName = searchParams ? searchParams.get('plan') || '' : '';
  // This page is now largely unused as we redirect directly to PhonePe.
  // We keep it just in case, but it's empty as requested.

  return (
    <>
      <Navbar />
      <SocialSidebar />
      <Cursor />
      <Head>
        <title>Payment - Takshi Tech Digital</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 mt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Redirecting to Payment...</h2>
          <p className="mt-2 text-gray-600">Please wait while we process your request.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
