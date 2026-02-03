
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
            >
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-20 h-20 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your purchase. We have received your payment and will begin processing your order immediately.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="block w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Return to Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className="block w-full bg-gray-100 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
