"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Define a type for nav links, allowing for an optional dropdown property
type NavLink = {
  name: string;
  href: string;
  dropdown?: string[];
};

const navLinks: NavLink[] = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "SERVICES", href: "/services" },
  { name: "PORTFOLIO", href: "/portfolio" },
  {
    name: "USE CASES 🠋",
    href: "/use-cases/",
    dropdown: [
      "HEALTHCARE",
      "EDUCATION",
      "REAL ESTATE",
      "RETAILERS",
      "INTERIOR DESIGNERS",
      "B2B",
    ],
  },
  { name: "PRICING", href: "/pricing" },
  { name: "WHY US?", href: "/why-choose-a-digital-marketing-agency" },
  { name: "BLOG", href: "/blog" },
  { name: "CONTACT", href: "/contact" },
];

// Framer Motion Variants for Sidebar Animation
const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const linkVariants = {
  hidden: { x: 300, opacity: 0 },
  visible: (index: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: index * 0.25,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
  exit: {
    x: 300,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

// Navbar Variants for hide/show animation
const navbarVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  hidden: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  // Memoize toggle function to prevent unnecessary re-renders
  const toggleNavbar = useCallback(() => {
    setIsOpen((prev) => !prev);
    setActiveSubMenu(null);
  }, []);

  // Handle scroll behavior for hiding/showing and background change
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 150);

      setScrollTimeout(timeout);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
        variants={navbarVariants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Logo */}
        <div className="w-40 h-auto">
          <Link href="/">
            <Image
              src="/images/animated-logo.gif"
              alt="Takshi Tech Digital Logo"
              width={160}
              height={40}
              className="w-full h-auto object-contain"
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`z-[60] cursor-pointer ${isScrolled ? "text-black" : "text-black"}`}
          onClick={toggleNavbar}
          aria-label="Toggle navigation menu"
        >
          <div className="space-y-1">
            <span className="block w-8 h-1 bg-current transition-transform duration-300 ease-in-out" />
            <span className="block w-8 h-1 bg-current transition-opacity duration-300 ease-in-out" />
            <span className="block w-8 h-1 bg-current transition-transform duration-300 ease-in-out" />
          </div>
        </button>
      </motion.header>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isOpen && !activeSubMenu && (
          <motion.div
            className="fixed inset-0 flex z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            style={{ willChange: "transform, opacity" }}
          >
            {/* Clickable Area to Close Sidebar */}
            <div
              className="hidden md:block w-[70%] h-full bg-transparent"
              onClick={toggleNavbar}
              aria-label="Close sidebar"
            />

            {/* Sidebar Menu */}
            <motion.div
              className="w-full md:w-[30%] h-full bg-white/80 backdrop-blur-sm flex flex-col justify-center items-start px-8 space-y-6"
              variants={sidebarVariants}
              style={{ willChange: "transform, opacity" }}
            >
              {/* Close Button */}
              <button
                onClick={toggleNavbar}
                className="absolute top-5 left-8 text-black text-5xl font-bold cursor-pointer"
                aria-label="Close navigation menu"
              >
                ×
              </button>

              {/* Nav Links */}
              <nav className="flex flex-col items-start space-y-4 text-black text-4xl">
                {navLinks.map((link, index) => {
                  const hasSubMenu = link.dropdown && link.dropdown.length > 0;

                  return (
                    <motion.div
                      key={link.name}
                      className="hover:text-gray-600 transition-colors duration-200"
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={linkVariants}
                      style={{ willChange: "transform, opacity" }}
                    >
                      {hasSubMenu ? (
                        <button
                          onClick={() => setActiveSubMenu(link.name)}
                          className="text-black text-left"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={toggleNavbar}
                          className="text-black"
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submenu Overlay */}
      <AnimatePresence>
        {isOpen && activeSubMenu && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-sm flex flex-col px-8 py-8"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <button
              onClick={() => setActiveSubMenu(null)}
              className="mb-8 text-4xl font-bold text-black flex items-center gap-2"
            >
              ← Back
            </button>

            {navLinks
              .find((link) => link.name === activeSubMenu)
              ?.dropdown?.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/use-cases/${item
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  onClick={toggleNavbar}
                  className="block text-4xl mb-4 text-black hover:text-gray-600 transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
