"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IndianRupee, TrendingUp, Megaphone, Code, Rocket, PenTool, MapPin } from "lucide-react";

/**
 * PricingTeaserPro (Refined)
 * - Clean white background
 * - Clear borders on cards
 * - Taller/column-like cards
 * - Noticeable but classy hover animations
 * - Fully responsive
 * - Removed bottom brand bar
 */

export type TeaserItem = {
  id: string;
  title: string;
  startsAt: string;
  bullets: string[];
  icon?: React.ElementType;
};

export type PricingTeaserProProps = {
  items?: TeaserItem[];
  pricingHref?: string;
  className?: string;
};

const DEFAULT_ITEMS: TeaserItem[] = [
  { id: "seo", title: "Search Engine Optimization", startsAt: "₹8,000/mo", bullets: ["5–30 keywords", "Weekly reports"], icon: TrendingUp },
  { id: "social-media", title: "Social Media Marketing", startsAt: "₹8,000/mo", bullets: ["FB + Instagram", "Posts • Stories • Reels"], icon: Megaphone },
  { id: "web-development", title: "Web Development", startsAt: "₹10,000/mo", bullets: ["WordPress • React/Next", "Basic On‑Page SEO"], icon: Code },
  { id: "paid-ads", title: "Paid Ads", startsAt: "₹6,000–₹7,000/mo + GST", bullets: ["Google & Meta", "Daily lead reports"], icon: Rocket },
  { id: "content-seo", title: "Content + On‑Page SEO", startsAt: "₹5,000/mo", bullets: ["Content writing", "On‑page at ₹250/page"], icon: PenTool },
  { id: "google-listing", title: "Google Listing", startsAt: "₹1,000/mo", bullets: ["Page creation free", "Instant delivery"], icon: MapPin },
  { id: "all-in-one", title: "All‑in‑One Marketing", startsAt: "₹24,000/mo", bullets: ["SEO + SMM + On‑Page", "Weekly reports"], icon: IndianRupee },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemAnim = {
  hidden: { y: 18, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 220, damping: 20 } },
};

function TeaserCard({ item, pricingHref }: { item: TeaserItem; pricingHref: string }) {
  const Icon = item.icon ?? IndianRupee;
  return (
    <motion.div
      variants={itemAnim}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg min-h-[300px]"
    >
      {/* subtle focus ring on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#00BFFF]/30 transition" />

      {/* header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gradient-to-br from-[#00FF99]/20 to-[#00BFFF]/20 p-2">
          <Icon className="h-5 w-5 text-gray-900" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold leading-tight text-gray-900">{item.title}</h3>
      </div>

      {/* price */}
      <div className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900">{item.startsAt}</div>

      {/* bullets */}
      <ul className="mt-3 space-y-1 text-sm text-gray-700 flex-1">
        {item.bullets.slice(0, 3).map((b, i) => (
          <li key={i} className="leading-snug">• {b}</li>
        ))}
      </ul>

      {/* CTA + progress underline */}
      <div className="mt-5 flex items-center justify-between">
        <Link
          href={`${pricingHref}#${item.id}`}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
          aria-label={`See ${item.title} pricing`}
        >
          See details →
        </Link>
        <span className="h-1 w-14 rounded-full bg-gradient-to-r from-[#00FF99] to-[#00BFFF] group-hover:w-24 transition-all" />
      </div>
    </motion.div>
  );
}

export default function PricingTeaserPro({
  items = DEFAULT_ITEMS,
  pricingHref = "/pricing",
  className = "",
}: PricingTeaserProProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-white ${className}`}
      aria-labelledby="pricing-teaserpro-heading"
    >
      {/* header */}
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <h2 id="pricing-teaserpro-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Plans that fit your growth
          </h2>
          <Link href={pricingHref} className="text-sm font-semibold text-gray-900 underline underline-offset-4">
            View all plans →
          </Link>
        </div>
      </div>

      {/* cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-4 pb-10 pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {items.map((it) => (
          <TeaserCard key={it.id} item={it} pricingHref={pricingHref} />
        ))}
      </motion.div>
    </section>
  );
}

/** Compact ticker (unchanged) */
export function PricingTicker({ pricingHref = "/pricing" }: { pricingHref?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <motion.div
        initial={{ x: "-10%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="text-sm text-gray-900">
          <span className="font-semibold">SEO</span> from ₹8k/mo • <span className="font-semibold">SMM</span> from ₹8k/mo • <span className="font-semibold">Web Dev</span> from ₹10k/yr • <span className="font-semibold">Ads</span> from ₹6k/mo • <span className="font-semibold">Content</span> from ₹5k/mo
        </p>
        <Link href={pricingHref} className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 hover:underline">
          See pricing →
        </Link>
      </motion.div>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#00FF99] to-[#00BFFF]" />
    </div>
  );
}
