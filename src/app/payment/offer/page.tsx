"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { XCircle, Gift } from "lucide-react";

export default function PaymentOfferPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-red-100"
            >
                <motion.div
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6"
                >
                    <XCircle className="h-10 w-10 text-red-500" />
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Wait! Don't Miss Out
                </h2>
                <p className="text-gray-600 mb-8">
                    It looks like you canceled the payment. Is everything okay?
                </p>

                {/* The Offer Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 mb-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 -mt-2 -mr-2">
                        <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-bl-lg shadow-sm">
                            LIMITED TIME
                        </div>
                    </div>

                    <div className="flex items-center justify-center mb-3">
                        <Gift className="h-8 w-8 text-indigo-600 mr-2" />
                        <h3 className="text-lg font-bold text-indigo-900">Special Offer Unlocked!</h3>
                    </div>

                    <p className="text-indigo-700 text-sm mb-4">
                        Complete your purchase now and get premium priority support for free!
                    </p>

                    <Link href="/pricing">
                        <button className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-indigo-700 transition-colors transform hover:-translate-y-1">
                            Claim Offer & Retry Payment
                        </button>
                    </Link>
                </motion.div>

                <div className="text-sm text-gray-500">
                    <Link href="/pricing" className="hover:text-gray-800 underline">
                        No thanks, return to pricing
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
