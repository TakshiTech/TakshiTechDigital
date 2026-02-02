// src/app/about/page.tsx

import { getSeoMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return getSeoMetadata('/about', {
    title: "Takshi Tech Digital | Experts in SEO, SMM & Web Design Services",
    description: "Overlook Takshi Tech Digital experts in responsive web design, social media marketing, and top tier search engine optimization services for your business growth.",
    keywords: ["responsive web design services", "social media marketing services", "best search engine optimisation services"],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://www.webdigitalbazaar.com/about", // Note: The helper will override this with correct domain if found
      siteName: "Takshi Tech Digital",
    },
  });
}

// 👇 Only importing the client component (no 'use client' here!)
import AboutClient from './AboutClient';

export default function AboutPage() {
  return <AboutClient />;
}
