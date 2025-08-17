// src/app/contact/page.tsx
export const metadata = {
  title: "Get in Touch with Us Now with Takshi Tech Digital",
  description:
    "Have questions or need assistance? Our team is here to help. Reach out today and we'll get back to you as soon as possible.",
  keywords: [
    "contact Takshi Tech Digital",
    "digital marketing support",
    "get in touch Takshi Tech Digital",
    "contact digital marketing company",
    "Takshi Tech Digital inquiry"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Get in Touch with Us Now with Takshi Tech Digital",
    description:
      "Have questions or need assistance? Our team is here to help. Reach out today and we'll get back to you as soon as possible.",
    url: "https://www.takshitechdigital.com/contact",
    siteName: "Takshi Tech Digital",
    locale: "en_US",
    type: "website",
  },
};

import ContactClient from './ContactClient';

export default function ContactPage() {
  return <ContactClient />;
}
