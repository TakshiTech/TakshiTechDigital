"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export type Testimonial = {
  name: string;
  designation: string;
  company: string;
  logo: string;
  quote: string;
};

export type TestimonialsCarouselProps = {
  autoplayMs?: number;
  items?: Testimonial[];
  className?: string;
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

export default function TestimonialsModern({
  autoplayMs = 3500,
  items = DEFAULT_ITEMS,
  className = "",
}: TestimonialsCarouselProps) {
  const shouldReduce = useReducedMotion();
  const slides = useMemo(() => [...items, ...items], [items]);
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [visible, setVisible] = useState(1);

  // responsive: 1 / 2 / 3 per view
  useEffect(() => {
    const calc = () => {
      if (typeof window === "undefined") return 1;
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    };
    const set = () => setVisible(calc());
    set();
    window.addEventListener("resize", set, { passive: true });
    return () => window.removeEventListener("resize", set);
  }, []);

  // autoplay (pause on hover or prefers-reduced-motion)
  useEffect(() => {
    if (isHover || shouldReduce) return;
    const id = setInterval(() => setIndex((i) => i + 1), autoplayMs);
    return () => clearInterval(id);
  }, [autoplayMs, isHover, shouldReduce]);

  // wrap index
  useEffect(() => {
    const count = slides.length;
    if (index >= count) setIndex(0);
    if (index < 0) setIndex(items.length - 1);
  }, [index, slides.length, items.length]);

  const translatePct = (100 / visible) * (index % items.length);

  const goPrev = () =>
    setIndex((i) => (i - 1 < 0 ? items.length - 1 : i - 1));
  const goNext = () => setIndex((i) => i + 1);

  // swipe
  const downRef = useRef<{ id: number; x: number } | null>(null);
  const onPointerDown: React.PointerEventHandler = (e) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    downRef.current = { id: e.pointerId, x: e.clientX };
  };
  const onPointerUp: React.PointerEventHandler = (e) => {
    if (!downRef.current) return;
    const dx = e.clientX - downRef.current.x;
    if (dx > 40) goPrev();
    if (dx < -40) goNext();
    downRef.current = null;
  };

  return (
    <section className={`relative ${className}`}>
      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-16">
        {/* Carousel */}
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="relative overflow-hidden"
          aria-roledescription="carousel"
        >
          <motion.ul
            className="flex items-stretch gap-6 sm:gap-7 lg:gap-8"
            animate={{ x: `-${translatePct}%` }}
            transition={{ ease: "easeInOut", duration: shouldReduce ? 0 : 0.6 }}
            style={{ width: `${(slides.length * 100) / visible}%` }}
          >
            {slides.map((t, i) => (
              <li
                key={`${t.company}-${i}`}
                className="w-full shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                {/* Card with gradient background (self-contained), equal height */}
                <motion.article
                  whileHover={{ y: -6 }}
                  className="group relative h-full"
                >
                  <div
                    className="
                      flex h-full min-h-[230px] flex-col justify-start
                      rounded-2xl border border-white/20
                      bg-gradient-to-tr from-indigo-400/70 via-violet-400/70 to-cyan-300/70
                      p-6 lg:p-7 backdrop-blur-md
                      shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                    "
                  >
                    <div className="flex items-start gap-5">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white ring-2 ring-indigo-400/60">
                        <Image
                          src={t.logo}
                          alt={`${t.company} logo`}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-black">
                          {t.name}
                        </h3>
                        <p className="text-sm text-black">
                          {t.designation} • {t.company}
                        </p>
                      </div>
                      <Quote className="ms-auto h-6 w-6 flex-none text-indigo-700" />
                    </div>

                    <p className="mt-5 text-base leading-relaxed text-black">
                      {t.quote}
                    </p>
                  </div>
                </motion.article>
              </li>
            ))}
          </motion.ul>

          {/* Controls - now fully clickable and above track */}
          <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-1">
            <button
              onClick={goPrev}
              aria-label="Previous"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white ring-1 ring-black/20 transition hover:bg-black/30 md:h-11 md:w-11"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white ring-1 ring-black/20 transition hover:bg-black/30 md:h-11 md:w-11"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, i) => {
            const active = index % items.length === i;
            return (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-3 w-3 rounded-full transition md:h-3.5 md:w-3.5 ${
                  active ? "bg-indigo-500" : "bg-black/20 hover:bg-black/30"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
