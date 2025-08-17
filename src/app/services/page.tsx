// ❌ NO 'use client' here – must remain a server component

export const metadata = {
  title: "Digital Marketing & Tech Services Provide by Takshi Tech Digital",
  description:
    "Explore all in one digital services from Takshi Tech Digital, including marketing, design, and development everything you need to grow your business online.",
  keywords: [
    "digital marketing services",
    "web development",
    "UI/UX design",
    "online business growth",
    "Takshi Tech Digital services"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Digital Marketing & Tech Services Provide by Takshi Tech Digital",
    description:
      "Explore all in one digital services from Takshi Tech Digital, including marketing, design, and development everything you need to grow your business online.",
    url: "https://www.takshitechdigital.com/services",
    siteName: "Takshi Tech Digital",
    locale: "en_US",
    type: "website",
  },
};

// ✅ No dynamic(), no ssr false
import ServicesClient from './ServicesClient';

export default function ServicesPage() {
  return <ServicesClient />;
}
