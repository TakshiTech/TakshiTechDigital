// src/app/privacy/page.tsx

export const metadata = {
  title: "Privacy Statement | Web Digital Bazaar's Security of Information",
  description:
    "To learn how Web Digital Bazaar gathers, uses and safeguards your personal information across all of our digital platforms, read our privacy policy.",
  keywords: [
    "Web Digital Bazaar privacy",
    "digital platform privacy policy",
    "user data protection",
    "information security statement",
    "privacy practices Web Digital Bazaar"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Privacy Statement | Web Digital Bazaar's Security of Information",
    description:
      "To learn how Web Digital Bazaar gathers, uses and safeguards your personal information across all of our digital platforms, read our privacy policy.",
    url: "https://www.takshitechdigital.com/privacy",
    siteName: "Web Digital Bazaar",
    locale: "en_US",
    type: "website",
  },
};

import PrivacyClient from './PrivacyClient';

export default function PrivacyPage() {
  return <PrivacyClient />;
}
