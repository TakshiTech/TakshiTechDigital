'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

type EditStatus = 'published' | 'draft' | 'archived';

const BLOG_BUCKET = 'blog-images';
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

const slugify2 = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

function getEnv2() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
  if (!url) throw new Error('Supabase URL missing');
  if (!anonKey) throw new Error('Anon key missing');
  if (!serviceKey) throw new Error('Service role key missing');
  return { url, anonKey, serviceKey };
}

// cookie-auth client for reading the current user
async function getAuthClient(url: string, anonKey: string) {
  // ✅ Next.js 16: cookies() is async
  const store = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return store.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        // Server Actions / Route Handlers can set cookies
        try {
          store.set({ name, value, ...options });
        } catch {
          // If called somewhere cookies can't be modified, ignore (common pattern)
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          store.set({ name, value: '', ...options, maxAge: 0 });
        } catch {
          // ignore
        }
      },
    },
  });
}

// admin client (service role) for DB/storage writes
function getAdminClient(url: string, serviceKey: string) {
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

/* ----------------------- helpers for file handling ----------------------- */

function getOptionalFile(fd: FormData, key: string): File | null {
  const v = fd.get(key);

  // In Server Actions, uploaded files are File objects (Blob-like).
  if (v && typeof v === 'object') {
    const maybeFile = v as unknown as File;
    const hasName = typeof (maybeFile as any).name === 'string';
    const hasSize = typeof (maybeFile as any).size === 'number';
    if (hasName && hasSize) {
      if (!maybeFile.name || maybeFile.size === 0) return null;
      return maybeFile;
    }
  }
  return null;
}

function isLikelyImage(file: File): boolean {
  const mime = (file.type || '').toLowerCase();
  if (mime) return mime.startsWith('image/');
  const name = (file.name || '').toLowerCase();
  return /\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(name);
}

function guessMimeFromName(name: string): string {
  const ext = (name.split('.').pop() || '').toLowerCase();
  switch (ext) {
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    case 'bmp':
      return 'image/bmp';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}

/* --------------------------------------------------------- */
/* CREATE                                                    */
/* --------------------------------------------------------- */
export async function createBlogAction(formData: FormData) {
  const { url, anonKey, serviceKey } = getEnv2();

  const supabaseAuth = await getAuthClient(url, anonKey);
  const { data: userData, error: userErr } = await supabaseAuth.auth.getUser();
  if (userErr) throw new Error(`Auth error: ${userErr.message}`);
  const currentUserId = userData.user?.id || null;
  if (!currentUserId) throw new Error('You must be logged in to create a blog.');

  const supabaseAdmin = getAdminClient(url, serviceKey);

  const title = (formData.get('title') || '').toString().trim();
  const status = (formData.get('status') || 'draft').toString() as EditStatus;
  const contentHTML = (formData.get('content_html') || '').toString();
  const seo_title = (formData.get('seo_title') || title).toString();
  const seo_description = (formData.get('seo_description') || '').toString();
  const seo_keywords_raw = (formData.get('seo_keywords') || '').toString();
  const slug_hint = (formData.get('slug_hint') || '').toString();

  const cover = getOptionalFile(formData, 'cover');

  if (!title || !contentHTML) throw new Error('Title and content are required');
  if (seo_title && seo_title.length > 60) throw new Error('SEO Title should be ≤ 60 characters');
  if (seo_description && seo_description.length > 160) throw new Error('Meta description should be ≤ 160 characters');

  if (cover) {
    if (cover.size > MAX_IMAGE_BYTES) throw new Error('Image must be ≤ 4MB');
    if (!isLikelyImage(cover)) throw new Error('Please select a valid image');
  }

  const baseId = slugify2(title) || slug_hint || Date.now().toString();
  let newId = baseId;

  const keywordsArray = seo_keywords_raw.split(',').map((k) => k.trim()).filter(Boolean);
  const plainText = contentHTML.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  let image_url: string | null = null;

  if (cover) {
    const safeName = (cover.name || 'cover').replace(/\s+/g, '-');
    const filePath = `blogs/${baseId}/${Date.now()}-${safeName}`;
    const contentType = cover.type || guessMimeFromName(safeName);

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BLOG_BUCKET)
      .upload(filePath, cover, { contentType, upsert: true });
    if (uploadError) throw new Error(`Cover upload failed: ${uploadError.message}`);

    const { data: publicInfo } = supabaseAdmin.storage.from(BLOG_BUCKET).getPublicUrl(filePath);
    image_url = publicInfo?.publicUrl ?? null;
  }

  const payload = {
    id: newId,
    title,
    status,
    image_url,
    content_html: contentHTML,
    seo_title: seo_title || title,
    seo_description: seo_description || plainText.slice(0, 160),
    seo_keywords: keywordsArray as string[],
    user_id: currentUserId,
  };

  const { error: insertErr } = await supabaseAdmin.from('blogs').insert([payload]);

  if (insertErr?.code === '23505') {
    newId = `${baseId}-${Date.now().toString(36)}`;
    const retry = { ...payload, id: newId };
    const { error: retryErr } = await supabaseAdmin.from('blogs').insert([retry]);
    if (retryErr) throw new Error(`Insert failed: ${retryErr.message}`);
  } else if (insertErr) {
    throw new Error(`Insert failed: ${insertErr.message}`);
  }

  redirect('/admin/blogs');
}

/* --------------------------------------------------------- */
/* UPDATE  (reads `id` from FormData — no .bind on client)   */
/* --------------------------------------------------------- */
export async function updateBlogAction(formData: FormData) {
  const { url, anonKey, serviceKey } = getEnv2();

  const id = String(formData.get('id') || '');
  if (!id) throw new Error('Missing blog id');

  // who is updating?
  const supabaseAuth = await getAuthClient(url, anonKey);
  const { data: userData, error: userErr } = await supabaseAuth.auth.getUser();
  if (userErr) throw new Error(`Auth error: ${userErr.message}`);
  const currentUserId = userData.user?.id || null;
  if (!currentUserId) throw new Error('You must be logged in to update a blog.');

  const supabaseAdmin = getAdminClient(url, serviceKey);

  // existing row
  const { data: existing, error: fetchErr } = await supabaseAdmin.from('blogs').select('*').eq('id', id).single();
  if (fetchErr || !existing) throw new Error(fetchErr?.message || 'Blog not found');
  if (existing.user_id && existing.user_id !== currentUserId) {
    throw new Error('You are not allowed to edit this blog.');
  }

  const title = (formData.get('title') || existing.title || '').toString().trim();
  const status = (formData.get('status') || existing.status || 'draft').toString() as EditStatus;
  const contentHTML = (formData.get('content_html') || existing.content_html || '').toString();
  const seo_title = (formData.get('seo_title') || existing.seo_title || title).toString();
  const seo_description = (formData.get('seo_description') || existing.seo_description || '').toString();
  const seo_keywords_raw = (formData.get('seo_keywords') || (existing.seo_keywords || []).join(',')).toString();
  const slug_hint = (formData.get('slug_hint') || id).toString();

  const cover = getOptionalFile(formData, 'cover'); // optional

  if (!title || !contentHTML) throw new Error('Title and content are required');
  if (seo_title && seo_title.length > 60) throw new Error('SEO Title should be ≤ 60 characters');
  if (seo_description && seo_description.length > 160) throw new Error('Meta description should be ≤ 160 characters');

  if (cover) {
    if (cover.size > MAX_IMAGE_BYTES) throw new Error('Image must be ≤ 4MB');
    if (!isLikelyImage(cover)) throw new Error('Please select a valid image');
  }

  const newId = slugify2(title) || slug_hint || id;
  const keywordsArray = seo_keywords_raw.split(',').map((k: string) => k.trim()).filter(Boolean);
  const plainText = contentHTML.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  let image_url: string | null = existing.image_url ?? null;

  // optional cover replace
  if (cover) {
    const safeName = (cover.name || 'cover').replace(/\s+/g, '-');
    const filePath = `blogs/${newId}/${Date.now()}-${safeName}`;
    const contentType = cover.type || guessMimeFromName(safeName);

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BLOG_BUCKET)
      .upload(filePath, cover, { contentType, upsert: true });
    if (uploadError) throw new Error(`Cover upload failed: ${uploadError.message}`);

    const { data: publicInfo } = supabaseAdmin.storage.from(BLOG_BUCKET).getPublicUrl(filePath);
    image_url = publicInfo?.publicUrl ?? image_url;
  }

  const payload = {
    id: newId,
    title,
    status,
    image_url,
    content_html: contentHTML,
    seo_title: seo_title || title,
    seo_description: seo_description || plainText.slice(0, 160),
    seo_keywords: keywordsArray as string[],
  };

  // if slug changed: insert new row then delete old
  if (newId !== existing.id) {
    const { error: insertErr } = await supabaseAdmin.from('blogs').insert([{ ...payload, user_id: existing.user_id }]);
    if (insertErr) throw new Error(`Insert (slug change) failed: ${insertErr.message}`);

    const { error: delOldErr } = await supabaseAdmin.from('blogs').delete().eq('id', existing.id);
    if (delOldErr) throw new Error(`Old slug delete failed: ${delOldErr.message}`);
  } else {
    const { error: updErr } = await supabaseAdmin.from('blogs').update(payload).eq('id', id);
    if (updErr) throw new Error(`Update failed: ${updErr.message}`);
  }

  redirect('/admin/blogs');
}

/* --------------------------------------------------------- */
/* DELETE                                                    */
/* --------------------------------------------------------- */
export async function deleteBlogAction(id: string) {
  const { url, anonKey, serviceKey } = getEnv2();

  const supabaseAuth = await getAuthClient(url, anonKey);
  const { data: userData, error: userErr } = await supabaseAuth.auth.getUser();
  if (userErr) throw new Error(`Auth error: ${userErr.message}`);
  const currentUserId = userData.user?.id || null;
  if (!currentUserId) throw new Error('You must be logged in to delete a blog.');

  const supabaseAdmin = getAdminClient(url, serviceKey);

  const { data: existing, error: fetchErr } = await supabaseAdmin.from('blogs').select('*').eq('id', id).single();
  if (fetchErr || !existing) throw new Error(fetchErr?.message || 'Blog not found');
  if (existing.user_id && existing.user_id !== currentUserId) {
    throw new Error('You are not allowed to delete this blog.');
  }

  // delete row
  const { error: delErr } = await supabaseAdmin.from('blogs').delete().eq('id', id);
  if (delErr) throw new Error(`Delete failed: ${delErr.message}`);

  // best-effort cleanup of storage files under blogs/{id}/
  try {
    const prefix = `blogs/${id}`;
    const { data: list } = await supabaseAdmin.storage
      .from(BLOG_BUCKET)
      .list(prefix, { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });

    if (list && list.length) {
      const paths = list.map((f) => `${prefix}/${f.name}`);
      await supabaseAdmin.storage.from(BLOG_BUCKET).remove(paths);
    }
  } catch {
    // ignore best-effort cleanup errors
  }

  redirect('/admin/blogs');
}
