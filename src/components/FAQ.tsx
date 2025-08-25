"use client";
import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

// -----------------------------------------------------------------------------
// Types & defaults
// -----------------------------------------------------------------------------
export interface FAQItem {
  question: string;
  answer: string;
  id?: string; // optional stable id (used for deep-linking)
}

interface FAQProps {
  items?: FAQItem[];
  title?: string;
  allowMultiple?: boolean; // if true, multiple rows can stay open
  className?: string;
}

const DEFAULT_ITEMS: FAQItem[] = [
  {
    question: "What is Takshi Tech Digital?",
    answer:
      "Takshi Tech Digital is a full-service digital marketing agency offering SEO, social media marketing, website design & development, and paid advertising services to help businesses grow online.",
  },
  {
    question: "Who can benefit from your digital marketing services?",
    answer:
      "Our services are ideal for startups, small businesses, e-commerce brands, and established companies looking to boost their online presence and conversions.",
  },
  {
    question: "What is SEO and why is it important for my business?",
    answer:
      "SEO (Search Engine Optimization) improves your website’s visibility on search engines like Google. It helps drive organic traffic, generate leads, and build brand credibility.",
  },
  {
    question: "Which platforms do you manage for social media marketing?",
    answer:
      "We manage Facebook, Instagram, LinkedIn, Twitter/X, and YouTube based on your business goals and target audience.",
  },
  {
    question: "What types of websites do you build?",
    answer:
      "We design and develop custom websites, landing pages, e-commerce sites, and WordPress-based platforms customized to your business needs.",
  },
];

// slug util for stable ids
const toSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// -----------------------------------------------------------------------------
// Row component
// -----------------------------------------------------------------------------
const Row: React.FC<{
  item: FAQItem;
  open: boolean;
  onToggle: () => void;
  index: number;
}> = ({ item, open, onToggle, index }) => {
  const shouldReduce = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id={item.id}
      className="group relative rounded-2xl border border-white/10 bg-zinc-900/60 px-5 py-3 md:px-6 md:py-4 shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)] backdrop-blur-md"
    >
      {/* glow border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, rgba(168,85,247,.25), rgba(99,102,241,.25), rgba(236,72,153,.25))",
        }}
      />

      <button
        aria-expanded={open}
        aria-controls={`faq-${index}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-3 text-left"
      >
        <span className="text-base md:text-lg font-medium text-white/95">
          {item.question}
        </span>
        <motion.span
          initial={false}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5"
        >
          {/* chevron */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4 text-white/80"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-${index}`}
            role="region"
            ref={contentRef}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: shouldReduce ? 0 : 0.32,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-1 text-sm md:text-base leading-relaxed text-zinc-300">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// -----------------------------------------------------------------------------
// JSON-LD for SEO (FAQPage)
// -----------------------------------------------------------------------------
const FAQJsonLd: React.FC<{ items: FAQItem[] }> = ({ items }) => {
  const jsonLd = useMemo(() => {
    const mainEntity = items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    }));
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity,
    };
  }, [items]);

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------
const FAQModern: React.FC<FAQProps> = ({
  items = DEFAULT_ITEMS,
  title = "",
  allowMultiple = false,
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const uid = useId();

  // Assign ids if none provided (for deep-linking via #hash)
  const normalized = useMemo<FAQItem[]>(
    () => items.map((it) => ({ ...it, id: it.id ?? toSlug(it.question) })),
    [items]
  );

  // Open row when url hash matches
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;
    const matchIndex = normalized.findIndex((i) => i.id === hash);
    if (matchIndex >= 0) setOpenIndexes([matchIndex]);
  }, [normalized]);

  const filtered = normalized.filter((it) =>
    (it.question + it.answer).toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (i: number) => {
    setOpenIndexes((prev) => {
      const isOpen = prev.includes(i);
      if (allowMultiple) {
        return isOpen ? prev.filter((p) => p !== i) : [...prev, i];
        } else {
        return isOpen ? [] : [i];
      }
    });
  };

  return (
    <section className={`relative mx-auto max-w-6xl px-4 py-14 md:py-20 ${className}`}>
      {/* background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      {/* optional title */}
      {title ? (
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            {title}
          </h2>
        </div>
      ) : null}

      {/* search */}
      <div className="mx-auto mb-8 max-w-xl">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-2 shadow-inner backdrop-blur">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5 text-white/60"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-3.6-3.6" />
          </svg>
          <input
            placeholder="Search FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent py-2 text-sm text-white/90 placeholder:text-white/40 focus:outline-none"
          />
        </div>
      </div>

      {/* list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="px-2 text-sm text-white/60">No results found.</p>
        )}
        {filtered.map((item, i) => {
          const originalIndex = normalized.findIndex((x) => x.id === item.id);
          const open = openIndexes.includes(originalIndex);
          return (
            <Row
              key={`${item.id}-${uid}`}
              item={item}
              open={open}
              onToggle={() => toggle(originalIndex)}
              index={originalIndex}
            />
          );
        })}
      </div>

      {/* hint row with deep link example */}
      <div className="mt-6 text-xs text-white/40">
        Tip: Share a direct link like <code>#what-is-takshi-tech-digital</code> to open a specific question.
      </div>

      {/* JSON-LD for SEO */}
      <FAQJsonLd items={normalized} />
    </section>
  );
};

export default FAQModern;
