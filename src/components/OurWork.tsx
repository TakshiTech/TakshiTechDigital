'use client';

import React from 'react';
import { Carousel, Card } from '../ui/apple-cards-carousel';

const OurWork = () => {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        OUR WORK.
      </h2>
      <Carousel items={cards} />
    </div>
  );
};

export default OurWork;

const Content1 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => (
        <div
          key={'dummy-content' + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          To Boost organic traffic, improve your website's exposure, and guarantee top positions on search engines like Google, we employ tried-and-true SEO techniques that will generate high-quality leads for your company.
          </p>
          <img
            src="https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg"
            alt="Seo Services by Web Digital Bazaar"
            height="500"
            width="500"
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          />
        </div>
      ))}
    </>
  );
};
const Content2 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => (
        <div
          key={'dummy-content' + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          To engage with your audience and increase conversions, we establish your brand's presence on social media sites like Facebook, Instagram, and LinkedIn through everything from content production to ad management.
          </p>
          <img
            src="https://images.pexels.com/photos/15406294/pexels-photo-15406294.jpeg"
            alt="Social Media Marketing by Web Digital Bazaar"
            height="500"
            width="500"
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          />
        </div>
      ))}
    </>
  );
};
const Content3 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => (
        <div
          key={'dummy-content' + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
         For the purpose of improving engagement and guaranteeing smooth experiences on both online and mobile platforms, our design team develops interfaces that are clear, responsive, and easy to use.
          </p>
          <img
            src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg"
            alt="UI UX Design Service by Web Digital Bazaar"
            height="500"
            width="500"
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          />
        </div>
      ))}
    </>
  );
};
const Content4 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => (
        <div
          key={'dummy-content' + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        Using the newest technology, we create scalable, secure, and quick websites that are optimized for user experience across all platforms and match your business objectives.
          </p>
          <img
            src="https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg"
            alt="Web Development Service by Web Digital Bazaar"
            height="500"
            width="500"
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          />
        </div>
      ))}
    </>
  );
};
const Content5 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => (
        <div
          key={'dummy-content' + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        To make certain that every ad dollar yields quantifiable results, our PPC specialists design and oversee high-converting ad campaigns on Google, Facebook, and other networks.
          </p>
          <img
            src="https://media.istockphoto.com/id/872078638/photo/pay-per-click-concept.jpg?b=1&s=612x612&w=0&k=20&c=rylTWOjibxJCU-lFAxvn9BVZSOdHp6J9ezFQuOUmogE="
            alt="Paid Ads Management Service by Web Digital Bazaar"
            height="500"
            width="500"
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          />
        </div>
      ))}
    </>
  );
};
const Content6 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => (
        <div
          key={'dummy-content' + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
         We provide innovative technological solutions to improve productivity, streamline processes, and foster corporate expansion, including automation, cloud services, and AI tools.
          </p>
          <img
            src="https://assets.aceternity.com/macbook.png"
            alt="Macbook mockup from Aceternity UI"
            height="500"
            width="500"
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          />
        </div>
      ))}
    </>
  );
};
const data = [
  {
    category: 'SEO OPTIMIZATION',
    title: 'Implement SEO Best Practices to Increase Website Traffic.',
    src: '/images/ourwork/ourwork1.webp',
    alt:'SEO Services by Web Digital Bazaar',
    content: <Content1 />,
  },
  {
    category: 'SOCIAL MEDIA MARKETING',
    title: 'Engage and Grow with Social Media Campaigns.',
    src: '/images/ourwork/ourwork2.webp',
    alt:'Social Media Marketing by Web Digital Bazaar',
    content: <Content2 />,
  },
  {
    category: 'UI/UX DESIGN',
    title: 'Developing Modern and Intuitive User Experiences.',
    src: '/images/ourwork/ourwork3.webp',
    alt:'UX/UI Design Service by Web Digital Bazaar',
    content: <Content3 />,
  },
  {
    category: 'WEB DEVELOPMENT',
    title: 'Personalized Websites Designed for Performance and Speed.',
    src: '/images/ourwork/ourwork4.webp',
    alt:'Web Development Service by Web Digital Bazaar',
    content: <Content4 />,
  },
  {
    category: 'PAID ADS MANAGEMENT',
    title: 'Utilize Targeted Paid Advertising Campaigns to Increase ROI.',
    src: '/images/ourwork/ourwork5.webp',
    alt:'Paid Ads Management Service by Web Digital Bazaar',
    content: <Content5 />,
  },
  {
    category: 'TECH SOLUTIONS',
    title: 'Ready for the Future Technology to Boost Business Intelligence.',
    src: '/images/ourwork/ourwork6.webp',
    alt:'Technology Service & Solution by Web Digital Bazaar',
    content: <Content6 />,
  },
];
