import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SocialSidebar from '@/components/SocialSidebar';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function PaymentContent() {
  const searchParams = useSearchParams();
  const planName = searchParams ? searchParams.get('plan') || 'Unknown Plan' : 'Unknown Plan';
  const price = searchParams ? searchParams.get('price') || 'Unknown Price' : 'Unknown Price';

  // State for popup and timer
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

  // Show popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000); // 10 seconds

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  // Timer countdown and auto-close
  useEffect(() => {
    if (showPopup && timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (showPopup && timeLeft === 0) {
      setShowPopup(false); // Auto-close popup when timer reaches zero
    }
  }, [showPopup, timeLeft]);

  // Format time (minutes:seconds)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <Navbar />
      <SocialSidebar />
      <Cursor />
      <Head>
        <title>Payment - Takshi Tech Digital</title>
        <meta
          name="description"
          content="Make a payment to Takshi Tech Digital using our account details or scan the QR code."
        />
      
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Payment Details
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Make your payment for the selected plan using the details below or scan the QR code.
            </motion.p>
          </div>

          {/* Selected Plan Details */}
          <motion.div
            className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-gray-800">
              You have chosen the {planName} plan
            </h3>
            <p className="mt-2 text-gray-600">
              Total Amount: <span className="font-bold">{price}</span>
            </p>
          </motion.div>

          {/* Payment Information */}
          <motion.div
            className="mt-8 bg-white rounded-lg shadow-lg p-8 border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Account Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-700">Bank Transfer</h4>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li><span className="font-medium">Bank Name:</span> State Bank Of India</li>
                  <li><span className="font-medium">Account Holder:</span> Pushpendra Kumar  Shukla</li>
                  <li><span className="font-medium">Account Number:</span> 35149294810</li>
                  <li><span className="font-medium">IFSC Code:</span> SBIN0011330</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-700">UPI Payment</h4>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li><span className="font-medium">UPI ID:</span> 8851099103@ptaxis</li>
                  <li><span className="font-medium">Supported Apps:</span> Google Pay, PhonePe, Paytm</li>
                </ul>
              </div>
            </div>

            {/* QR Code on Page */}
            <div className="mt-8 text-center">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Scan to Pay</h4>
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <img src="/images/qrcode.png" alt="Payment QR Code" />
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                Scan the QR code with any UPI app to make a payment.
              </p>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-700">Payment Instructions</h4>
              <p className="mt-2 text-gray-600">
                Please include your order ID or plan name ({planName}) in the payment remarks. After making the payment, contact us at{' '}
                <a href="mailto:support@takshitechdigital.com" className="text-blue-500 hover:underline">
                  info@takshitechdigital.com
                </a>{' '}
                with the transaction details for confirmation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h3 className="text-xl font-bold text-gray-900">Special Offer!</h3>
            <p className="mt-2 text-gray-600">
              You can also get a free trial offer! Pay within{' '}
              <span className="font-semibold text-red-500">{formatTime(timeLeft)}</span> to claim it.
            </p>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Scan to Pay (Offer)</h4>
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <img src="/images/qrcode.png" alt="Offer QR Code" />
                </div>
              </div>
              <p className="mt-2 text-gray-600">
                Scan this QR code to pay and claim your free trial.
              </p>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-[#47C0C5] text-white rounded-lg hover:bg-[#84e7eae6] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
