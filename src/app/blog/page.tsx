// src/app/blog/page.tsx (server)

export const metadata = {
  title: "Insights from Digital Marketing Experts | Web Digital Bazaar",
  description:
    "Stay ahead of the curve with the latest tips, trends, and tutorials in digital marketing, SEO, social media, web design, and more. Curated by the experts at Web Digital Bazaar.",
  keywords: [
    "digital marketing blog",
    "SEO tips",
    "social media trends",
    "web design tutorials",
    "Web Digital Bazaar blog",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Insights from Digital Marketing Experts | Web Digital Bazaar",
    description:
      "Stay ahead of the curve with the latest tips, trends, and tutorials in digital marketing, SEO, social media, web design, and more. Curated by the experts at Web Digital Bazaar.",
    url: "https://www.takshitechdigital.com/blog",
    siteName: "Web Digital Bazaar",
    locale: "en_US",
    type: "article",
  },
};

import BlogClient from './BlogClient';

export default function BlogPage() {
  return <BlogClient />;
}
