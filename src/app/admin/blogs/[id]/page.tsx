'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';

import { updateBlogAction, deleteBlogAction } from '../actions';
import { supabase } from '@/lib/supabase/browser';
import { Tables } from '@/types/supabase';

type Blog = Tables<'blogs'>;
type Status = 'published' | 'draft';

const JoditEditorClient = dynamic(() => import('@/components/admin/JoditEditorClient'), { ssr: false });

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? 'Saving…' : 'Save Changes'}
    </button>
  );
}

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const id = decodeURIComponent(params.id);

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  // form state
  const [title, setTitle] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [status, setStatus] = useState<Status>('draft');
  const [contentHTML, setContentHTML] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [canEdit, setCanEdit] = useState(true);

  const titleCount = seoTitle.length;
  const descCount = seoDescription.length;
  const slugPreview = useMemo(() => slugify(title || id), [title, id]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single<Blog>();

      if (error || !data) {
        console.error('Failed to load blog', error);
        if (mounted) {
          setBlog(null);
          setCanEdit(false);
          setLoading(false);
        }
        return;
      }

      if (!mounted) return;
      setBlog(data);
      setTitle(data.title || '');
      setSeoTitle(data.seo_title || data.title || '');
      setSeoDescription(data.seo_description || '');
      setSeoKeywords((data.seo_keywords || []).join(', '));
      setStatus((data.status as Status) || 'draft');
      setContentHTML((data as any).content_html || '');
      setImageUrl((data as any).image_url || null);

      const { data: auth } = await supabase.auth.getUser();
      const me = auth?.user || null;
      const isAdmin = ((me?.app_metadata as any)?.role === 'admin') || false;
      setCanEdit(isAdmin || !data.user_id || data.user_id === me?.id);

      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  const onDelete = async () => {
    if (!blog) return;
    const ok = window.confirm('Delete this blog? This action cannot be undone.');
    if (!ok) return;
    try {
      await deleteBlogAction(String(blog.id));
      // server action will redirect to /admin/blogs
    } catch (e: any) {
      alert('Delete failed: ' + (e?.message || 'Unknown error'));
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-300">Loading…</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg dark:bg-slate-900">
        <Link href="/admin/blogs" className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-slate-300">
          ← Back to Blogs
        </Link>
        <h1 className="text-2xl font-semibold text-red-600">Blog not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg dark:bg-slate-900">
      {/* Back + Delete */}
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/blogs" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-slate-300">
          ← Back to Blogs
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={onDelete}
            className="rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white hover:brightness-110"
          >
            Delete
          </button>
        </div>
      </div>

      <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">🛠 Edit Blog</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-slate-400">
        Editing: <span className="font-mono">{id}</span> &nbsp;|&nbsp; New slug preview: <span className="font-mono">{slugPreview}</span>
      </p>

      {/* No encType/method with Server Actions */}
      <form action={updateBlogAction} className="space-y-6">
        {/* send id to action (we avoid .bind entirely) */}
        <input type="hidden" name="id" value={id} />

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!canEdit}
          className="w-full border-b-2 border-gray-300 pb-2 text-2xl font-semibold focus:border-blue-600 focus:outline-none
                     text-slate-900 placeholder-slate-400
                     dark:text-slate-100 dark:placeholder-slate-500 dark:border-slate-700"
        />

        {/* Current Cover + Replace */}
        <div className="flex items-start gap-4">
          <div className="w-40 shrink-0">
            <div className="mb-1 text-xs text-gray-500 dark:text-slate-400">Current cover</div>
            <div className="relative h-24 w-40 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
              {imageUrl ? (
                <Image src={imageUrl} alt="Cover" fill className="object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-xs text-slate-500">None</div>
              )}
            </div>
          </div>

          <div className="grow">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Replace cover (optional)
            </label>
            <input
              type="file"
              name="cover"
              accept="image/*"
              disabled={!canEdit}
              className="mt-1 block w-full text-sm text-gray-700
                         file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700 hover:file:bg-blue-100
                         dark:text-slate-200 dark:file:bg-slate-800 dark:file:text-slate-100 dark:hover:file:bg-slate-700"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">Max 4MB. JPG/PNG/WebP recommended.</p>
          </div>
        </div>

        {/* SEO */}
        <div className="rounded-lg border bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">🔎 SEO</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              SEO Title <span className="text-gray-500 dark:text-slate-400">({titleCount}/60)</span>
            </label>
            <input
              type="text"
              name="seo_title"
              placeholder="Up to ~60 characters"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              disabled={!canEdit}
              className="mt-1 w-full rounded border px-3 py-2 focus:outline-none
                         text-slate-900 placeholder-slate-400 border-gray-300
                         dark:text-slate-100 dark:placeholder-slate-500 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Meta Description{' '}
              <span className={descCount > 160 ? 'text-red-600' : 'text-gray-500 dark:text-slate-400'}>
                ({descCount}/160)
              </span>
            </label>
            <textarea
              name="seo_description"
              placeholder="Concise summary for search results (up to ~160 chars)"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              disabled={!canEdit}
              className="mt-1 w-full rounded border px-3 py-2 focus:outline-none
                         text-slate-900 placeholder-slate-400 border-gray-300
                         dark:text-slate-100 dark:placeholder-slate-500 dark:border-slate-700 dark:bg-slate-900"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Keywords (comma separated)
            </label>
            <input
              type="text"
              name="seo_keywords"
              placeholder="e.g. nextjs, supabase, seo tips"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              disabled={!canEdit}
              className="mt-1 w-full rounded border px-3 py-2 focus:outline-none
                         text-slate-900 placeholder-slate-400 border-gray-300
                         dark:text-slate-100 dark:placeholder-slate-500 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
            Content (HTML via Jodit)
          </label>

          <JoditEditorClient
            initialValue={contentHTML}
            onChangeHTML={(html) => setContentHTML(html)}
            theme="dark"
          />

          <input type="hidden" name="content_html" value={contentHTML} />
        </div>

        {/* Status */}
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          disabled={!canEdit}
          className="w-full rounded border px-3 py-2 focus:outline-none
                     text-slate-900 border-gray-300
                     dark:text-slate-100 dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {/* slug hint for server to change id if title changes */}
        <input type="hidden" name="slug_hint" value={slugPreview} />

        <div className="flex items-center gap-3">
          <SaveButton />
          {!canEdit && (
            <span className="text-sm text-amber-500">
              You might not be the owner; saving could be blocked by the server.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
