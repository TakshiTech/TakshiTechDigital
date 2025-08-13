'use client';
import React, { useState } from 'react';
import { FloatingNav } from '../ui/floating-navbar';
import {
  IconBriefcase,
  IconBrowser,
  IconHome,
  IconMoneybag,
  IconUser,
  IconWorldHeart,
  IconChevronDown,
} from '@tabler/icons-react';

const FloatNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: 'About',
      link: '/about',
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: 'Services',
      link: '/services',
      icon: (
        <IconBriefcase className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: 'Portfolio',
      link: '/portfolio',
      icon: (
        <IconWorldHeart className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: 'Pricing',
      link: '/pricing',
      icon: (
        <IconMoneybag className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: 'Blog',
      link: '/blog',
      icon: (
        <IconBrowser className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: 'Use Cases',
      link: '/use-cases',
      icon: <IconBriefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
      dropdown: true,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav
        navItems={navItems}
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
      />
      <DummyContent />
    </div>
  );
};

const DummyContent = () => {
  return (
    <div className="inset-0 absolute bg-grid-black/[0.1] dark:bg-grid-white/[0.2]" />
  );
};

export default FloatNavbar;
