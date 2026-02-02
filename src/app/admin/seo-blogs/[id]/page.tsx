'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/browser';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function BlogSeoEditPage() {
    const router = useRouter();
    const params = useParams();
    const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Context data (The Blog Post)
    const [blog, setBlog] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        keywords: '',
        tags: '',
        section: 'Blog',
    });

    useEffect(() => {
        if (id) {
            loadData(id);
        }
    }, [id]);

    const loadData = async (blogId: string) => {
        setLoading(true);

        // 1. Fetch Blog
        const { data: blogData, error: blogError } = await supabase
            .from('blogs')
            .select('*')
            .eq('id', blogId)
            .single();

        if (blogError || !blogData) {
            toast.error('Blog not found');
            router.push('/admin/seo-blogs');
            return;
        }
        setBlog(blogData);

        // 2. Fetch Existing SEO
        const pagePath = `/blog/${blogId}`;
        const { data: seoData, error: seoError } = await supabase
            .from('seo_metadata')
            .select('*')
            .eq('page_path', pagePath)
            .maybeSingle();

        if (seoData) {
            setFormData({
                title: seoData.title || '',
                description: seoData.description || '',
                keywords: (seoData.keywords || []).join(', '),
                tags: (seoData.tags || []).join(', '),
                section: seoData.section || 'Blog',
            });
        } else {
            // Pre-fill defaults from blog
            // Strip HTML from content for description
            const contentText = blogData.content
                ? blogData.content.replace(/<[^>]*>/g, '').substring(0, 160)
                : '';

            setFormData({
                title: blogData.title || '',
                description: contentText,
                keywords: '',
                tags: '',
                section: 'Blog',
            });
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const pagePath = `/blog/${blog.id}`;

        const payload = {
            page_path: pagePath,
            title: formData.title.trim(),
            description: formData.description.trim(),
            keywords: formData.keywords.split(',').map((s) => s.trim()).filter(Boolean),
            tags: formData.tags.split(',').map((s) => s.trim()).filter(Boolean),
            section: formData.section.trim(),
        };

        try {
            // Upsert based on page_path
            const { error } = await supabase
                .from('seo_metadata')
                .upsert(payload, { onConflict: 'page_path' });

            if (error) throw error;
            toast.success('Blog SEO updated');
            router.push('/admin/seo-blogs');
            router.refresh();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center text-white">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto py-6">
            <header className="mb-8 flex items-start gap-6">
                {blog?.image_url && (
                    <div className="w-24 h-24 relative rounded-xl overflow-hidden shadow-lg border border-white/10 shrink-0 hidden sm:block">
                        <Image src={blog.image_url} alt="" fill className="object-cover" />
                    </div>
                )}
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                        Edit SEO: <span className="text-gray-400">{blog?.title}</span>
                    </h1>
                    <p className="text-sm text-gray-400 font-mono bg-gray-900/50 px-2 py-1 rounded inline-block border border-white/5">
                        Path: /blog/{blog?.id}
                    </p>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Meta Title
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                        />
                        <div className="mt-1 flex justify-between text-xs text-gray-500">
                            <span>Recommended: 60 chars</span>
                            <span className={formData.title.length > 60 ? 'text-amber-500' : ''}>{formData.title.length} chars</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Meta Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                        />
                        <div className="mt-1 flex justify-between text-xs text-gray-500">
                            <span>Recommended: 160 chars</span>
                            <span className={formData.description.length > 160 ? 'text-amber-500' : ''}>{formData.description.length} chars</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
                        {/* Keywords */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Keywords
                            </label>
                            <textarea
                                name="keywords"
                                value={formData.keywords}
                                onChange={handleChange}
                                rows={3}
                                placeholder="comma, separated"
                                className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-2 text-white text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Tags
                            </label>
                            <input
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-2 text-white text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                            />
                        </div>

                        {/* Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Section
                            </label>
                            <input
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-2 text-white text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {saving ? 'Saving...' : 'Save Configuration'}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-6 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
}
