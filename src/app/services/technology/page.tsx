// src/app/services/technology/page.tsx

export const metadata = {
  title: "Website and App Development Services By Web Digital Bazaar",
  description:
    "Builds fast, scalable websites and apps Web Digital Bazaar. Get future ready, customized tech solutions designed to grow your business efficiently.",
  keywords: [
    "website design company in Noida"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Website and App Development Services By Web Digital Bazaar",
    description:
      "Builds fast, scalable websites and apps Web Digital Bazaar. Get future ready, customized tech solutions designed to grow your business efficiently.",
    url: "https://www.takshitechdigital.com/services/technology",
    siteName: "Web Digital Bazaar",
    locale: "en_US",
    type: "website",
  },
};

// ✅ UI logic
import TechnologyClient from './TechnologyClient';

export default function TechnologyPage() {
  return <TechnologyClient />;
}

