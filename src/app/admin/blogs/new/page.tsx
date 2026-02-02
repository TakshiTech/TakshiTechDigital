'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useFormStatus } from 'react-dom';
import dynamic from 'next/dynamic';
import { createBlogAction } from '../actions';

type Status = 'published' | 'draft';

// Client-only Jodit wrapper
const JoditEditorClient = dynamic(() => import('@/components/admin/JoditEditorClient'), {
  ssr: false,
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? 'Publishing…' : 'Publish Blog'}
    </button>
  );
}

export default function NewBlogPage() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<Status>('published');
  const [contentHTML, setContentHTML] = useState<string>('');

  const slug = useMemo(() => slugify(title || ''), [title]);

  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg dark:bg-slate-900">
      {/* Back */}
      <Link
        href="/admin/blogs"
        className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-slate-300"
      >
        ← Back to Blogs
      </Link>

      <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">✍️ Write a New Blog</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-slate-400">
        Slug preview: <span className="font-mono">{slug || '—'}</span>
      </p>

      {/* Important: multipart/form-data for file uploads */}
      <form action={createBlogAction} className="space-y-6">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-b-2 border-gray-300 pb-2 text-2xl font-semibold focus:border-blue-600 focus:outline-none
                     text-slate-900 placeholder-slate-400
                     dark:text-slate-100 dark:placeholder-slate-500 dark:border-slate-700"
        />

        {/* Cover Image */}
        <div>
          <input
            type="file"
            name="cover"
            accept="image/*"
            required
            className="block w-full text-sm text-gray-700
                       file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700 hover:file:bg-blue-100
                       dark:text-slate-200 dark:file:bg-slate-800 dark:file:text-slate-100 dark:hover:file:bg-slate-700"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">Max 4MB. JPG/PNG/WebP recommended.</p>
        </div>


        {/* Jodit Editor (HTML) */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
            Content (HTML via Jodit)
          </label>

          <JoditEditorClient initialValue="" onChangeHTML={(html) => setContentHTML(html)} theme="dark" />

          {/* hidden field to post HTML to the server action */}
          <input type="hidden" name="content_html" value={contentHTML} />
        </div>

        {/* Status */}
        <select
          name="status"
          defaultValue={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          className="w-full rounded border px-3 py-2 focus:outline-none
                     text-slate-900 border-gray-300
                     dark:text-slate-100 dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {/* Hidden slug field */}
        <input type="hidden" name="slug_hint" value={slug} />

        {/* Submit */}
        <SubmitButton />
      </form>
    </div>
  );
}
