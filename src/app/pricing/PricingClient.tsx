"use client";
import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SocialSidebar from '@/components/SocialSidebar';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Search Engine Optimization Pricing Plans
const seoPlans = [

  {
    name: 'Starter',
    price: '₹8,000',
    period: '/month',
    description: 'Perfect for startups and small businesses',
    features: [
      '5 Keywords',
      '150 Backlinks',
      'Weekly Reports',
      'Audits & Keyword Research (Free)',
      'Backlink Creation',
      '3 Months Delivery',
      'Quarterly: 8% Off, Half Yearly: 12% Off',
    ],
    cta: 'Choose Starter',
  },
  {
    name: 'Basic',
    price: '₹12,000',
    period: '/month',
    description: 'Ideal for growing businesses',
    features: [
      '10 Keywords',
      '200 Backlinks',
      'Weekly Reports',
      'Audits & Keyword Research (Free)',

      'Backlink Creation',
      '3 Months Delivery',
      'Quarterly: 8% Off, Half Yearly: 12% Off',
    ],
    cta: 'Choose Basic',
    highlighted: true,
  },
  {
    name: 'Deluxe',
    price: '₹15,000',
    period: '/month',
    description: 'For businesses seeking advanced SEO',
    features: [
      '15 Keywords',
      '250 Backlinks',
      'Weekly Reports',
      'Audits & Keyword Research (Free)',

      'Title Description + Backlink Creation',
      'On Page SEO',
      '3 Months Delivery',
      'Quarterly: 8% Off, Half Yearly: 12% Off',
    ],
    cta: 'Choose Deluxe',
  },
  {
    name: 'Ultimate',
    price: '₹18,000',
    period: '/month',
    description: 'For large businesses with custom needs',
    features: [
      '30 Keywords',
      '500 Backlinks',
      'Weekly Reports',
      'Audits & Keyword Research (Free)',

      'Title Description + Backlink Creation',
      'On Page SEO',
      '3 Months Delivery',
      'Quarterly: 8% Off, Half Yearly: 12% Off',
    ],
    cta: 'Choose Ultimate',
  },
];

// Social Media Marketing Pricing Plans
const socialMediaPlans = [
  {
    name: 'Starter',
    price: '₹8,000',
    period: '/month',
    description: 'Perfect for startups and small businesses',
    features: [
      'Facebook Page & Instagram',
      '8 Posts, 5 Stories',
      'Weekly Reports',
      'Page Optimization + Reach + Promotion',
      'Marketing Strategy',
      '3 Months Delivery',
      'Quarterly: 8% Off, Half Yearly: 12% Off',
    ],
    cta: 'Choose Starter',
  },
  {
    name: 'Basic',
    price: '₹12,000',
    period: '/month',
    description: 'Ideal for growing businesses',
    features: [
      'Facebook Page & Instagram',
      '12 Posts, 8 Stories, 2 Reels',
      'Weekly Reports',
      // 'Free Trial: 7 Days or 2 Samples',
      'Page Optimization + Reach + Promotion',
      'Marketing Strategy',
      '3 Months Delivery',
      'Quarterly: 8% Off, Half Yearly: 12% Off',
    ],
    cta: 'Choose Basic',
    highlighted: true,
  },
  {
    name: 'Deluxe',
    price: '₹15,000',
    period: '/month',
    description: 'For businesses seeking advanced SMM',
    features: [
      'Facebook Page & Instagram',
      '18 Posts, 5 Stories, 4 Reels',
      'Weekly Reports',

      'Page Optimization + Reach + Promotion',
      'Marketing Strategy',
      '3 Months Delivery',
      'Quarterly: 8% Off, Half Yearly: 12% Off',
    ],
    cta: 'Choose Deluxe',
  },
  {
    name: 'Ultimate',
    price: '₹18,000',
    period: '/month',
    description: 'For large businesses with custom needs',
    features: [
      'Facebook Page & Instagram',
      '25 Posts, 10 Stories, 6 Reels',
      'Weekly Reports',

      'Page Optimization + Reach + Promotion',
      'Marketing Strategy',
      '3 Months Delivery',
      'Quarterly: 8% Off, Half Yearly: 12% Off',
    ],
    cta: 'Choose Ultimate',
  },
];

// Web Development Pricing Plans
const webDevelopmentPlans = [
  {
    name: 'Wordpress',
    price: '₹10,000',
    period: '/year',
    description: 'Perfect for simple websites',
    features: [
      '5 Pages',
      'Basic On Page SEO',
      'Analytics Connection (Free)',

      'Domain Hosting + Web Development',
      '7-15 Days Delivery',
    ],
    cta: 'Choose Wordpress',
  },

  {
    name: 'React.js/Next.js',
    price: '₹53,000',
    period: '/year',
    description: 'Ideal for dynamic web applications',
    features: [
      '8 Pages',
      'Basic On Page SEO',
      'Analytics Connection (Free)',

      'Domain Hosting + Web Development',
      'Upto 2 Months Delivery',
    ],
    cta: 'Choose React.js/Next.js',
    highlighted: true,
  },

  {
    name: 'HTML/PHP',
    price: '₹30,000',
    period: '/year',
    description: 'For custom-coded websites',
    features: [
      '8 Pages',
      'Basic On Page SEO',
      'Analytics Connection (Free)',
      'Domain Hosting + Web Development',
      'Upto 2 Months Delivery',
    ],
    cta: 'Choose HTML/PHP',
  },

];
// Web Development Ecommerce Pricing Plans
const webDevelopmentPlansEcommerce = [
  {
    name: 'Wordpress',
    price: '₹15,000',
    period: '/year',
    description: 'Perfect for simple websites',
    features: [
      '5 Pages',
      'Basic On Page SEO',
      'Analytics Connection (Free)',
      'Domain Hosting + Web Development',
      '7-15 Days Delivery',
    ],
    cta: 'Choose Wordpress',
  },

  {
    name: 'React.js/Next.js',
    price: '₹70,000',
    period: '/year',
    description: 'Ideal for dynamic web applications',
    features: [
      '8 Pages',
      'Basic On Page SEO',
      'Analytics Connection (Free)',
      'Domain Hosting + Web Development',
      'Upto 2 Months Delivery',
    ],
    cta: 'Choose React.js/Next.js',
    highlighted: true,
  },

  {
    name: 'HTML/PHP (Magento)',
    price: '₹40,000',
    period: '/year',
    description: 'For custom-coded websites',
    features: [
      '8 Pages',
      'Basic On Page SEO',
      'Analytics Connection (Free)',
      'Domain Hosting + Web Development',
      'Upto 2 Months Delivery',
    ],
    cta: 'Choose HTML/PHP',
  },
  {
    name: 'Shopify',
    price: 'N/A',
    period: '/project',
    description: 'For e-commerce businesses',
    features: [
      '8 Pages',
      'Basic On Page SEO',
      'Analytics Connection (Free)',
      'Domain Hosting + Web Development',
      '15-20 Days Delivery',
    ],
    cta: 'Choose Shopify',
  },
];

// Paid Ads Pricing Plans
const paidAdsPlans = [

  {
    name: 'Google Ads',
    price: '₹7,000',
    period: '/month +18%GST',
    description: 'Drive traffic with Google Ads',
    features: [
      'Daily Lead Reports',
      'Free Page Creation',

      'Instant Delivery',
    ],
    cta: 'Choose Google Ads',
  },

  {
    name: 'Meta Ads',
    price: '₹6,000',
    period: '/month +18%GST',
    description: 'Boost engagement with Meta Ads',
    features: [
      'Daily Lead Reports',
      'Free Page Creation',
      'Graphics for Ads',
      'Instant Delivery',
    ],
    cta: 'Choose Meta Ads',
    highlighted: true,
  },
];

// Content + On Page SEO Pricing Plans
const contentSeoPlans = [
  {
    name: 'Basic',
    price: '₹5,000',
    period: '/month',
    description: 'For basic content needs',
    features: [
      'Content Writing: ₹1 per word',
      'On Page SEO: ₹250 per page',
      'Free Page Creation',
      'Instant Delivery',
    ],
    cta: 'Choose Basic',
  },
];

// Google Listing Pricing Plans
const googleListingPlans = [
  {
    name: 'With Website',
    price: '₹1,000',
    period: '/month',
    description: 'Enhance your Google presence',
    features: [
      'Free Page Creation',
      'Instant Delivery',
    ],
    cta: 'Choose Google Listing',
  },
];

// All in One (Digital Marketing) Pricing Plans
const allInOnePlans = [
  {
    name: 'Digital Marketing Starter',
    price: '₹24,000',
    period: '/month',
    description: 'Perfect for startups and small businesses',
    features: [
      '15 Keywords',
      '250 Backlinks',
      'On Page SEO',
      'Facebook Page & Instagram',
      '15 Graphics (Posts)',
      'Weekly Reports',
      'Audits & Keyword Research (Free)',

      '3 Months Delivery',
    ],
    cta: 'Choose Starter',
  },
  {
    name: 'Digital Marketing Advanced',
    price: '₹35,000',
    period: '/month',
    description: 'For large businesses with custom needs',
    features: [
      '20 Keywords',
      '500 Backlinks',
      'On Page SEO',
      'Facebook Page & Instagram',
      '20 Graphics (Posts)',
      'Weekly Reports',
      'Audits & Keyword Research (Free)',

      '3 Months Delivery',
    ],
    cta: 'Choose Advanced',
    highlighted: true,
  },
];

const PricingCard = ({ plan, index }: { plan: typeof seoPlans[0]; index: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const numericAmount = plan.price.replace(/[^0-9]/g, '');
      const response = await fetch('/api/phonepe/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: numericAmount,
          mobileNumber: "9999999999", // You can update this to ask user for input if needed
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Payment initiation failed", data);
        alert(`Payment Failed: ${data.error || "Unknown Error"}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error starting payment:", error);
      alert("Something went wrong. check console for details.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className={`relative p-6 bg-white rounded-lg shadow-lg border-2 ${plan.highlighted ? 'border-blue-500' : 'border-gray-200'} flex flex-col justify-between h-full`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    >
      {plan.highlighted && (
        <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          Most Popular
        </span>
      )}
      <div>
        <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
          <span className="text-gray-500">{plan.period}</span>
        </div>
        <p className="mt-2 text-gray-600">{plan.description}</p>
        <ul className="mt-4 space-y-2">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 text-blue-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <motion.button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`mt-6 block text-center px-4 py-2 rounded-lg font-semibold ${plan.highlighted ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {isLoading ? 'Processing...' : plan.cta}
      </motion.button>
    </motion.div>
  );
};

export default function PricingClient() {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <SocialSidebar />
      <Cursor />
      <Head>
        <title>Pricing - Takshi Tech Digital</title>
        <meta name="description" content="Explore our pricing plans for SEO, social media marketing, web development, paid ads, content, Google listing, and all-in-one digital marketing services." />
      </Head>

      <section
        className="w-full h-[100vh] relative overflow-hidden flex items-center justify-center"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/background5.webp')",
            filter: "blur(3px)",
            transform: "scale(1.1)", // prevents edges from showing when blurred
          }}
        ></div>

        {/* Overlay color for readability (optional) */}
        <div className="absolute inset-0 bg-white/50"></div>

        {/* Content */}
        <motion.div
          initial={{ y: "-150%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute text-center w-full"
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-black">
            PRICING
          </h1>
          <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-600">
            Digital Marketing Plans That Fit You
          </p>
        </motion.div>
      </section>

      <div className="min-h-auto bg-gray-50 py-12 mt-20">
        <p className='text-center mt-10 mb-10'>*All Prices are inclusive with GST</p>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Navigation */}
          <div className="text-center mb-12">
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => handleScrollToSection('seo')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
              >
                Search Engine Optimization
              </button>
              <button
                onClick={() => handleScrollToSection('social-media')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
              >
                Social Media Marketing
              </button>
              <button
                onClick={() => handleScrollToSection('web-development')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
              >
                Web Development
              </button>
              <button
                onClick={() => handleScrollToSection('paid-ads')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
              >
                Paid Ads
              </button>
              <button
                onClick={() => handleScrollToSection('content-seo')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
              >
                Content + On Page SEO
              </button>
              <button
                onClick={() => handleScrollToSection('google-listing')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
              >
                Google Listing
              </button>
              <button
                onClick={() => handleScrollToSection('all-in-one')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
              >
                All in One
              </button>
            </motion.div>
          </div>

          {/* Search Engine Optimization Section */}
          <div id="seo" className="text-center">
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Search Engine Optimization
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Boost your search rankings with our tailored SEO strategies
            </motion.p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
            {seoPlans.map((plan, index) => (
              <PricingCard key={`seo-${plan.name}`} plan={plan} index={index} />
            ))}
          </div>

          {/* Social Media Marketing Section */}
          <div id="social-media" className="text-center mt-20">
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Social Media Marketing
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Engage your audience with our social media expertise
            </motion.p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
            {socialMediaPlans.map((plan, index) => (
              <PricingCard key={`social-${plan.name}`} plan={plan} index={index} />
            ))}
          </div>

          {/* Web Development Section */}
          <div id="web-development" className="text-center mt-20">
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Web Development
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Build a stunning website with our expert development services
            </motion.p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {webDevelopmentPlans.map((plan, index) => (
              <PricingCard key={`web-${plan.name}`} plan={plan} index={index} />
            ))}
          </div>

          {/* Web Development E-Commerce Section */}
          <div id="web-development" className="text-center mt-20">
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Web Development E-Commerce
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Build a stunning website with our expert development services
            </motion.p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
            {webDevelopmentPlansEcommerce.map((plan, index) => (
              <PricingCard key={`web-${plan.name}`} plan={plan} index={index} />
            ))}
          </div>

          {/* Paid Ads Section */}
          <div id="paid-ads" className="text-center mt-20">
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Paid Ads
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Drive instant traffic with our targeted ad campaigns
            </motion.p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2 sm:grid-cols-2 grid-cols-1">
            {paidAdsPlans.map((plan, index) => (
              <PricingCard key={`ads-${plan.name}`} plan={plan} index={index} />
            ))}
          </div>

          {/* Content + On Page SEO Section */}
          <div id="content-seo" className="text-center mt-20">
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Content + On Page SEO
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Enhance your content and on-page SEO for better rankings
            </motion.p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-1 sm:grid-cols-1 grid-cols-1">
            {contentSeoPlans.map((plan, index) => (
              <PricingCard key={`content-${plan.name}`} plan={plan} index={index} />
            ))}
          </div>

          {/* Google Listing Section */}
          <div id="google-listing" className="text-center mt-20">
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Google Listing
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Boost your local presence with Google Listing
            </motion.p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-1 sm:grid-cols-1 grid-cols-1">
            {googleListingPlans.map((plan, index) => (
              <PricingCard key={`listing-${plan.name}`} plan={plan} index={index} />
            ))}
          </div>

          {/* All in One Section */}
          <div id="all-in-one" className="text-center mt-20">
            <motion.h2
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              All in One
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Comprehensive digital marketing solutions in one package
            </motion.p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2 sm:grid-cols-2 grid-cols-1">
            {allInOnePlans.map((plan, index) => (
              <PricingCard key={`allinone-${plan.name}`} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}