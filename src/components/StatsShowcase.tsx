"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Globe2,
  Mail,
  Code2,
  Users2,
  TrendingUp,
} from "lucide-react";

// ---- Helper: Animated Counter ----
function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMilSecDur = 1200;
    let incrementTime = 20;
    let step = Math.ceil((end - start) / (totalMilSecDur / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
}

// ---- Types ----
export type StatItem = {
  label: string;
  sublabel?: string;
  value: number;
  suffix?: string;
  Icon?: React.ComponentType<any>;
};

export type StatsShowcaseProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  stats?: StatItem[];
};

// ---- Default content ----
const DEFAULT_STATS: StatItem[] = [
  { label: "Digital Marketing", sublabel: "& Still Counting", value: 450, suffix: "+", Icon: Briefcase },
  { label: "Websites Developed", sublabel: "& Still Counting", value: 300, suffix: "+", Icon: Code2 },
  { label: "Email Marketing", sublabel: "& Still Counting", value: 100, suffix: "+", Icon: Mail },
  { label: "Satisfied Clients", sublabel: "& Still Counting", value: 800, suffix: "+", Icon: Users2 },
  { label: "Countries Served", sublabel: "& Still Counting", value: 5, suffix: "+", Icon: Globe2 },
  { label: "Success Score", sublabel: "on UpWork", value: 90, suffix: "%", Icon: TrendingUp },
];

// ---- Component ----
export default function StatsShowcase({
  eyebrow = "Take a quick look at our",
  title = "Numbers & Laurel",
  description =
    "Our methodology and involvement with all parts of Website Development and Designing, helping our potential clients connecting their necessities. Developing your business online and interactive presence, sell more and track down more leads.",
  stats = DEFAULT_STATS,
}: StatsShowcaseProps) {
  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-indigo-500">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-3xl text-balance text-gray-600">
              {description}
            </p>
          )}
        </div>

        {/* Stats grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ label, sublabel, value, suffix = "+", Icon }, idx) => (
            <motion.article
              key={idx}
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="group relative rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              {/* Gradient hover effect */}
              <div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,.15), rgba(192,132,252,.15), rgba(56,189,248,.15), rgba(16,185,129,.15), rgba(99,102,241,.15))",
                }}
              />
              <div className="relative rounded-xl bg-white p-5 shadow-sm dark:bg-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/15 to-sky-500/15">
                    {Icon ? <Icon className="h-6 w-6 text-indigo-600" /> : null}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      <Counter value={value} />
                      <span className="align-baseline text-indigo-600">{suffix}</span>
                    </h3>
                    <p className="mt-1 text-base font-medium text-gray-800">{label}</p>
                    {sublabel && (
                      <p className="text-sm text-gray-500">{sublabel}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
