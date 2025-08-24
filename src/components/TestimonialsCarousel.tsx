"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// ---- Types ----
export type Testimonial = {
  name: string;
  designation: string; // e.g., "Marketing Head"
  company: string; // e.g., "Acme Inc."
  logo: string; // public path to company logo
  quote: string;
};

export type TestimonialsCarouselProps = {
  autoplayMs?: number; // interval for auto slide
  items?: Testimonial[];
};

const DEFAULT_ITEMS: Testimonial[] = [
  {
    name: "Ankit Sharma",
    designation: "Founder",
    company: "MPRW Research Work LLP",
    logo: "/images/testimonial/testimonial1.png",
    quote:
      "Takshi Tech Digital transformed our online presence with their expert digital marketing strategies. From SEO to paid campaigns, every service delivered measurable results. Highly recommended for business growth!",
  },
  {
    name: "Pooja Mehta",
    designation: "Marketing Head",
    company: "Farmer Bros",
    logo: "/images/testimonial/testimonial2.png",
    quote:
      "The team at Takshi Tech Digital designed an outstanding and user-friendly website for us. Their attention to detail, creative approach, and timely delivery exceeded our expectations.",
  },
  {
    name: "Rahul Verma",
    designation: "CEO",
    company: "Kilo Bites",
    logo: "/images/testimonial/testimonial3.png",
    quote:
      "We approached Takshi Tech Digital for tech solutions and were impressed by their professionalism and innovative approach. Their custom solutions simplified our operations and improved efficiency.",
  },
];

export default function TestimonialsCarousel({
  autoplayMs = 3500,
  items = DEFAULT_ITEMS,
}: TestimonialsCarouselProps) {
  // Duplicate items for seamless loop
  const slides = useMemo(() => [...items, ...items], [items]);
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // auto-play
  useEffect(() => {
    if (isHover) return; // pause on hover
    const id = setInterval(() => setIndex((i) => i + 1), autoplayMs);
    return () => clearInterval(id);
  }, [autoplayMs, isHover]);

  // wrap-around
  useEffect(() => {
    const count = slides.length;
    if (index >= count) setIndex(0);
  }, [index, slides.length]);

  // responsive card width (JS calc -> translateX)
  const getVisible = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1280) return 3; // xl
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 640) return 2; // sm
    return 1;
  };

  const [visible, setVisible] = useState(1);
  useEffect(() => {
    const set = () => setVisible(getVisible());
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  // translate amount
  const translatePct = (100 / visible) * (index % items.length);

  const goPrev = () => setIndex((i) => (i - 1 < 0 ? items.length - 1 : i - 1));
  const goNext = () => setIndex((i) => i + 1);

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        {/* Carousel */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="relative mt-2 overflow-hidden"
        >
          {/* Track */}
          <motion.ul
            className="flex gap-8"
            animate={{ x: `-${translatePct}%` }}
            transition={{ ease: "easeInOut", duration: 0.7 }}
            style={{ width: `${(slides.length * 100) / visible}%` }}
          >
            {slides.map((t, i) => (
              <li
                key={`${t.company}-${i}`}
                className="w-full shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <article className="group h-full rounded-2xl border border-gray-200/70 bg-white p-7 lg:p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="flex items-start gap-5">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-gray-200">
                      <Image
                        src={t.logo}
                        alt={`${t.company} logo`}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {t.designation} • {t.company}
                      </p>
                    </div>
                    <Quote className="ms-auto h-6 w-6 flex-none text-indigo-500/80" />
                  </div>

                  <p className="mt-5 text-base leading-relaxed text-gray-700">
                    {t.quote}
                  </p>
                </article>
              </li>
            ))}
          </motion.ul>

          {/* Controls */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1">
            <button
              onClick={goPrev}
              aria-label="Previous"
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow ring-1 ring-black/5 transition hover:bg-white md:h-11 md:w-11"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next"
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow ring-1 ring-black/5 transition hover:bg-white md:h-11 md:w-11"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, i) => {
            const active = (index % items.length) === i;
            return (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-3 w-3 rounded-full transition md:h-3.5 md:w-3.5 ${
                  active ? "bg-indigo-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/*
- Header hatadi gayi hai.
- Logo size bada (h-16 w-16), text+quote size bhi bada.
- Controls & dots size increase.
- Responsive: 1/2/3 per view.
*/