export const metadata = {
  title: "Digital Marketing Services Provided By Takshi Tech Digital",
  description:
    "Takshi Tech Digital provides strong digital marketing services & solutions, ranging from SEO to paid advertisements, to support the successful online expansion of your company.",
  keywords: [
    "digital marketing services"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Digital Marketing Services Provided By Takshi Tech Digital",
    description:
      "Takshi Tech Digital provides strong digital marketing services & solutions, ranging from SEO to paid advertisements, to support the successful online expansion of your company.",
    url: "https://www.takshitechdigital.com/services/marketing",
    siteName: "Takshi Tech Digital",
    locale: "en_US",
    type: "article",
  },
};

// ✅ Import the actual UI (client-side code)
import MarketingClient from './MarketingClient';

export default function MarketingPage() {
  return <MarketingClient />;
}

