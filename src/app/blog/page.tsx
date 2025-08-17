// src/app/blog/page.tsx (server)

export const metadata = {
  title: "Insights from Digital Marketing Experts | Takshi Tech Digital",
  description:
    "Stay ahead of the curve with the latest tips, trends, and tutorials in digital marketing, SEO, social media, web design, and more. Curated by the experts at Takshi Tech Digital.",
  keywords: [
    "digital marketing blog",
    "SEO tips",
    "social media trends",
    "web design tutorials",
    "Takshi Tech Digital blog",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Insights from Digital Marketing Experts | Takshi Tech Digital",
    description:
      "Stay ahead of the curve with the latest tips, trends, and tutorials in digital marketing, SEO, social media, web design, and more. Curated by the experts at Takshi Tech Digital.",
    url: "https://www.takshitechdigital.com/blog",
    siteName: "Takshi Tech Digital",
    locale: "en_US",
    type: "article",
  },
};

import BlogClient from './BlogClient';

export default function BlogPage() {
  return <BlogClient />;
}
