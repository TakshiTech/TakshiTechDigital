
"use client";
import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Cursor from '@/components/Cursor';
import SocialSidebar from '@/components/SocialSidebar';
import ScrollContactForm from '@/components/ScrollContactForm';
gsap.registerPlugin(ScrollTrigger);

type Section = {
  title: string;
  description: string;
};

type ProcessStep = {
  title: string;
  description: string;
  icon: ReactNode;
};

type ToolLogo = {
  src: string;
  alt: string;
};

type OtherService = {
  title: string;
  description: string;
  bgColor: string;
  link: string;
};

export default function DesignClient() {
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    sectionRefs.current.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const topSections: Section[] = [
    {
      title: 'Custom Web Design',
      description: 'Responsive, user-friendly, and brand-aligned websites.We create custom-designed websites that reflect your brand identity and provide an intuitive experience across all devices. Our responsive layouts ensure your audience stays engaged, no matter where they’re browsing.',
    },
    {
      title: 'UI/UX Design',
      description: 'Modern interfaces focused on user behavior and engagement.Our design process follows industry-best UI/UX principles to ensure your website is both beautiful and functional. From wireframes to user journeys — we prioritize simplicity, clarity, and user satisfaction.',
    },
    {
      title: 'Web App Development',
      description: 'Scalable and high-performance web applications.We develop custom web apps using modern technologies like React, Next.js, and Node.js. Whether it’s an internal dashboard or customer-facing portal, we build secure, fast, and scalable platforms.',
    },
    {
      title: 'Maintenance & Support',
      description: 'Ongoing support to keep your website running smoothly.We offer continuous performance optimization, feature updates, security checks, and technical support to ensure your website stays updated, secure, and bug-free.',
    },
  ];

  const serveItems: string[] = [
    'UI Design',
    'UI Development',
    'UI Guidelines',
    'UX Design',
    'User Research',
    'UX Consultancy',
    'Animations',
    'Iconography',
    'Illustrations',
  ];

  const processSteps: ProcessStep[] = [
    {
      title: 'Empathise',
      description:
        'We begin by deeply understanding the user — their behaviors, goals, and frustrations. Using proven human-centered design techniques, we ensure every solution is mapped to real user needs.',
      icon: '🧠',
    },
    {
      title: 'Define ( the Problem)',
      description:
        'We define the core problem by mapping pain points, user flows, and technical gaps. This helps us create focused solutions that align with business objectives while improving usability.',
      icon: '⚙️',
    },
    {
      title: 'Ideation',
      description:
        'Our team brainstorms creative and effective solutions using structured ideation frameworks. We prioritize features and layouts that balance design aesthetics with real-world functionality.',
      icon: '🧩',
    },
    {
      title: 'Prototype',
      description:
        'We develop a results-focused prototype meant to build an authentic digital connection with the utmost level of detail and quality based on diversified experiments.',
      icon: '🖋️',
    },
  ];

  const toolLogos: ToolLogo[] = [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg',
      alt: 'Adobe XD',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
      alt: 'Photoshop',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg',
      alt: 'Illustrator',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Sketch_Logo.svg',
      alt: 'Sketch',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
      alt: 'Figma',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Invision-logo.svg/690px-Invision-logo.svg.png?20140815043005',
      alt: 'InVision',
    },
  ];

  const otherServices: OtherService[] = [
    {
      title: 'Technology.',
      description: 'Empowering Digital Solutions for a Connected WorldWe build robust, scalable, and modern digital platforms that support seamless user interaction and business automation. Whether it’s web applications, CMS integrations, or e-commerce systems — our tech stack ensures performance, security, and scalability.',
      bgColor: 'bg-indigo-100',
      link: '/services/technology',
    },
    {
      title: 'Marketing.',
      description: 'We help brands stand out with impactful marketing strategies tailored for growth. From content creation and SEO to social media and paid ads, we craft campaigns that build engagement and drive conversions.',
      bgColor: 'bg-purple-100',
      link: '/services/marketing',
    },
   
  ];

  return (
    <>
    <Navbar/>
    <Cursor/>
    <SocialSidebar/>
    <ScrollContactForm/>

    <div className="bg-gray-50 min-h-screen px-6 md:px-20 py-16 space-y-24">
      {/* Top: Design & Development Cards */}
      <section ref={addToRefs}>
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16 mt-10">
          Design & Development
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {topSections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-purple-600 mb-3">
                {section.title}
              </h2>
              <p className="text-gray-700">{section.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Do We Serve Section */}
      <section className="relative bg-white" ref={addToRefs}>
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-80 h-80 bg-pink-300 rounded-full opacity-30 -z-10"></div>
        </div>
        <p className="text-pink-600 font-semibold text-lg mb-3">What Do We Serve ?</p>
        <h2 className="text-3xl md:text-4xl font-extrabold max-w-4xl leading-snug text-black mb-12">
          We help you translate a simple idea into an exotic <br />
          Digital design transformation vision.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {serveItems.map((item, index) => (
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
        <p className="text-pink-600 font-semibold text-lg mb-3">HOW WE DO IT ?</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-16">
          Leaving no stone unturned at every step.
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