
"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from '@/components/App';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Cursor from '@/components/Cursor';
import SocialSidebar from '@/components/SocialSidebar';
import ScrollContactForm from '@/components/ScrollContactForm';
gsap.registerPlugin(ScrollTrigger);

export default function TechnologyClient() {
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  sectionRefs.current = [];

  type ToolLogo = {
  src: string;
  alt: string;
};
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

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const smSections = [
    {
      title: 'Web Development',
      description: 'Responsive and high-performance websites tailored to your brand.We build SEO-friendly, fast-loading, and fully responsive websites using technologies like React, Next.js, and Node.js.',
    },
    {
      title: 'E-commerce Development ',
      description: 'Build powerful online stores that convert.We develop e-commerce platforms on Shopify, WooCommerce, or custom stacks to offer seamless shopping experiences. From product setup to secure payment gateways, we ensure a frictionless customer journey.',
    },
    {
      title: 'API Integration & Automation',
      description: 'Connect your systems and automate your workflows.We integrate third-party APIs like CRMs, payment gateways, and marketing tools to streamline business operations. Automate repetitive tasks, reduce manual work, and improve efficiency.',
    },
    {
      title: 'CMS Development',
      description: "Easily manage your content with custom CMS solutions.Whether it's WordPress, Headless CMS, or a custom solution — we build CMS platforms that give you full control over your content without technical complexity.",
    },
  ];

  const platforms = [
    'Web Development',
    'E-commerce Development',
    'API Integration',
    'CMS Solutions',
    'Hosting & Security',
    'Speed Optimization',
  ];

  const processSteps = [
    {
      title: 'Audit & Research',
      description: 'Understanding your current tech stack, site performance, and development goals.We begin by analyzing your business requirements, platform capabilities, and technical challenges to build a solid foundation.',
      icon: '🔍',
    },
    {
      title: 'Plan & Schedule',
      description: 'Mapping out project timelines, tools, and integration points.We create a clear roadmap including tech architecture, modules, APIs, and delivery milestones aligned with your business objectives.',
      icon: '📅',
    },
    {
      title: 'Execute & Deploy',
      description: 'Building and implementing robust, scalable solutions.From front-end interfaces to backend systems, we code, test, and deploy with efficiency — ensuring your platform is responsive, fast, and secure.',
      icon: '📲',
    },
    {
      title: 'Track & Optimize',
      description: 'Monitoring performance and refining for long-term success.Post-deployment, we continuously track server load, user behavior, and feature performance to fine-tune and enhance functionality.',
      icon: '📈',
    },
  ];

  const otherServices = [
    {
      title: 'Marketing.',
      description: 'Building your brand through smart and creative promotion.From social media campaigns and paid advertising to influencer marketing and content strategy, we help you grow visibility and drive conversions with tailored marketing solutions.',
      bgColor: 'bg-pink-100',
      link: '/services/marketing',
    },
    {
      title: 'Design',
      description: 'Crafting seamless digital experiences that reflect your brand.We create user-centric, responsive, and visually appealing designs — whether it’s for your website, app, or digital ads. Our designs are made to engage and convert..',
      bgColor: 'bg-indigo-100',
      link: '/services/design',
    },
  ];
   const toolLogos: ToolLogo[] = [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Wordpress.svg',
      alt: 'Wordpress',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/768px-React_Logo_SVG.svg.png?20231112063719',
      alt: 'React Js',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg',
      alt: 'Next Js',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
      alt: 'Node Js',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/640px-Amazon_Web_Services_Logo.svg.png',
      alt: 'Amazon Web Services',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Tailwind_CSS_logo.svg',
      alt: 'Tailwind CSS',
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
          Technology
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {smSections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-3">{section.title}</h2>
              <p className="text-gray-700">{section.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Platforms We Cover */}
      <section ref={addToRefs}>
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-80 h-80 bg-blue-200 rounded-full opacity-20 -z-10"></div>
        </div>
        <p className="text-blue-600 font-semibold text-lg mb-3">What Platforms We Cover?</p>
        <h2 className="text-3xl md:text-4xl font-extrabold max-w-4xl leading-snug text-black mb-12">
          Our technology services help brands build fast, secure, and scalable digital platforms.
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
        <p className="text-blue-600 font-semibold text-lg mb-3">HOW WE DO IT ?</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-16">
          Proven development strategy that delivers performance, security, and scalability.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {processSteps.map((step, index) => (
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
        <p className="text-pink-600 font-semibold text-lg mb-6">Tools We Use</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
          {toolLogos.map((tool, index) => (
            <div
              key={index}
              className="bg-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300"
            >
              <img src={tool.src} alt={tool.alt} className="w-20 h-20 object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* Other Services Section */}
       <section className="text-center" ref={addToRefs}>
              <p className="text-pink-600 font-semibold text-lg mb-6">Other Services</p>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
              {otherServices.map((service, index) => (
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
