"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

export default function PaymentFailure() {
    const [showPopup, setShowPopup] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

    // Show popup immediately or after a short delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Timer countdown
    useEffect(() => {
        if (showPopup && timeLeft > 0) {
            const countdown = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else if (showPopup && timeLeft === 0) {
            setShowPopup(false);
        }
    }, [showPopup, timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
            >
                <div className="flex justify-center mb-6">
                    <XCircle className="w-20 h-20 text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed / Cancelled</h1>
                <p className="text-gray-600 mb-8">
                    It looks like the payment was cancelled or failed. Please try again.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/active-plans" // Redirect to pricing page
                        className="block w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Try Again
                    </Link>
                    <Link
                        href="/contact"
                        className="block w-full bg-gray-100 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
                    >
                        Contact Support
                    </Link>
                </div>
            </motion.div>

            {/* Special Offer Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full text-center relative"
                    >
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-bold text-gray-900 text-[#5f259f]">Wait! Special Offer</h3>
                        <p className="mt-2 text-gray-600">
                            Don't miss out! Complete your payment within{' '}
                            <span className="font-bold text-red-500">{formatTime(timeLeft)}</span> to get a special bonus/discount.
                        </p>
                        <div className="mt-4 flex justify-center">
                            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                {/* Reusing the QR logic or just a placeholder image as per previous file */}
                                <img src="/images/qrcode.png" alt="Offer QR Code" className="max-w-full max-h-full" />
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            Scan to pay directly and claim the offer.
                        </p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-6 px-6 py-2 bg-[#5f259f] text-white rounded-lg hover:bg-[#4a1c7f] transition w-full"
                        >
                            Close & Pay Now
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
