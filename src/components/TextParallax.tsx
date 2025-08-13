"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RippleButton from "./animata/button/ripple_button";

export const TextParallaxContentExample = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Digital Marketing Services."
        heading="Marketing"
      >
        <MarketingContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1648737966636-2fc3a5fffc8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Web Development Solutions."
        heading="Technology "
      >
        <TechnologyContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1602576666092-bf6447a729fc?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Creative Branding & UI/UX Design."
        heading="Design"
      >
        <DesignContent />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

type TextParallaxContentProps = {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: React.ReactNode;
};

const TextParallaxContent = ({ imgUrl, subheading, heading, children }: TextParallaxContentProps) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

type OverlayCopyProps = {
  subheading: string;
  heading: string;
};

const OverlayCopy = ({ subheading, heading }: OverlayCopyProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>

    </motion.div>
  );
};

const MarketingContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
     Grow Your Audience with Strategic Digital Campaigns.
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        From building brand awareness to generating high-quality leads, our digital marketing services are designed to help your business grow. We specialize in:<br/>
        🔹Social Media Marketing (SMM)<br/>
        🔹Search Engine Optimization (SEO)<br/>
        🔹Google & Facebook Ads (PPC)<br/>
        🔹Content Strategy & Email Marketing
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
       We don’t just market — we create digital success stories.
      </p>
      <a
        href="/services/marketing"
        className="w-full rounded px-9 py-4 text-xl text-white transition-colors md:w-fit inline-flex items-center justify-center"
      >
        <RippleButton>
          Explore Marketing
        </RippleButton>
      </a>
    </div>
  </div>
);
const TechnologyContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
     Smart Web Solutions to Power Your Online Presence.
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        We provide cutting-edge web development solutions that ensure your website is fast, secure, mobile-friendly, and conversion-optimized. Our tech team delivers: <br/>
🔹Custom Website Development<br/>
🔹E-commerce Development<br/>
🔹CMS Integration (WordPress, Shopify, etc.)<br/>
🔹API Integrations & Maintenance<br/>
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
       Smart technology builds smarter businesses.
      </p>
      <a
        href="/services/technology"
        className="w-full rounded px-9 py-4 text-xl text-white transition-colors md:w-fit inline-flex items-center justify-center"
      >
        <RippleButton>
          Explore Technology
        </RippleButton>
      </a>
    </div>
  </div>
);
const DesignContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Creative Designs that Capture Attention and Build Brands.
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
       Your brand’s first impression starts with design. We offer visually stunning and user-centric branding & UI/UX design services that include:<br/>
🔹Logo Design & Visual Identity<br/>
🔹UI/UX Design for Websites & Apps<br/>
🔹Social Media Creatives<br/>
🔹Brand Guidelines<br/>
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
Design that doesn’t just look good — it performs.
      </p>
      <a
        href="/services/design"
        className="w-full rounded px-9 py-4 text-xl text-white transition-colors md:w-fit inline-flex items-center justify-center"
      >
        <RippleButton>
          Explore Design
        </RippleButton>
      </a>
    </div>
  </div>
);