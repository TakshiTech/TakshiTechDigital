'use client';
import React, { JSX, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";

// Define types for the navigation items and FloatingNav props
interface NavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
  dropdown?: boolean;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
  dropdownOpen: boolean;
  toggleDropdown: () => void;
}

export const FloatingNav = ({
  navItems,
  className,
  dropdownOpen,
  toggleDropdown,
}: FloatingNavProps) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <div
            key={`link=${idx}`}
            className="relative"
            onMouseEnter={() => navItem.dropdown && setHovered(true)}
            onMouseLeave={() => navItem.dropdown && setHovered(false)}
          >
            <a
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
              {navItem.dropdown && (
                <IconChevronDown className="h-4 w-4 ml-1 text-neutral-500 dark:text-white" />
              )}
            </a>
            {navItem.dropdown && hovered && (
              <div
                className="absolute left-0 mt-0 w-48 bg-white dark:bg-black rounded-lg shadow-lg border border-neutral-200 dark:border-white/[0.2]"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <ul>
                  <li>
                    <Link
                      href="/use-cases/healthcare"
                      className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      HealthCare
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/use-cases/education"
                      className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      Education
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/use-cases/real-estate"
                      className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      Real Estate
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/use-cases/retailers"
                      className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      Retailers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/use-cases/interior-designers"
                      className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      Interior Designers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/use-cases/b2b"
                      className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      B2B
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}

        <Link href="/contact" passHref>
          <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full cursor-pointer">
            <span>Contact</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};