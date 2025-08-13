// src/app/about/page.tsx

export const metadata = {
  title: "Web Digital Bazaar | Experts in SEO, SMM & Web Design Services",
  description:
    "Overlook Web Digital Bazaar experts in responsive web design, social media marketing, and top tier search engine optimization services for your business growth.",
  keywords: [
    "responsive web design services",
    "social media marketing services",
    "best search engine optimisation services"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Web Digital Bazaar | Experts in SEO, SMM & Web Design Services",
    description:
      "Overlook Web Digital Bazaar experts in responsive web design, social media marketing, and top tier search engine optimization services for your business growth.",
    url: "https://www.webdigitalbazaar.com/about",
    siteName: "Web Digital Bazaar",
    locale: "en_US",
    type: "website",
  },
};

// 👇 Only importing the client component (no 'use client' here!)
import AboutClient from './AboutClient';

export default function AboutPage() {
  return <AboutClient />;
}
