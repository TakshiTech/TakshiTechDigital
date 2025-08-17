// src/app/privacy/page.tsx

export const metadata = {
  title: "Privacy Statement | Takshi Tech Digital's Security of Information",
  description:
    "To learn how Takshi Tech Digital gathers, uses and safeguards your personal information across all of our digital platforms, read our privacy policy.",
  keywords: [
    "Takshi Tech Digital privacy",
    "digital platform privacy policy",
    "user data protection",
    "information security statement",
    "privacy practices Takshi Tech Digital"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Privacy Statement | Takshi Tech Digital's Security of Information",
    description:
      "To learn how Takshi Tech Digital gathers, uses and safeguards your personal information across all of our digital platforms, read our privacy policy.",
    url: "https://www.takshitechdigital.com/privacy",
    siteName: "Takshi Tech Digital",
    locale: "en_US",
    type: "website",
  },
};

import PrivacyClient from './PrivacyClient';

export default function PrivacyPage() {
  return <PrivacyClient />;
}
