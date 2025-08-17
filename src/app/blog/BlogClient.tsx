'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { allBlogs } from '../../../data/blogs';

const BlogClient: React.FC = () => {
  const categories = [
    { name: 'Digital Marketing', color: 'bg-gradient-to-tr from-blue-300 to-purple-400' },
    { name: 'Marketing', color: 'bg-gradient-to-tr from-pink-300 to-purple-300' },
    { name: 'Technology', color: 'bg-gradient-to-tr from-orange-300 to-red-400' },
  ];

  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter blogs based on the selected category
  const filteredBlogs = selectedCategory
    ? allBlogs.filter(blog => blog.tag.toLowerCase() === selectedCategory.toLowerCase())
    : allBlogs;

  // Featured blogs (first 3 from filteredBlogs)
  const featuredBlogs = filteredBlogs.slice(0, 3);

  // Recent blogs (remaining from filteredBlogs)
  const recentBlogs = filteredBlogs.slice(3);

  return (
    <>
      <Navbar />

      {/* Hero */}
       <section
              className="w-full h-[100vh] relative overflow-hidden flex items-center justify-center"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/background6.webp')",
                  filter: "blur(3px)",
                  transform: "scale(1.1)", // prevents edges from showing when blurred
                }}
              ></div>
      
              {/* Overlay color for readability (optional) */}
              <div className="absolute inset-0 bg-white/50"></div>
      
              {/* Content */}
              <motion.div
                initial={{ y: "-150%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute text-center w-full"
              >
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-black">
                  BLOG
                </h1>
                <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-600">
                   Your Digital Marketing Knowledge Hub
                </p>
              </motion.div>
            </section>


      {/* Blog Intro */}
      <section className="text-center py-20 px-6">
        <h2 className="text-sm uppercase text-purple-600 font-semibold tracking-wide">
          Blogs
        </h2>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mt-4">
          Explore Takshi Tech Digital Blogs
        </h1>
      </section>

      {/* Categories with Filter */}
      <div className="flex justify-center flex-wrap gap-4 px-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-xl text-gray-800 font-medium px-6 py-3 bg-gray-200 shadow-md hover:scale-105 transition-transform ${
            selectedCategory === null ? 'ring-2 ring-offset-2 ring-gray-300' : ''
          }`}
        >
          All Blogs
        </button>
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat.name)}
            className={`rounded-xl text-white font-medium px-6 py-3 ${cat.color} shadow-md hover:scale-105 transition-transform ${
              selectedCategory === cat.name ? 'ring-2 ring-offset-2 ring-gray-300' : ''
            }`}
          >
            {cat.name}
          </button>
        ))}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="rounded-xl text-gray-800 font-medium px-6 py-3 bg-gray-200 shadow-md hover:scale-105 transition-transform"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Featured Blogs */}
      <section className="mt-16 px-6 max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold mb-6">Featured Blogs</h3>
        {featuredBlogs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {featuredBlogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <p className="text-xs text-purple-600 mb-1">
                  {blog.tag} — {blog.date}
                </p>
                <Link href={`/blog/${blog.slug}`}>
                  <h4 className="text-md font-bold text-purple-700 hover:underline cursor-pointer">
                    {blog.title}
                  </h4>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No featured blogs available for this category.</p>
        )}
      </section>

      {/* Recent Blog Grid */}
      <section className="mt-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-6">Recent Posts</h3>

        {recentBlogs.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={recentBlogs[0]?.image || "images/blogs/providing-brands-with-online-growth-strategies.webp"}
                  alt="Main Blog"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs text-purple-600 mb-1">
                  {recentBlogs[0]?.tag} — {recentBlogs[0]?.date}
                </p>
                <Link href={`/blog/${recentBlogs[0]?.slug}`}>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 hover:underline">
                    {recentBlogs[0]?.title}
                  </h4>
                </Link>
                <p className="text-sm text-gray-600 mb-2">
                  {recentBlogs[0]?.subtitle}
                </p>
                <Link href={`/blog/${recentBlogs[0]?.slug}`}>
                  <span className="text-purple-600 hover:underline text-sm font-medium">
                    Read More →
                  </span>
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
              {recentBlogs.slice(1).map((blog, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">
                      {blog.tag} — {blog.date}
                    </p>
                    <Link href={`/blog/${blog.slug}`}>
                      <h4 className="text-md font-bold text-gray-900 mb-2 hover:underline">
                        {blog.title}
                      </h4>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{blog.subtitle}</p>
                    <Link href={`/blog/${blog.slug}`}>
                      <span className="text-purple-600 hover:underline text-sm font-medium">
                        Read More →
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-600">No recent posts available for this category.</p>
        )}
      </section>

      {/* Marquee */}
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
};

export default BlogClient;