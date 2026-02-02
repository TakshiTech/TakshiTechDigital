'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/browser';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

type SeoEntry = {
    id: string;
    created_at: string;
    page_path: string;
    title: string | null;
    description: string | null;
    keywords: string[] | null;
    tags: string[] | null;
    section: string | null;
};

export default function AdminSeoListPage() {
    const router = useRouter();
    const [entries, setEntries] = useState<SeoEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState<SeoEntry | null>(null);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('seo_metadata')
            .select('*')
            .order('page_path', { ascending: true });

        if (error) {
            console.error('Error fetching SEO data:', error);
        } else {
            setEntries(data || []);
        }
        setLoading(false);
    };

    const openDeleteModal = (entry: SeoEntry) => {
        setEntryToDelete(entry);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setEntryToDelete(null);
    };

    const confirmDelete = async () => {
        if (!entryToDelete) return;
        setDeletingId(entryToDelete.id);
        const { error } = await supabase.from('seo_metadata').delete().eq('id', entryToDelete.id);
        if (error) {
            alert('Failed to delete: ' + error.message);
        } else {
            setEntries(entries.filter((e) => e.id !== entryToDelete.id));
        }
        setDeletingId(null);
        closeDeleteModal();
    };

    return (
        <div className="min-h-screen">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">SEO Management</h1>
                    <p className="mt-1 text-sm text-gray-400">Manage titles, meta descriptions, and keywords for your pages.</p>
                </div>
                <Link
                    href="/admin/seo/new"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:brightness-[1.08]"
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" /></svg>
                    Add New Page
                </Link>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-8 text-center text-gray-400">Loading...</div>
                ) : entries.length === 0 ? (
                    <div className="p-10 text-center text-gray-400">
                        No SEO entries found. Click user "Add New Page" to start.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-gray-800/50 text-gray-200 uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Page Path</th>
                                    <th className="px-6 py-3 font-medium">Title</th>
                                    <th className="px-6 py-3 font-medium">Description</th>
                                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {entries.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-800/30 transition">
                                        <td className="px-6 py-4 font-medium text-white">{entry.page_path}</td>
                                        <td className="px-6 py-4 max-w-[200px] truncate" title={entry.title || ''}>
                                            {entry.title || <span className="text-gray-600 italic">No title</span>}
                                        </td>
                                        <td className="px-6 py-4 max-w-[300px] truncate" title={entry.description || ''}>
                                            {entry.description || <span className="text-gray-600 italic">No description</span>}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/seo/${entry.id}`}
                                                    className="p-2 hover:text-white transition"
                                                    title="Edit"
                                                >
                                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.1 2.1 0 012.97 2.97L8.25 18.04 4 20l1.96-4.25 10.902-12.263z" /></svg>
                                                </Link>
                                                <button
                                                    onClick={() => openDeleteModal(entry)}
                                                    className="p-2 hover:text-rose-400 transition"
                                                    title="Delete"
                                                >
                                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0V5a2 2 0 012-2h2a2 2 0 012 2v2" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                isLoading={deletingId === entryToDelete?.id}
                title="Remove SEO Entry?"
                message={`Are you sure you want to remove SEO data for "${entryToDelete?.page_path}"? This will not delete the actual page.`}
            />
        </div>
    );
}
