"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = { name: string; href: string };

const navLinks: NavLink[] = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "SERVICES", href: "/services" },
  { name: "PORTFOLIO", href: "/portfolio" },
  { name: "PRICING", href: "/pricing" },
  { name: "CONTACT", href: "/contact" },
];

const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:   { x: "100%", opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const linkVariants = {
  hidden: { x: 32, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.06 + 0.08, duration: 0.28 },
  }),
  exit: { x: 32, opacity: 0, transition: { duration: 0.22 } },
};

const navbarVariants = {
  visible: { y: 0, opacity: 1, transition: { duration: 0.25 } },
  hidden:  { y: "-100%", opacity: 0, transition: { duration: 0.25 } },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // useRef instead of state to avoid re-renders & weird scroll locking
  const lastScrollYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const visTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleNavbar = useCallback(() => setIsOpen((p) => !p), []);

  // Lock/unlock body scroll ONLY when menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      // restore whatever was there before
      document.body.style.overflow = prev || "auto";
    };
  }, [isOpen]);

  // Lightweight scroll handler (no state churn per pixel)
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setIsScrolled(y > 50);

        const last = lastScrollYRef.current;
        if (y > last && y > 50) setIsVisible(false);
        else if (y < last) setIsVisible(true);

        // brief auto-show after stop
        if (visTimeoutRef.current) clearTimeout(visTimeoutRef.current);
        visTimeoutRef.current = setTimeout(() => setIsVisible(true), 150);

        lastScrollYRef.current = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (visTimeoutRef.current) clearTimeout(visTimeoutRef.current);
    };
  }, []);

  const barColor = "bg-white"; // always white bars since navbar is dark

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 bg-neutral-900/90 backdrop-blur-xl shadow-md border-b border-white/10"
        variants={navbarVariants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="w-28 h-auto">
          <Link href="/" className="inline-block" aria-label="Go to home">
            <span className="inline-flex">
              <Image
                src="/images/animated-logo.gif"
                alt="Takshi Tech Digital Logo"
                width={150}
                height={40}
                className="w-full h-auto object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                priority
                unoptimized
              />
            </span>
          </Link>
        </div>

        <button
          onClick={toggleNavbar}
          className="z-[60] cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <div className="space-y-1">
            <span className={`block w-8 h-1 ${barColor} transition-transform duration-300 ease-in-out`} />
            <span className={`block w-8 h-1 ${barColor} transition-opacity duration-300 ease-in-out`} />
            <span className={`block w-8 h-1 ${barColor} transition-transform duration-300 ease-in-out`} />
          </div>
        </button>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            style={{ willChange: "transform, opacity" }}
          >
            {/* Left dim area (click to close) */}
            <button
              onClick={toggleNavbar}
              aria-label="Close sidebar"
              className="hidden md:block w-[70%] h-full bg-gradient-to-br from-black/30 via-black/20 to-black/10 backdrop-blur-sm"
            />

            {/* Right panel */}
            <motion.aside
              id="mobile-menu"
              className="w-full md:w-[30%] h-full bg-white/90 backdrop-blur-xl border-l border-black/10 flex flex-col justify-center items-start px-8 space-y-6 shadow-2xl relative"
              variants={sidebarVariants}
              role="dialog"
              aria-modal="true"
            >
              <button
                onClick={toggleNavbar}
                className="absolute top-5 left-8 text-black text-5xl font-bold cursor-pointer hover:opacity-80"
                aria-label="Close navigation menu"
              >
                ×
              </button>

              <nav className="flex flex-col items-start space-y-3 text-black text-4xl">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={linkVariants}
                    className="hover:text-gray-700 transition-colors"
                  >
                    <Link href={link.href} onClick={toggleNavbar}>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* spacer under fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
