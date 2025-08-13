// src/app/pricing/page.tsx

export const metadata = {
  title: "Affordable Pricing Plans | Web Digital Bazaar Services",
  description:
    "Find affordable prices for digital marketing, social media, SEO, and site design services. Select a strategy that aligns with your company's objectives.",
  keywords: [
    "affordable digital marketing pricing",
    "SEO service cost",
    "social media marketing plans",
    "website design pricing",
    "Web Digital Bazaar pricing"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Affordable Pricing Plans | Web Digital Bazaar Services",
    description:
      "Find affordable prices for digital marketing, social media, SEO, and site design services. Select a strategy that aligns with your company's objectives.",
    url: "https://www.takshitechdigital.com/pricing",
    siteName: "Web Digital Bazaar",
    locale: "en_US",
    type: "website",
  },
};

import PricingClient from './PricingClient';

export default function PricingPage() {
  return <PricingClient />;
}
