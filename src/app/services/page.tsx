// ❌ NO 'use client' here – must remain a server component

export const metadata = {
  title: "Digital Marketing & Tech Services Provide by Web Digital Bazaar",
  description:
    "Explore all in one digital services from Web Digital Bazaar, including marketing, design, and development everything you need to grow your business online.",
  keywords: [
    "digital marketing services",
    "web development",
    "UI/UX design",
    "online business growth",
    "Web Digital Bazaar services"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Digital Marketing & Tech Services Provide by Web Digital Bazaar",
    description:
      "Explore all in one digital services from Web Digital Bazaar, including marketing, design, and development everything you need to grow your business online.",
    url: "https://www.takshitechdigital.com/services",
    siteName: "Web Digital Bazaar",
    locale: "en_US",
    type: "website",
  },
};

// ✅ No dynamic(), no ssr false
import ServicesClient from './ServicesClient';

export default function ServicesPage() {
  return <ServicesClient />;
}
