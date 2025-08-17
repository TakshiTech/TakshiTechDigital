'use client';

import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroVideoSection from './HeroVideoSection';

const SmoothScrollHero = () => {
  const { scrollY } = useScroll();
  const SECTION_HEIGHT = 100;
  const [heroHeight, setHeroHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHeroHeight(SECTION_HEIGHT + window.innerHeight);
    }
  }, []);

  const navOpacity = useTransform(
    scrollY,
    heroHeight ? [0, heroHeight - 10, heroHeight] : [0, 1, 1],
    heroHeight ? [1, 1, 0] : [1, 1, 1]
  );

  return (
    <div className="bg-green-50">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Nav navOpacity={navOpacity} />
        <HeroVideoSection />
      </ReactLenis>
    </div>
  );
};

const Nav: React.FC<{ navOpacity: any }> = ({ navOpacity }) => {
  return (
    <motion.nav
      style={{
        opacity: navOpacity,
        pointerEvents: navOpacity ? 'auto' : 'none',
      }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 text-white transition-opacity duration-300"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" passHref>
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-10 md:h-20 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Contact Button */}
      <Link href="/contact" passHref>
        <button className="flex items-center gap-1 text-xs md:text-sm text-white">
          CONTACT US <FiArrowRight />
        </button>
      </Link>
    </motion.nav>
  );
};

export default SmoothScrollHero;
