// src/app/services/design/page.tsx

export const metadata = {
  title: "Flexible Web Design & Development Service Provide Takshi Tech Digital",
  description:
    "To improve your brand and user experience, have Takshi Tech Digital's creative team create beautiful, user-focused web, branding, and UI/UX designs.",
  keywords: [
    "best website design and development company in India",
    "UI UX design company India"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Flexible Web Design & Development Service Provide Takshi Tech Digital",
    description:
      "To improve your brand and user experience, have Takshi Tech Digital's creative team create beautiful, user-focused web, branding, and UI/UX designs.",
    url: "https://www.takshitechdigital.com/services/design",
    siteName: "Takshi Tech Digital",
    locale: "en_US",
    type: "website",
  },
};

// ✅ Import client component
import DesignClient from './DesignClient';

export default function DesignPage() {
  return <DesignClient />;
}
