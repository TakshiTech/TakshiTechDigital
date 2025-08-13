// 'use client';
// import React, { useState } from 'react';
// import { AnimatePresence, motion } from 'motion/react';
// import { Plus } from 'lucide-react';
// import ScrollFloat from '@/ui/ScrollFloat';
// const tabs = [
//   {
//     title: '1. What is Web Digital Bazaar?',
//     description:
//       'Web Digital Bazaar is a full-service digital marketing agency offering SEO, social media marketing, website design & development, and paid advertising services to help businesses grow online.',
//     imageUrl:
//       'https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format',
//   },
//   // {
//   //   title: '2. Who can benefit from your digital marketing services?',
//   //   description:
//   //     'Our services are ideal for startups, small businesses, e-commerce brands, and established companies looking to boost their online presence and conversions.',
//   //   imageUrl:
//   //     'https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format',
//   // },
//   // {
//   //   title: '3. What is SEO and why is it important for my business?',
//   //   description:
//   //     ' SEO (Search Engine Optimization) is the process of improving your website’s visibility on search engines like Google. It helps drive organic traffic, generate leads, and build brand credibility.',
//   //   imageUrl:
//   //     'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format',
//   // },
//   {
//     title: '2. How long does SEO take to show results?',
//     description:
//       ' SEO is a long-term strategy. Most clients begin seeing noticeable improvements in 3 to 6 months, depending on the competition and current website status.',
//     imageUrl:
//       'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format',
//   },
//   // {
//   //   title: '5. Which platforms do you manage for social media marketing?',
//   //   description:
//   //     'We manage Facebook, Instagram, LinkedIn, Twitter/X, and YouTube based on your business goals and target audience.',
//   //   imageUrl:
//   //     'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format',
//   // },
//   // {
//   //   title: '6. What’s the difference between organic and paid social media marketing?',
//   //   description:
//   //     'Organic marketing focuses on unpaid content to engage and grow your audience. Paid marketing involves running sponsored ads to reach a broader or targeted audience quickly.',
//   //   imageUrl:
//   //     'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format',
//   // },
//   {
//     title: '3. What types of websites do you build?',
//     description:
//       'We design and develop custom websites, landing pages, e-commerce sites, and WordPress-based platforms customized to your business needs.',
//     imageUrl:
//       'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format',
//   },
//   // {
//   //   title: '8. Is the website mobile-friendly and SEO-optimized? ',
//   //   description:
//   //     'Absolutely. All our websites are fully responsive, mobile-friendly, and built with SEO best practices in mind.',
//   //   imageUrl:
//   //     'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format',
//   // },
//   // {
//   //   title: '9. What’s the difference between Meta Ads and Google Ads?',
//   //   description:
//   //     'Meta Ads target users based on interests and behavior on Facebook and Instagram, while Google Ads target users actively searching for specific keywords or services.',
//   //   imageUrl:
//   //     'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format',
//   // },
//   // {
//   //   title: '10. How much should I spend on ads?',
//   //   description:
//   //     'Ad budgets vary by industry and goals, but we’ll help you set a realistic budget to maximize ROI.',
//   //   imageUrl:
//   //     'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format',
//   // },
//   // {
//   //   title: '11. How do you measure the success of your campaigns?',
//   //   description:
//   //     'We track key metrics such as traffic, engagement, lead generation, conversions, and ROI, and provide transparent reports monthly.',
//   //   imageUrl:
//   //     'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format',
//   // },


// ];
// function index() {
//   const [activeIndex, setActiveIndex] = useState<number | null>(0);
//   const [activeItem, setActiveItem] = useState<
//     | {
//       title: string;
//       description: string;
//       imageUrl: string;
//     }
//     | undefined
//   >(tabs[0]);

//   const handleClick = async (index: number) => {
//     setActiveIndex(activeIndex === index ? null : index);
//     const newActiveItem = tabs.find((_, i) => i === index);
//     setActiveItem(newActiveItem);
//   };

//   return (
//     <>
//       <div className='container mx-auto pb-10 pt-2 pl-10 pr-10'>
//         <h1 className='uppercase text-center text-4xl font-bold pt-2 pb-4'>
//           <ScrollFloat
//         animationDuration={1}
//         ease='back.inOut(2)'
//         scrollStart='center bottom+=50%'
//         scrollEnd='bottom bottom-=40%'
//         stagger={0.03}
//       >
//         FAQ
//     </ScrollFloat>
//         </h1>
//         <div className='h-fit border  rounded-lg p-2 dark:bg-[#111111] bg-[#F2F2F2]'>
//           {tabs.map((tab, index) => (
//             <motion.div
//               key={index}
//               className={`overflow-hidden ${index !== tabs.length - 1 ? 'border-b' : ''
//                 }`}
//               onClick={() => handleClick(index)}
//             >
//               <button
//                 className={`p-3 px-2 w-full cursor-pointer sm:text-base text-xs items-center transition-all font-semibold dark:text-white text-black   flex gap-2 
//                `}
//               >
//                 <Plus
//                   className={`${activeIndex === index ? 'rotate-45' : 'rotate-0 '
//                     } transition-transform ease-in-out w-5 h-5  dark:text-gray-200 text-gray-600`}
//                 />
//                 {tab.title}
//               </button>
//               <AnimatePresence mode='sync'>
//                 {activeIndex === index && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: 'auto', opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{
//                       duration: 0.3,
//                       ease: 'easeInOut',
//                       delay: 0.14,
//                     }}
//                   >
//                     <p
//                       className={`dark:text-white text-black p-3 xl:text-base sm:text-sm text-xs pt-0 w-[90%]`}
//                     >
//                       {tab.description}
//                     </p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default index;

"use client";
import { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is Web Digital Bazaar?',
      answer: 'Web Digital Bazaar is a full-service digital marketing agency offering SEO, social media marketing, website design & development, and paid advertising services to help businesses grow online.'
    },
    {
      question: 'Who can benefit from your digital marketing services?',
      answer: 'Our services are ideal for startups, small businesses, e-commerce brands, and established companies looking to boost their online presence and conversions.'
    },
    {
      question: 'What is SEO and why is it important for my business?',
      answer: 'SEO (Search Engine Optimization) is the process of improving your website’s visibility on search engines like Google. It helps drive organic traffic, generate leads, and build brand credibility.'
    },
    {
      question: 'Which platforms do you manage for social media marketing?',
      answer: 'We manage Facebook, Instagram, LinkedIn, Twitter/X, and YouTube based on your business goals and target audience.'
    },
    {
      question: 'What types of websites do you build?',
      answer: 'We design and develop custom websites, landing pages, e-commerce sites, and WordPress-based platforms customized to your business needs.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <span className="text-gray-600">
                  {activeIndex === index ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;