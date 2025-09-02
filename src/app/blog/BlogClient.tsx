'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

type BlogRow = {
  id: number | string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  created_at: string | null;
};

const htmlToText = (html?: string | null, n = 130) => {
  const raw = (html || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return raw.length > n ? raw.slice(0, n) + '…' : raw;
};

const formatDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString() : '';

const MOCK_BLOGS: BlogRow[] = [
  {
    id: 'demo-1',
    title: 'Providing Brands with Online Growth Strategies',
    content:
      'In this post we explore practical growth tactics—SEO foundations, ad funnels, and content that compounds over time.',
    image_url: '/images/blogs/providing-brands-with-online-growth-strategies.webp',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    title: 'Social Ads: From First Click to Loyal Customer',
    content:
      'How to structure full-funnel social ad campaigns that convert and retain customers.',
    image_url: '/images/background6.webp',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'demo-3',
    title: 'SEO in 2025: What Actually Moves the Needle',
    content:
      'We separate trend from truth and share a 6-step checklist for sustainable organic growth.',
    image_url: '/images/background6.webp',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

export default function BlogClient() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(9);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      setLoading(true);
      setError(null);

      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        if (mounted) {
          setBlogs(MOCK_BLOGS); // or setBlogs([]) if you prefer empty
          setLoading(false);
        }
        return;
      }

      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(url, key);

        const { data, error } = await supabase
          .from('blogs')
          .select('id,title,content,image_url,created_at,status')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (!mounted) return;

        if (error) {
          console.error('Blogs query failed:', error?.message || error, error);
          setError(error.message || 'Failed to load blogs.');
          setBlogs([]);
        } else {
          setBlogs((data || []) as BlogRow[]);
        }
      } catch (e: any) {
        console.error('Supabase init/fetch failed:', e);
        if (mounted) {
          setError('Failed to load blogs.');
          setBlogs([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, []);

  const hero = blogs[0];
  const sidebar = blogs.slice(1, 3);

  return (
    <>
      <Navbar />

      {/* ====== HERO (unchanged) ====== */}
      <section className="w-full h-[100vh] relative overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/images/background6.webp')", filter: 'blur(3px)', transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-white/50" />
        <motion.div
          initial={{ y: '-150%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute text-center w-full"
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-black">BLOG</h1>
          <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-600">
            Your Digital Marketing Knowledge Hub
          </p>
        </motion.div>
      </section>

      {/* ====== Latest stories ====== */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl md:text-[28px] font-bold tracking-tight mb-6">
          Latest stories
        </h2>

        {/* Top row: big left card + right column of two small cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Big left card */}
          <div className="md:col-span-2">
            {loading ? (
              <div className="h-72 rounded-2xl bg-gray-200 animate-pulse" />
            ) : hero ? (
              <Link
                href={`/blog/${hero.id}`}
                className="group block overflow-hidden rounded-2xl border border-gray-200"
              >
                <div className="relative h-72 w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hero.image_url || '/images/blogs/providing-brands-with-online-growth-strategies.webp'}
                    alt={hero.title || 'Blog'}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {hero.title || 'Untitled'}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm">{htmlToText(hero.content, 150)}</p>
                  <div className="mt-3 text-xs text-gray-500">{formatDate(hero.created_at)}</div>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl border border-gray-200 p-6 text-gray-500">No posts.</div>
            )}
          </div>

          {/* Right column: two small cards */}
          <div className="space-y-6">
            {(loading ? Array.from({ length: 2 }) : sidebar).map((b, i) =>
              loading ? (
                <div key={i} className="h-36 rounded-2xl bg-gray-200 animate-pulse" />
              ) : (
                <Link
                  key={(b as BlogRow).id}
                  href={`/blog/${(b as BlogRow).id}`}
                  className="group grid grid-cols-3 gap-3 overflow-hidden rounded-2xl border border-gray-200 p-3"
                >
                  <div className="col-span-1 relative h-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={(b as BlogRow).image_url || '/images/blogs/providing-brands-with-online-growth-strategies.webp'}
                      alt={(b as BlogRow).title || 'Blog'}
                      className="absolute inset-0 h-full w-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-gray-500">{formatDate((b as BlogRow).created_at)}</div>
                    <h4 className="mt-1 text-[15px] font-semibold leading-snug text-gray-900 group-hover:underline">
                      {(b as BlogRow).title || 'Untitled'}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {htmlToText((b as BlogRow).content, 80)}
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>

        {/* Grid of more posts */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-gray-200 animate-pulse" />
              ))
            : blogs.slice(3, 3 + visible).map((b) => (
                <Link
                  key={b.id}
                  href={`/blog/${b.id}`}
                  className="group overflow-hidden rounded-2xl border border-gray-200 hover:shadow-md transition"
                >
                  <div className="relative h-40 w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.image_url || '/images/blogs/providing-brands-with-online-growth-strategies.webp'}
                      alt={b.title || 'Blog'}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-500">{formatDate(b.created_at)}</div>
                    <h5 className="mt-1 text-[15px] font-semibold text-gray-900 group-hover:underline">
                      {b.title || 'Untitled'}
                    </h5>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                      {htmlToText(b.content, 110)}
                    </p>
                  </div>
                </Link>
              ))}
        </div>

        {/* Load more */}
        {!loading && blogs.slice(3).length > visible && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisible((v) => v + 9)}
              className="rounded-full border border-gray-300 px-5 py-2 text-sm hover:bg-gray-50"
            >
              Load more
            </button>
          </div>
        )}
      </section>

      {/* ====== Footer (unchanged) ====== */}
      <div className="overflow-hidden py-4 mt-16">
        <div className="whitespace-nowrap animate-marquee text-4xl font-semibold text-gray-800">
          <span className="mx-7">✨ Blog ✨</span>
          <span className="mx-7">✨ Collect Feedback ✨</span>
          <span className="mx-7">✨ Showcase Roadmap ✨</span>
          <span className="mx-7">✨ Analyze Trends ✨</span>
          <span className="mx-7">✨ Showcase Roadmap ✨</span>
          <span className="mx-7">✨ Blog ✨</span>
        </div>
      </div>

      <Footer />
    </>
  );
}
