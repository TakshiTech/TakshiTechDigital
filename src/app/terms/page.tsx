// src/app/terms/page.tsx

export const metadata = {
  title: "Terms & Conditions | Takshi Tech Digital User Agreement",
  description:
    "Observe the terms and conditions before using the services offered by Takshi Tech Digital. Find out everything you need to know about our policies, rights, and expectations.",
  keywords: [
    "Takshi Tech Digital terms",
    "user agreement",
    "service terms and conditions",
    "digital marketing terms",
    "usage policy Takshi Tech Digital"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Terms & Conditions | Takshi Tech Digital User Agreement",
    description:
      "Observe the terms and conditions before using the services offered by Takshi Tech Digital. Find out everything you need to know about our policies, rights, and expectations.",
    url: "https://www.takshitechdigital.com/terms",
    siteName: "Takshi Tech Digital",
    locale: "en_US",
    type: "website",
  },
};

import TermsClient from './TermsClient';

export default function TermsPage() {
  return <TermsClient />;
}
