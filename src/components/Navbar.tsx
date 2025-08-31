"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = {
  name: string;
  href: string;
};

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
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
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
  hidden: { y: "-100%", opacity: 0, transition: { duration: 0.25 } },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const toggleNavbar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);

      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (y > lastScrollY && y > 50) setIsVisible(false);
      else if (y < lastScrollY) setIsVisible(true);

      const t = setTimeout(() => setIsVisible(true), 150);
      setScrollTimeout(t);
      setLastScrollY(y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [lastScrollY, scrollTimeout]);

  const barColor = isScrolled ? "bg-white" : "bg-white"; // always white bars since navbar always dark

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 bg-neutral-900/90 backdrop-blur-xl shadow-md border-b border-white/10`}
        variants={navbarVariants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="w-28 h-auto">
          <Link href="/" className="inline-block">
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
            <div
              className="hidden md:block w-[70%] h-full bg-gradient-to-br from-black/30 via-black/20 to-black/10 backdrop-blur-sm"
              onClick={toggleNavbar}
              aria-label="Close sidebar"
            />

            <motion.div
              className="w-full md:w-[30%] h-full bg-white/90 backdrop-blur-xl border-l border-black/10 flex flex-col justify-center items-start px-8 space-y-6 shadow-2xl relative"
              variants={sidebarVariants}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-16" />
    </>
  );
};

export default Navbar;
