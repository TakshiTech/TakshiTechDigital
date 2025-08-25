"use client";
import React, { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";

interface ServiceData {
  name: string;
  color: string;
  subServices: string[];
  illustrationSrc: string;
  buttonSrc: string;
}

const services: ServiceData[] = [
  {
    name: "Marketing",
    color: "from-purple-500 to-fuchsia-500",
    subServices: [
      "SEO",
      "Social Media Marketing",
      "PPC Advertising",
      "Content Marketing",
      "Email Marketing",
      "Whatsapp Marketing",
    ],
    illustrationSrc: "/videos/marketing.webm",
    buttonSrc: "/services/marketing",
  },
  {
    name: "Design",
    color: "from-rose-500 to-orange-500",
    subServices: [
      "UI/UX Design",
      "Social Media Posts",
      "Poster & Flyer Designing",
      "Business Cards Design",
      "Mockups",
      "Brochures",
      "Branding",
    ],
    illustrationSrc: "/videos/design.webm",
    buttonSrc: "/services/design",
  },
  {
    name: "Technology",
    color: "from-sky-500 to-indigo-500",
    subServices: [
      "Web Development",
      "App Development",
      "WordPress Website",
      "API Development & Integration",
      "CMS Development",
      "E‑Commerce Development",
      "Custom Web Apps",
    ],
    illustrationSrc: "/videos/technology.webm",
    buttonSrc: "/services/technology",
  },
];

const springCfg = { stiffness: 160, damping: 20, mass: 0.6 };

function useMouseTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [0, 1], [10, -10]), springCfg);
  const ry = useSpring(useTransform(x, [0, 1], [-12, 12]), springCfg);
  const tx = useSpring(useTransform(x, [0, 1], [-8, 8]), springCfg);
  const ty = useSpring(useTransform(y, [0, 1], [-8, 8]), springCfg);

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    x.set(nx);
    y.set(ny);
  };

  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    x.set(0.5);
    y.set(0.5);
  };

  useEffect(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return { rx, ry, tx, ty, onMouseMove, onMouseLeave };
}

const ServiceCard: React.FC<{ service: ServiceData; index: number }> = ({ service, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px 0px" });
  const { rx, ry, tx, ty, onMouseMove, onMouseLeave } = useMouseTilt();

  const gradient = useMemo(
    () => `bg-gradient-to-br ${service.color}`,
    [service.color]
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.05, ease: "easeOut" }}
      className="group relative"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px 200px at var(--mx) var(--my), rgb(255 255 255 / 18%) 0%, transparent 60%)",
        }}
      />

      <motion.div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          (e.currentTarget as HTMLElement).style.setProperty("--mx", `${e.clientX - r.left}px`);
          (e.currentTarget as HTMLElement).style.setProperty("--my", `${e.clientY - r.top}px`);
          onMouseMove(e);
        }}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX: rx as unknown as number,
          rotateY: ry as unknown as number,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="relative rounded-3xl border border-white/10 bg-zinc-900/60 p-6 md:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      >
        <div
          aria-hidden
          className={`absolute inset-0 rounded-3xl ${gradient} opacity-20 blur-xl -z-10`}
          style={{ transform: "translateZ(-5px)", transformStyle: "preserve-3d" }}
        />

        <div className="flex flex-col-reverse gap-8 md:grid md:grid-cols-2 md:items-center">
          <div style={{ transform: "translateZ(36px)" }} className="space-y-5">
            <div className="inline-flex items-center gap-3">
              <span
                className={`inline-block h-3 w-3 rounded-full bg-gradient-to-br ${service.color}`}
              />
              <h3 className="text-2xl md:text-4xl font-semibold tracking-tight">
                {service.name}
              </h3>
            </div>

            <ul className="flex flex-wrap gap-2.5">
              {service.subServices.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ y: 12, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.08 * i + 0.1, type: "spring", stiffness: 220, damping: 20 }}
                >
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200 shadow-sm backdrop-blur">
                    {s}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href={service.buttonSrc}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white transition hover:bg-white/20 active:scale-[.98]"
                style={{ transform: "translateZ(50px)" }}
              >
                <span>Explore {service.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M13.5 4.5h6v6m0-6L10.5 13.5m9-9L10 20" />
                </svg>
              </Link>
            </div>
          </div>

          <motion.div
            style={{ x: tx as unknown as number, y: ty as unknown as number, transformStyle: "preserve-3d" }}
            className="relative"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-800/60 shadow-xl">
              <div
                className={`pointer-events-none absolute -inset-[1px] rounded-2xl ${gradient} opacity-30 blur-sm`}
                aria-hidden
              />

              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={service.illustrationSrc} type="video/webm" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 mix-blend-overlay" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services3D: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let rafId = 0 as number | any;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="mt-12 grid grid-cols-1 gap-8">
        {services.map((s, i) => (
          <ServiceCard key={s.name} service={s} index={i} />)
        )}
      </div>
    </section>
  );
};

export default Services3D;
