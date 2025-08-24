"use client";
import { motion } from "framer-motion";
import {
  Building2,
  Bus,
  GraduationCap,
  Home,
  ShoppingBag,
  Gamepad2,
  HeartPulse,
  Banknote,
  UtensilsCrossed,
  Smartphone,
  Car,
  Dumbbell,
  Gem,
  Globe2,
} from "lucide-react";

export type IndustryItem = {
  title: string;
  Icon?: React.ComponentType<any>; // lucide icon
  imgSrc?: string; // optional image if you prefer PNG/SVG
};

export type IndustriesGridProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: IndustryItem[];
};

const DEFAULT_ITEMS: IndustryItem[] = [
  { title: "Real Estate", Icon: Home },
  { title: "Tour & Travels", Icon: Globe2 },
  { title: "Education", Icon: GraduationCap },
  { title: "Transport", Icon: Bus },
  { title: "Events", Icon: Building2 },
  { title: "eCommerce", Icon: ShoppingBag },
  { title: "Game", Icon: Gamepad2 },
  { title: "Healthcare", Icon: HeartPulse },
  { title: "Finance", Icon: Banknote },
  { title: "Restaurant", Icon: UtensilsCrossed },
  { title: "On‑Demand", Icon: Smartphone },
  { title: "Grocery", Icon: ShoppingBag },
  { title: "Jewelry", Icon: Gem },
  { title: "Automobile", Icon: Car },
  { title: "Fitness Center", Icon: Dumbbell },
];

// Simple stagger for pretty entrance
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function IndustriesGrid({
  eyebrow = "Fabrications we work with",
  title = "Industries we serve",
  description =
    "Regardless of whether you need an app or website for education, marketing, healthcare, delivery and more — we team up with you to ship delightful, business‑driving experiences.",
  items = DEFAULT_ITEMS,
}: IndustriesGridProps) {
  return (
    <section className="relative">
      {/* subtle top divider that blends with any background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-indigo-500">
            {eyebrow}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 text-pretty text-gray-600">
            {description}
          </p>
        </div>

        {/* Grid */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {items.map(({ title, Icon, imgSrc }, i) => (
            <motion.li key={i} variants={item}>
              <div className="group relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
                {/* glow on hover */}
                <div
                  className="absolute inset-px -z-10 rounded-2xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120px 80px at 20% 20%, rgba(99,102,241,.18), transparent 60%), radial-gradient(120px 80px at 80% 80%, rgba(56,189,248,.2), transparent 60%)",
                  }}
                />

                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-content-center rounded-xl bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-sky-500/10">
                    {imgSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imgSrc} alt={title} className="h-6 w-6 object-contain" />
                    ) : Icon ? (
                      <Icon className="h-6 w-6 text-indigo-600" />
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-900">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-500">Solutions & Expertise</p>
                  </div>

                  {/* pill arrow */}
                  <div className="ms-auto hidden shrink-0 rounded-full border border-gray-200/70 p-2 text-gray-400 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:border-indigo-200 group-hover:text-indigo-600 sm:block">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </div>
                </div>

                {/* bottom accent line */}
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-indigo-200 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-indigo-500/30" />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/*
Usage:

import IndustriesGrid from "./IndustriesGrid";

<IndustriesGrid />

or pass custom items with your own icons or images:

<IndustriesGrid
  title="FABRICATIONS WE WORK WITH"
  items={[
    { title: "EdTech", Icon: GraduationCap },
    { title: "Logistics", Icon: Bus },
    { title: "SaaS", Icon: Building2 },
    { title: "FinTech", Icon: Banknote },
    { title: "Hospitality", Icon: UtensilsCrossed },
    { title: "Wellness", Icon: Dumbbell },
  ]}
/>
*/
