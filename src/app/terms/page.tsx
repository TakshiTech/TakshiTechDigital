// src/app/terms/page.tsx

export const metadata = {
  title: "Terms & Conditions | Web Digital Bazaar User Agreement",
  description:
    "Observe the terms and conditions before using the services offered by Web Digital Bazaar. Find out everything you need to know about our policies, rights, and expectations.",
  keywords: [
    "Web Digital Bazaar terms",
    "user agreement",
    "service terms and conditions",
    "digital marketing terms",
    "usage policy Web Digital Bazaar"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Terms & Conditions | Web Digital Bazaar User Agreement",
    description:
      "Observe the terms and conditions before using the services offered by Web Digital Bazaar. Find out everything you need to know about our policies, rights, and expectations.",
    url: "https://www.takshitechdigital.com/terms",
    siteName: "Web Digital Bazaar",
    locale: "en_US",
    type: "website",
  },
};

import TermsClient from './TermsClient';

export default function TermsPage() {
  return <TermsClient />;
}
