'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/browser';
import { Tables } from '@/types/supabase';
import { CheckCircle2, XCircle, Search, Edit } from 'lucide-react';

type Blog = Tables<'blogs'>;
type SeoMetadata = Tables<'seo_metadata'>;

type BlogWithSeo = Blog & {
    seo?: SeoMetadata | null;
};

export default function BlogSeoListPage() {
    const [blogs, setBlogs] = useState<BlogWithSeo[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);

            // 1. Fetch Blogs
            const { data: blogsData, error: blogsError } = await supabase
                .from('blogs')
                .select('*')
                .order('created_at', { ascending: false });

            if (blogsError) {
                console.error('Error fetching blogs:', blogsError);
                setLoading(false);
                return;
            }

            // 2. Fetch SEO Metadata for these blogs
            // We look for page_path starting with "/blog/"
            // A more robust way: fetch all SEO entries where page_path IN list of "/blog/{id}"
            // But for simplicity, let's just fetch all SEO entries for blogs?
            // Or just fetching by page_path match. 
            // Supabase 'in' filter is good.

            const blogPaths = blogsData.map(b => `/blog/${b.id}`);

            const { data: seoData, error: seoError } = await supabase
                .from('seo_metadata' as any)
                .select('*')
                .in('page_path', blogPaths);

            if (seoError) {
                console.error('Error fetching SEO:', seoError);
            }

            // 3. Merge
            const merged: BlogWithSeo[] = blogsData.map(blog => {
                const seo = (seoData as any[])?.find(s => s.page_path === `/blog/${blog.id}`) || null;
                return { ...blog, seo };
            });

            setBlogs(merged);
            setLoading(false);
        };

        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter(b =>
        b.title?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">SEO of Blogs</h1>
                    <p className="text-gray-400">Manage Search Engine Optimization for your blog posts.</p>
                </header>

                {/* Search */}
                <div className="mb-6 relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2 pl-10 pr-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                </div>

                {/* List */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading blogs...</div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No blogs found.</div>
                ) : (
                    <div className="space-y-4">
                        {filteredBlogs.map(blog => {
                            const hasSeo = !!blog.seo;
                            // Check if critical fields are filled
                            const isComplete = hasSeo && blog.seo?.title && blog.seo?.description;

                            return (
                                <div key={blog.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 hover:bg-gray-900 transition">
                                    {/* Image */}
                                    <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                                        {blog.image_url ? (
                                            <Image src={blog.image_url} alt="" fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Img</div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0 text-center md:text-left">
                                        <h3 className="text-lg font-semibold text-white truncate">{blog.title || 'Untitled Blog'}</h3>
                                        <p className="text-xs text-gray-500">Path: <code className="bg-gray-800 px-1 py-0.5 rounded text-blue-400">/blog/{blog.id}</code></p>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center gap-6">
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${isComplete ? 'bg-green-900/20 border-green-800 text-green-400' : 'bg-amber-900/20 border-amber-800 text-amber-400'}`}>
                                            {isComplete ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                            {isComplete ? 'Optimized' : 'Missing / Incomplete'}
                                        </div>

                                        <Link
                                            href={`/admin/seo-blogs/${blog.id}`}
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit SEO
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
