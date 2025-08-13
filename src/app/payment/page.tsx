// "use client";
// import Cursor from '@/components/Cursor';
// import Footer from '@/components/Footer';
// import Navbar from '@/components/Navbar';
// import SocialSidebar from '@/components/SocialSidebar';
// import { motion } from 'framer-motion';
// import Head from 'next/head';
// import { useSearchParams } from 'next/navigation';

// export default function Payment() {
//   const searchParams = useSearchParams();
//   const planName = searchParams.get('plan') || 'Unknown Plan';
//   const price = searchParams.get('price') || 'Unknown Price';

//   return (
//     <>
//       <Navbar />
//       <SocialSidebar />
//       <Cursor />
//       <Head>
//         <title>Payment - Web Digital Bazaar</title>
//         <meta name="description" content="Make a payment to Web Digital Bazaar using our account details or scan the QR code." />
//         <script src="https://cdn.tailwindcss.com"></script>
//       </Head>
//       <div className="min-h-screen bg-gray-50 py-12 mt-20">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <div className="text-center">
//             <motion.h2
//               className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               Payment Details
//             </motion.h2>
//             <motion.p
//               className="mt-4 text-lg text-gray-600"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               Make your payment for the selected plan using the details below or scan the QR code.
//             </motion.p>
//           </div>

//           {/* Selected Plan Details */}
//           <motion.div
//             className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <h3 className="text-xl font-semibold text-gray-800">
//               You have chosen the {planName} plan
//             </h3>
//             <p className="mt-2 text-gray-600">
//               Total Amount: <span className="font-bold">{price}</span>
//             </p>
//           </motion.div>

//           {/* Payment Information */}
//           <motion.div
//             className="mt-8 bg-white rounded-lg shadow-lg p-8 border border-gray-200"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <h3 className="text-2xl font-bold text-gray-800 mb-6">Account Details</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {/* Bank Details */}
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-700">Bank Transfer</h4>
//                 <ul className="mt-4 space-y-2 text-gray-600">
//                   <li>
//                     <span className="font-medium">Bank Name:</span> [Your Bank Name]
//                   </li>
//                   <li>
//                     <span className="font-medium">Account Holder:</span> Web Digital Bazaar
//                   </li>
//                   <li>
//                     <span className="font-medium">Account Number:</span> [Your Account Number]
//                   </li>
//                   <li>
//                     <span className="font-medium">IFSC Code:</span> [Your IFSC Code]
//                   </li>
//                   <li>
//                     <span className="font-medium">Branch:</span> [Your Branch Name]
//                   </li>
//                 </ul>
//               </div>

//               {/* UPI Details */}
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-700">UPI Payment</h4>
//                 <ul className="mt-4 space-y-2 text-gray-600">
//                   <li>
//                     <span className="font-medium">UPI ID:</span> [Your UPI ID]
//                   </li>
//                   <li>
//                     <span className="font-medium">Supported Apps:</span> Google Pay, PhonePe, Paytm
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* QR Code Placeholder */}
//             <div className="mt-8 text-center">
//               <h4 className="text-lg font-semibold text-gray-700 mb-4">Scan to Pay</h4>
//               <div className="flex justify-center">
//                 <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
//                   <span className="text-gray-500">[QR Code Placeholder]</span>
//                 </div>
//               </div>
//               <p className="mt-4 text-gray-600">
//                 Scan the QR code with any UPI app to make a payment to Web Digital Bazaar.
//               </p>
//             </div>

//             {/* Instructions */}
//             <div className="mt-8">
//               <h4 className="text-lg font-semibold text-gray-700">Payment Instructions</h4>
//               <p className="mt-2 text-gray-600">
//                 Please include your order ID or plan name ({planName}) in the payment remarks. After making the payment, contact us at{' '}
//                 <a href="mailto:support@takshitechdigital.com" className="text-blue-500 hover:underline">
//                   support@takshitechdigital.com
//                 </a>{' '}
//                 with the transaction details for confirmation.
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
'use client';

import { Suspense } from 'react';
import PaymentContent from './PaymentContent';


export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading Payment Page...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
