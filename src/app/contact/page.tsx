// src/app/contact/page.tsx
export const metadata = {
  title: "Get in Touch with Us Now with Web Digital Bazaar",
  description:
    "Have questions or need assistance? Our team is here to help. Reach out today and we'll get back to you as soon as possible.",
  keywords: [
    "contact Web Digital Bazaar",
    "digital marketing support",
    "get in touch Web Digital Bazaar",
    "contact digital marketing company",
    "Web Digital Bazaar inquiry"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Get in Touch with Us Now with Web Digital Bazaar",
    description:
      "Have questions or need assistance? Our team is here to help. Reach out today and we'll get back to you as soon as possible.",
    url: "https://www.takshitechdigital.com/contact",
    siteName: "Web Digital Bazaar",
    locale: "en_US",
    type: "website",
  },
};

import ContactClient from './ContactClient';

export default function ContactPage() {
  return <ContactClient />;
}
