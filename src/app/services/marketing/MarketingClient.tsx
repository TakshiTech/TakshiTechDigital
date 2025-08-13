
"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Cursor from '@/components/Cursor';
import SocialSidebar from '@/components/SocialSidebar';
import Link from 'next/link';
import ScrollContactForm from '@/components/ScrollContactForm';
gsap.registerPlugin(ScrollTrigger);

type MarketingSection = {
  title: string;
  description: string;
};

type MarketingTool = {
  name: string;
  imgSrc: string;
};

type MarketingProcessStep = {
  title: string;
  description: string;
  icon: string;
};

type OtherMarketingService = {
  title: string;
  description: string;
  bgColor: string;
  link: string;
};

export default function MarketingClient() {
  const sectionRefs = useRef<HTMLElement[]>([]);
  sectionRefs.current = [];

  useEffect(() => {
    sectionRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 100 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
          immediateRender: false,
          stagger: 0.2,
        }
      );
    });
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const marketingSections: MarketingSection[] = [
    {
      title: 'SEO Optimization',
      description:
        "Rank higher on Google and drive consistent organic traffic. We implement smart on-page and off-page SEO strategies to boost your visibility, improve keyword rankings, and bring in traffic that converts.Optimizing your website for search engines to rank higher and drive organic traffic to your business.",
    },
    {
      title: 'Paid Advertising',
      description:
        'Grow your brand presence where your audience spends time.We craft engaging content, schedule posts, run campaigns, and analyze insights across platforms like Facebook, Instagram, LinkedIn, and Twitter to boost visibility and engagement.',
    },
    {
      title: 'Social Media Marketing',
      description:
        'Convert leads into loyal customers with personalized email campaigns.From welcome series to product promotions, we create automated and targeted email flows that keep your audience engaged and drive repeat business.',
    },
    {
      title: 'Email Marketing',
      description:
        'Convert leads into loyal customers with personalized email campaigns. From welcome series to product promotions, we create automated and targeted email flows that keep your audience engaged and drive repeat business.',
    },
  ];

  const platforms: string[] = [
    'Google Ads',
    'Facebook Ads',
    'Instagram Ads',
    'LinkedIn Ads',
    'Twitter Ads',
    'Pinterest Ads',
  ];

  const marketingTools: MarketingTool[] = [
    {
      name: 'Facebook',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    },
    {
      name: 'Twitter',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Twitter_X.png/640px-Twitter_X.png',
    },
    {
      name: 'Instagram',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg',
    },
    {
      name: 'Google Ads',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Google_Ads_icon.svg/640px-Google_Ads_icon.svg.png',
    },
    {
      name: 'LinkedIn',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Linked-in-alt.svg/768px-Linked-in-alt.svg.png?20230821072523',
    },
    {
      name: 'Mailchimp',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/MailChimp.svg/1200px-MailChimp.svg.png?20161224033617',
    },
  ];

  const marketingProcessSteps: MarketingProcessStep[] = [
    {
      title: 'Market Research',
      description:
        'We start by deeply understanding your target audience, industry trends, and competitors — laying a strong foundation for data-driven marketing decisions.',
      icon: '🔍',
    },
    {
      title: 'Strategy Development',
      description:
        'Our experts craft customized marketing strategies that align with your business objectives, ensuring maximum impact across the right channels.',
      icon: '📅',
    },
    {
      title: 'Execution',
      description:
        'We launch your campaigns with precision — using creative content, ad management, and audience targeting to reach the right people at the right time.',
      icon: '🚀',
    },
    {
      title: 'Performance Tracking',
      description:
        'We continuously monitor, analyze, and optimize campaign performance to improve ROI, increase conversions, and scale your results.',
      icon: '📈',
    },
  ];

  const otherMarketingServices: OtherMarketingService[] = [
    {
      title: 'Design',
      description:
        'We design visually appealing and fully responsive websites that reflect your brand identity and provide an exceptional user experience. Whether it’s a landing page, portfolio, or e-commerce interface — our design process focuses on conversion, aesthetics, and usability.',
      bgColor: 'bg-indigo-100',
      link: '/services/design',
    },
    {
      title: 'Technology',
      description: 'Our tech team builds high-performing websites and digital platforms using modern frameworks and best practices. From robust backends to seamless frontends, we create scalable solutions for startups and enterprises alike.',
      bgColor: 'bg-pink-100',
      link: '/services/technology',
    },
  ];

  return (
    <>
     <Navbar/>
    <Cursor/>
    <SocialSidebar/>
    <ScrollContactForm/>
    <div className="bg-gray-50 min-h-screen px-6 md:px-20 py-16 space-y-24">
      {/* Hero Section */}
      <section ref={addToRefs}>
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16 mt-10">
          Digital Marketing Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {marketingSections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-green-600 mb-3">{section.title}</h2>
              <p className="text-gray-700">{section.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Platforms We Work With */}
      <section ref={addToRefs}>
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-80 h-80 bg-green-200 rounded-full opacity-20 -z-10"></div>
        </div>
        <p className="text-green-600 font-semibold text-lg mb-3">What Platforms We Work With?</p>
        <h2 className="text-3xl md:text-4xl font-extrabold max-w-4xl leading-snug text-black mb-12">
          We help your brand grow through strategic advertising across top digital platforms.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {platforms.map((item, index) => (
            <div key={index}>
              <p className="font-bold text-lg text-black border-b border-dotted border-gray-400 inline-block pb-1">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How We Do It Section */}
      <section className="text-center" ref={addToRefs}>
        <p className="text-green-600 font-semibold text-lg mb-3">HOW WE DO IT ?</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-16">
          Strategic marketing that converts potential into profit.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {marketingProcessSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-start gap-4">
              <div className="text-5xl">{step.icon}</div>
              <h3 className="text-2xl font-bold text-black">{step.title}</h3>
              <p className="text-gray-700 max-w-md">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools We Use Section */}
      <section className="text-center" ref={addToRefs}>
        <p className="text-green-600 font-semibold text-lg mb-6">Tools We Use</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
          {marketingTools.map((tool, index) => (
            <div
              key={index}
              className="bg-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300"
            >
              <img
                src={tool.imgSrc}
                alt={tool.name}
                className="w-20 h-20 object-contain mx-auto"
              />
              <p className="text-xl font-semibold text-gray-800">{tool.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other Services Section */}
       <section className="text-center" ref={addToRefs}>
        <p className="text-pink-600 font-semibold text-lg mb-6">Other Services</p>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {otherMarketingServices.map((service, index) => (
          <Link href={service.link} key={index} className="block w-full">
            <div
          className={`p-12 rounded-2xl flex flex-col items-start justify-between h-full ${service.bgColor} hover:shadow-lg transition duration-300 min-h-[260px]`}
            >
          <h3 className="text-3xl font-extrabold text-black mb-3">{service.title}</h3>
          <p className="text-gray-800 mb-6">{service.description}</p>
          <span className="text-2xl">→</span>
            </div>
          </Link>
        ))}
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}
