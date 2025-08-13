// src/app/portfolio/page.tsx

export const metadata = {
  title: "Our Work – Web and Marketing Projects | Web Digital Bazaar",
  description:
    "Explore our collection of branding, digital marketing, and website projects. See how Web Digital Bazaar uses creative methods to produce noticeable results.",
  keywords: [
    "branding portfolio",
    "website design portfolio",
    "digital marketing case studies",
    "Web Digital Bazaar projects",
    "online business results"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Our Work – Web and Marketing Projects | Web Digital Bazaar",
    description:
      "Explore our collection of branding, digital marketing, and website projects. See how Web Digital Bazaar uses creative methods to produce noticeable results.",
    url: "https://www.takshitechdigital.com/portfolio",
    siteName: "Web Digital Bazaar",
    locale: "en_US",
    type: "website",
  },
};

import PortfolioClient from './PortfolioClient';

export default function PortfolioPage() {
  return <PortfolioClient />;
}
