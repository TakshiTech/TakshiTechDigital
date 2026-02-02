'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/browser'; // ensure you have this client
import toast from 'react-hot-toast';

type Lead = {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string | null;
    message: string | null;
    source: string;
    page_path: string;
    status: string;
};

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching leads:', error);
            toast.error('Failed to load leads');
        } else {
            setLeads(data || []);
        }
        setLoading(false);
    };

    const updateStatus = async (id: string, newStatus: string) => {
        setStatusUpdating(id);
        const { error } = await supabase
            .from('leads')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            toast.error('Failed to update status');
        } else {
            setLeads((prev) =>
                prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
            );
            toast.success('Status updated');
        }
        setStatusUpdating(null);
    };

    const deleteLead = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;
        const { error } = await supabase.from('leads').delete().eq('id', id);
        if (error) {
            toast.error('Failed to delete lead');
        } else {
            setLeads((prev) => prev.filter((l) => l.id !== id));
            toast.success('Lead deleted');
        }
    };

    const formatDate = (iso: string) => new Date(iso).toLocaleString();

    return (
        <div className="min-h-screen text-gray-100">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Leads</h1>
                    <p className="mt-1 text-sm text-gray-400">View and manage form submissions.</p>
                </div>
                <button
                    onClick={fetchLeads}
                    className="rounded-xl border border-white/10 p-2 hover:bg-white/10 transition"
                    title="Refresh"
                >
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-8 text-center text-gray-400">Loading leads...</div>
                ) : leads.length === 0 ? (
                    <div className="p-10 text-center text-gray-400">
                        No leads found yet.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-gray-800/50 text-gray-200 uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Date/Source</th>
                                    <th className="px-6 py-3 font-medium">Contact</th>
                                    <th className="px-6 py-3 font-medium">Message</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-800/30 transition group">
                                        <td className="px-6 py-4 align-top">
                                            <div className="text-white font-medium">{formatDate(lead.created_at)}</div>
                                            <div className="text-xs text-indigo-400 mt-1">{lead.source}</div>
                                            <div className="text-[10px] text-gray-500 font-mono mt-0.5">{lead.page_path}</div>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <div className="text-white">{lead.name}</div>
                                            <a href={`mailto:${lead.email}`} className="text-xs text-gray-400 hover:text-blue-400 block mt-1">
                                                {lead.email}
                                            </a>
                                            {lead.phone && (
                                                <a href={`tel:${lead.phone}`} className="text-xs text-gray-400 hover:text-blue-400 block mt-0.5">
                                                    {lead.phone}
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 align-top max-w-[300px]">
                                            <p className="line-clamp-3 whitespace-pre-wrap">{lead.message || '-'}</p>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                disabled={statusUpdating === lead.id}
                                                className={`rounded-lg bg-gray-900 border border-gray-700 text-xs px-2 py-1 outline-none focus:border-indigo-500
                          ${lead.status === 'new' ? 'text-blue-400 border-blue-900/50' : ''}
                          ${lead.status === 'contacted' ? 'text-amber-400 border-amber-900/50' : ''}
                          ${lead.status === 'closed' ? 'text-green-400 border-green-900/50' : ''}
                        `}
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="closed">Closed</option>
                                                <option value="spam">Spam</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 align-top text-right">
                                            <button
                                                onClick={() => deleteLead(lead.id)}
                                                className="text-gray-600 hover:text-rose-500 transition p-1"
                                                title="Delete"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0V5a2 2 0 012-2h2a2 2 0 012 2v2" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
