"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, PlayCircle, Star, Zap, Check, ChevronRight, Send, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * AnimatedHero (Digital Marketing Agency Edition)
 * Full, copy‑paste ready component for Next.js App Router + Tailwind
 * Includes: dominant hero, top‑right logo, contact form
 */
export default function AnimatedHero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spx = useSpring(mx, { stiffness: 80, damping: 20 });
  const spy = useSpring(my, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(spy, [-50, 50], [10, -10]);
  const rotateY = useTransform(spx, [-50, 50], [-10, 10]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = () => el.getBoundingClientRect();
    const onMove = (e: MouseEvent) => {
      const r = rect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      mx.set(x / 8);
      my.set(y / 8);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-neutral-950 text-white">
      {/* TOP‑RIGHT LOGO */}
      <a href="/" className="absolute right-6 top-6 z-20 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm backdrop-blur-md ring-1 ring-white/15 hover:bg-white/15">
        <img src="/logo.svg" alt="Logo" className="h-5 w-5" />
        <span className="hidden sm:block font-semibold tracking-wide">Takshi Tech Digital</span>
      </a>

      {/* BACKGROUND LAYERS */}
      <DottedGrid />
      <AnimatedMesh />
      <CornerBeams />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 pt-28 pb-20 sm:pt-36 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* LEFT CONTENT */}
          <motion.div style={{ rotateX, rotateY }} className="will-change-transform">
            <Badge>
              <Sparkles className="h-4 w-4" />
              <span className="mx-2">#1 Growth Partner for Bold Brands</span>
              <ChevronRight className="h-4 w-4" />
            </Badge>

            <h1 className="mt-6 text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]">
              <span className="bg-gradient-to-br from-white via-white to-neutral-300 bg-clip-text text-transparent">
                Outsmart competitors.
              </span>
              <br />
              <span className="bg-[linear-gradient(120deg,#22d3ee_0%,#a78bfa_35%,#f472b6_70%,#facc15_100%)] bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(99,102,241,0.35)]">
                Dominate demand.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base/7 sm:text-lg/8 text-neutral-300">
              Performance‑obsessed digital marketing: SEO that compounds, paid media that prints, CRO that converts, content that captures.
            </p>

            {/* <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <ShimmerButton href="#contact">
                <span className="flex items-center gap-2">
                  Get Your Free Growth Plan <ArrowRight className="h-4 w-4" />
                </span>
              </ShimmerButton>
              <GhostButton href="#work">
                <span className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5" /> See wins & case studies
                </span>
              </GhostButton>
            </div> */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2 }}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {[
                { icon: <Zap className="h-4 w-4" />, kpi: "+312%", label: "avg. ROAS" },
                { icon: <Star className="h-4 w-4" />, kpi: "4.9★", label: "client rating" },
                { icon: <Check className="h-4 w-4" />, kpi: "150+", label: "tests shipped" },
                { icon: <ShieldCheck className="h-4 w-4" />, kpi: "7‑figure", label: "ad spend managed" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.1 * i }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 text-neutral-300">
                    {item.icon}
                    <span className="text-xs">{item.label}</span>
                  </div>
                  <div className="mt-1 text-2xl font-semibold">{item.kpi}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT CONTACT FORM */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative"
          >
            <ContactCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------------------- Sub‑components --------------------- */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-md"
    >
      {children}
    </motion.div>
  );
}

function ShimmerButton({ children, href }: { children: React.ReactNode; href?: string }) {
  const Tag: any = href ? "a" : "button";
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
      <Tag href={href} className="group relative inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium text-neutral-900 focus:outline-none">
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 opacity-90 blur-[1px] transition-opacity group-hover:opacity-100" />
        <span className="absolute inset-[2px] rounded-2xl bg-white" />
        <span className="relative">{children}</span>
      </Tag>
    </motion.div>
  );
}

function GhostButton({ children, href }: { children: React.ReactNode; href?: string }) {
  const Tag: any = href ? "a" : "button";
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
      <Tag href={href} className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm text-white/90 backdrop-blur-sm">
        {children}
      </Tag>
    </motion.div>
  );
}

function DottedGrid() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 [background:radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_60%),linear-gradient(transparent_0,transparent_0),linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:100%_100%,100%_100%,28px_28px,28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
    </div>
  );
}

function AnimatedMesh() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0.55, scale: 0.95 }}
        animate={{ opacity: 0.85, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "conic-gradient(from 120deg, rgba(34,211,238,0.35), rgba(167,139,250,0.35), rgba(244,114,182,0.35), rgba(250,204,21,0.35), rgba(34,211,238,0.35))",
        }}
      />
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.6, y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[8%] h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.35), transparent 60%)" }}
      />
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.7, y: [0, 16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.35), transparent 60%)" }}
      />
      <motion.div
        initial={{ opacity: 0.15 }}
        animate={{ opacity: 0.35, x: [0, 10, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 left-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(250,204,21,0.25), transparent 60%)" }}
      />
    </div>
  );
}

function CornerBeams() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 rounded-[3rem] ring-1 ring-white/10" />
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-pink-400/25 blur-3xl" />
    </div>
  );
}


/* --------------------- Contact Card & Form --------------------- */
function ContactCard() {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 backdrop-blur-md">
      <div className="absolute -top-3 right-6 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-white/80">Free audit</div>
      <h3 className="text-xl font-semibold">Get a <span className="text-white/90">free growth plan</span></h3>
      <p className="mt-1 text-sm text-neutral-300">Tell us what you need—our team will respond within one business day.</p>
      <ContactForm />
      <p className="mt-3 text-[11px] text-neutral-400">We respect your privacy. No spam, ever.</p>
    </div>
  );
}

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Bad response");
      setStatus("Thanks! We'll be in touch shortly.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 grid grid-cols-1 gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Service" htmlFor="service">
          <select
            id="service"
            name="service"
            required
            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none backdrop-blur-md focus:ring-2 focus:ring-cyan-300/40"
            defaultValue="SEO"
          >
            <option className="bg-neutral-900" value="SEO">SEO</option>
            <option className="bg-neutral-900" value="Paid Media">Paid Media (Google/Meta)</option>
            <option className="bg-neutral-900" value="CRO">Conversion Rate Optimization (CRO)</option>
            <option className="bg-neutral-900" value="Content">Content & Copy</option>
            <option className="bg-neutral-900" value="Analytics">Analytics & Attribution</option>
            <option className="bg-neutral-900" value="Full‑stack Growth">Full‑stack Growth</option>
          </select>
        </Field>
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none backdrop-blur-md focus:ring-2 focus:ring-cyan-300/40"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none backdrop-blur-md focus:ring-2 focus:ring-cyan-300/40"
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+91 98xxxxxxx"
            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none backdrop-blur-md focus:ring-2 focus:ring-cyan-300/40"
          />
        </Field>
      </div>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Tell us your goals, KPIs, budget, and timeline…"
          className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none backdrop-blur-md focus:ring-2 focus:ring-cyan-300/40"
        />
      </Field>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        className="group relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-900 disabled:opacity-70"
      >
        <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 opacity-90 blur-[1px]" />
        {loading ? "Sending…" : (<><Send className="h-4 w-4" /> Send request</>)}
      </motion.button>

      {status && (
        <div className="mt-2 text-sm text-cyan-200/90">{status}</div>
      )}
    </form>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="grid gap-1 text-sm">
      <span className="text-white/90">{label}</span>
      {children}
    </label>
  );
}

/* ==========================================================================
   ADD THIS API ROUTE so the form stops showing "Something went wrong"
   File: app/api/contact/route.ts
============================================================================ */
// ----- BEGIN: app/api/contact/route.ts -----
// import { NextResponse } from "next/server";
// export async function POST(req: Request) {
//   const data = await req.json();
//   // TODO: Send to email/CRM/provider of your choice here.
//   // Example: await fetch(process.env.WEBHOOK_URL!, { method: "POST", body: JSON.stringify(data) });
//   return NextResponse.json({ ok: true });
// }
// ----- END: app/api/contact/route.ts -----

/* ==========================================================================
   PLACE THIS LOGO at public/logo.svg (simple, neutral mark). Replace anytime.
============================================================================ */
/*
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#22d3ee"/>
      <stop offset="0.5" stop-color="#a78bfa"/>
      <stop offset="1" stop-color="#f472b6"/>
    </linearGradient>
  </defs>
  <rect rx="28" width="128" height="128" fill="#0a0a0a"/>
  <path d="M28 84L52 44l14 22 12-18 22 36" fill="none" stroke="url(#g)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
*/
