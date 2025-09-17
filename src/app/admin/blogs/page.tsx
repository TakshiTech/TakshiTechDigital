'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { supabase } from '@/lib/supabase/browser'; // <-- change if your path is different
import { Tables } from '@/types/supabase';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

// import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal'; // if you already have it

// ------- (Optional) Tiny inline modal if you don't have one -------
// const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, isLoading }: any) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 grid place-items-center bg-black/60">
//       <div className="w-full max-w-md rounded-2xl bg-gray-900 p-6 shadow-lg ring-1 ring-gray-800">
//         <h3 className="text-lg font-semibold">Delete this blog?</h3>
//         <p className="mt-2 text-sm text-gray-400">This action cannot be undone.</p>
//         <div className="mt-6 flex justify-end gap-2">
//           <button onClick={onClose} className="rounded-xl border border-gray-700 px-4 py-2 text-sm">Cancel</button>
//           <button onClick={onConfirm} disabled={isLoading} className="rounded-xl bg-rose-700 px-4 py-2 text-sm text-white">
//             {isLoading ? 'Deleting…' : 'Delete'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// ------------------------------------------------------------------

type Blog = Tables<'blogs'>;
const PAGE_SIZE = 9;

function Icon({ name, className }: { name: 'search' | 'plus' | 'calendar' | 'edit' | 'trash'; className?: string }) {
  switch (name) {
    case 'search':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
        </svg>
      );
    case 'plus':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" />
        </svg>
      );
    case 'calendar':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'edit':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.1 2.1 0 012.97 2.97L8.25 18.04 4 20l1.96-4.25 10.902-12.263z" />
        </svg>
      );
    case 'trash':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0V5a2 2 0 012-2h2a2 2 0 012 2v2" />
        </svg>
      );
  }
}

function Badge({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'success' | 'warn' | 'default' }) {
  const base = 'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset';
  const map = {
    success: 'bg-green-900/40 text-green-300 ring-green-700',
    warn: 'bg-amber-900/40 text-amber-300 ring-amber-700',
    default: 'bg-gray-800 text-gray-300 ring-gray-700',
  };
  return <span className={`${base} ${map[tone]}`}>{children}</span>;
}

function Button({ children, className = '', variant = 'primary', ...props }: any) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[.98] disabled:opacity-50 disabled:cursor-not-allowed';
  const map: Record<string, string> = {
    primary:
      'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm hover:brightness-[1.08] focus:outline-none focus:ring-2 focus:ring-blue-500/40',
    soft: 'bg-gray-800 text-gray-200 ring-1 ring-inset ring-gray-700 hover:bg-gray-700',
    outline: 'bg-gray-900 text-gray-200 ring-1 ring-inset ring-gray-700 hover:bg-gray-800',
    danger: 'bg-rose-700 text-white hover:brightness-110',
  };
  return (
    <button className={`${base} ${map[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default function AdminBlogListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = (searchParams?.get('q') ?? '').trim();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / PAGE_SIZE)), [total]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // who am I?
      const { data: auth } = await supabase.auth.getUser();
      const me = auth?.user || null;
      setCurrentUserId(me?.id ?? null);
      setIsAdmin(((me?.app_metadata as any)?.role === 'admin') || false);

      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (q) {
        query = query.or(`title.ilike.%${q}%,content.ilike.%${q}%`);
      }

      const { data, count, error } = await query;
      if (error) {
        console.error(error);
        setBlogs([]);
        setTotal(0);
      } else {
        setBlogs((data as Blog[]) || []);
        setTotal(count ?? 0);
      }
      setLoading(false);
    };

    load();
  }, [page, q]);

  const formatDate = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString() : '');
  const htmlToText = (html?: string | null) =>
    (html || '').replace(/<[^>]*>/g, '').replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
  const excerpt = (html?: string | null, n = 150) => {
    const t = htmlToText(html);
    return t.length > n ? t.slice(0, n) + '…' : t;
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setQuery = (term: string) => {
    const sp = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : []);
    if (term) sp.set('q', term);
    else sp.delete('q');
    router.replace(`/admin/blogs?${sp.toString()}`);
    setPage(1);
  };

  const openDeleteModal = (blog: Blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    const id = blogToDelete.id;
    setDeletingId(id);

    const prev = blogs;
    setBlogs((b) => b.filter((x) => x.id !== id));

    try {
      const { data, error } = await supabase.from('blogs').delete().filter('id', 'eq', String(id)).select('id');
      if (error) throw error;
      if (!data || data.length === 0) throw new Error('No row deleted — RLS blocked or wrong id');

      setTotal((t) => Math.max(0, t - 1));
      if (prev.length === 1 && page > 1) setPage((p) => p - 1);
    } catch (e: any) {
      console.error('Delete failed:', e);
      alert('Delete failed: ' + e.message);
      setBlogs(prev); // rollback
    } finally {
      setDeletingId(null);
      closeDeleteModal();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">📚 All Blogs</h1>
            <p className="mt-1 text-sm text-gray-400">Create, edit &amp; manage your posts.</p>
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                value={q}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title or content…"
                className="w-full rounded-xl border border-gray-700 bg-gray-800 px-10 py-2.5 text-sm text-gray-100 shadow-sm outline-none transition placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/40"
                aria-label="Search blogs"
              />
            </div>

            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:brightness-[1.08] focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <Icon name="plus" className="h-4 w-4" /> Add Blog
            </Link>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-gray-800 bg-gray-900 shadow-sm">
                <div className="h-40 w-full rounded-t-2xl bg-gray-800" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-3/4 rounded bg-gray-800" />
                  <div className="h-3 w-1/2 rounded bg-gray-800" />
                  <div className="h-3 w-full rounded bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-900/70 p-10 text-center">
            <p className="text-gray-300">No blogs found.</p>
            <Link
              href="/admin/blogs/new"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:brightness-[1.08]"
            >
              <Icon name="plus" className="h-4 w-4" /> Add your first blog
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => {
                const owner = blog.user_id === currentUserId;
                const isPublished = blog.status === 'published';
                return (
                  <article
                    key={blog.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-sm transition hover:shadow-md hover:bg-gray-900/70"
                  >
                    {/* Image */}
                    {blog.image_url ? (
                      <div className="relative h-40 w-full">
                        <Image src={blog.image_url} alt={blog.title || 'Blog Image'} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center bg-gray-800 text-gray-500">No image</div>
                    )}

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge tone={isPublished ? 'success' : 'warn'}>
                          <span className={`text-[10px] ${isPublished ? 'text-green-400' : 'text-amber-400'}`}>●</span>
                          {isPublished ? 'Published' : 'Draft'}
                        </Badge>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                          <Icon name="calendar" className="h-4 w-4" /> {formatDate((blog as any).created_at)}
                        </span>
                      </div>

                      <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-gray-100 group-hover:underline">
                        {blog.title}
                      </h2>

                      <p className="mt-2 line-clamp-3 text-sm text-gray-300/80">{excerpt(blog.content, 150)}</p>

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-2">
                        <Link
                          href={`/admin/blogs/${blog.id}`}
                          className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
                            owner || isAdmin
                              ? 'border-gray-700 text-gray-200 hover:bg-gray-800'
                              : 'pointer-events-none cursor-not-allowed border-gray-700 text-gray-500 opacity-60'
                          }`}
                          title={owner || isAdmin ? 'Edit' : 'Only author or admin can edit'}
                          aria-disabled={!(owner || isAdmin)}
                        >
                          <Icon name="edit" className="h-4 w-4" /> Edit
                        </Link>

                        <button
                          onClick={() => (owner || isAdmin) ? openDeleteModal(blog) : null}
                          disabled={deletingId === blog.id || !(owner || isAdmin)}
                          className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
                            owner || isAdmin
                              ? 'border-rose-900/60 text-rose-300 hover:bg-rose-950/40'
                              : 'cursor-not-allowed border-gray-700 text-gray-500 opacity-60'
                          }`}
                          title={owner || isAdmin ? 'Delete' : 'Only author or admin can delete'}
                          aria-disabled={!(owner || isAdmin)}
                        >
                          <Icon name="trash" className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button variant="outline" onClick={() => goToPage(page - 1)} disabled={page <= 1}>
                ← Prev
              </Button>
              <span className="text-sm text-gray-400">Page {page} of {totalPages}</span>
              <Button variant="outline" onClick={() => goToPage(page + 1)} disabled={page >= totalPages}>
                Next →
              </Button>
            </div>
          </>
        )}

        {/* Delete modal */}
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          isLoading={deletingId === blogToDelete?.id}
        />
      </div>
    </div>
  );
}
