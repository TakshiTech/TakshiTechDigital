'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/browser';
import toast from 'react-hot-toast';

export default function SeoEditPage() {
    const router = useRouter();
    const params = useParams();
    // Ensure id is a string (handle array case if catch-all, though [id] is usually string)
    const idRaw = params?.id;
    const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;

    const isNew = id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        page_path: '',
        title: '',
        description: '',
        keywords: '', // stored as string, split by comma
        tags: '',     // stored as string, split by comma
        section: '',
    });

    useEffect(() => {
        if (!isNew && id) {
            loadEntry(id);
        }
    }, [id, isNew]);

    const loadEntry = async (entryId: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('seo_metadata')
            .select('*')
            .eq('id', entryId)
            .single();

        if (error) {
            toast.error('Failed to load entry');
            router.push('/admin/seo');
        } else if (data) {
            setFormData({
                page_path: data.page_path || '',
                title: data.title || '',
                description: data.description || '',
                keywords: (data.keywords || []).join(', '),
                tags: (data.tags || []).join(', '),
                section: data.section || '',
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

        const payload = {
            page_path: formData.page_path.trim(),
            title: formData.title.trim(),
            description: formData.description.trim(),
            keywords: formData.keywords.split(',').map((s) => s.trim()).filter(Boolean),
            tags: formData.tags.split(',').map((s) => s.trim()).filter(Boolean),
            section: formData.section.trim(),
        };

        if (!payload.page_path) {
            toast.error('Page Path is required (e.g., /about)');
            setSaving(false);
            return;
        }

        try {
            if (isNew) {
                // Insert
                const { error } = await supabase.from('seo_metadata').insert([payload]);
                if (error) throw error;
                toast.success('SEO Entry created');
            } else {
                // Update
                const { error } = await supabase
                    .from('seo_metadata')
                    .update(payload)
                    .eq('id', id);
                if (error) throw error;
                toast.success('SEO Entry updated');
            }
            router.push('/admin/seo');
            router.refresh();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-10 text-center text-white">Loading...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto py-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {isNew ? 'New SEO Entry' : 'Edit SEO Entry'}
                    </h1>
                    <p className="text-sm text-gray-400">
                        {isNew ? 'Register SEO metadata for a page.' : `Editing metadata for ${formData.page_path}`}
                    </p>
                </div>
                <button
                    onClick={() => router.back()}
                    type="button"
                    className="text-sm text-gray-400 hover:text-white transition"
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">

                {/* Page Path */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Page Path (Slug) <span className="text-rose-500">*</span>
                    </label>
                    <input
                        name="page_path"
                        value={formData.page_path}
                        onChange={handleChange}
                        placeholder="/about"
                        className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        The URL path this metadata applies to. Must be unique. Edit with caution.
                    </p>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Meta Title
                    </label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="My Page Title | Takshi Tech"
                        className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                    />
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                        <span>Recommended limit: 60 chars</span>
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
                        rows={3}
                        placeholder="A brief summary of the page content..."
                        className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                    />
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                        <span>Recommended limit: 160 chars</span>
                        <span className={formData.description.length > 160 ? 'text-amber-500' : ''}>{formData.description.length} chars</span>
                    </div>
                </div>

                {/* Keywords */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Keywords
                    </label>
                    <input
                        name="keywords"
                        value={formData.keywords}
                        onChange={handleChange}
                        placeholder="react, nextjs, seo, marketing"
                        className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                    />
                    <p className="mt-1 text-xs text-gray-500">Comma separated.</p>
                </div>

                {/* Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Tags
                        </label>
                        <input
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="tech, tutorial"
                            className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                        />
                        <p className="mt-1 text-xs text-gray-500">Comma separated.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Section
                        </label>
                        <input
                            name="section"
                            value={formData.section}
                            onChange={handleChange}
                            placeholder="Blog"
                            className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-xl px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

            </form>
        </div>
    );
}
