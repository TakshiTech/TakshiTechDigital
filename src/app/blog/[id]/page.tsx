'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { Twitter, Facebook, Instagram, Share2, MessageCircle } from 'lucide-react'

type Blog = {
  id: number | string
  title: string | null
  content: string | null
  image_url: string | null
  created_at: string | null
  status?: string | null
}
type Mini = Pick<Blog, 'id' | 'title' | 'image_url' | 'created_at'>

const htmlToText = (html?: string | null) =>
  (html || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<\/?[^>]+(>|$)/g, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const readingTime = (html?: string | null) =>
  Math.max(1, Math.round(htmlToText(html).split(/\s+/).filter(Boolean).length / 200))

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')

export default function BlogDetailPage() {
  const params = useParams() as { id?: string | string[] }
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')

  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [related, setRelated] = useState<Mini[]>([])

  const [currentUrl, setCurrentUrl] = useState('')
  useEffect(() => {
    if (typeof window !== 'undefined') setCurrentUrl(window.location.href)
  }, [])

  // ToC
  const contentRef = useRef<HTMLDivElement>(null)
  const [toc, setToc] = useState<{ id: string; text: string; level: 2 | 3 }[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  // fetch article + related
  useEffect(() => {
    if (!id) return
    let mounted = true

    const fetchOne = async () => {
      setLoading(true)
      setError(null)

      const { data: row, error } = await supabase
        .from('blogs')
        .select('id,title,content,image_url,created_at,status')
        .filter('id', 'eq', String(id))   // bigint/uuid safe
        .eq('status', 'published')
        .single()

      if (!mounted) return

      if (error || !row) {
        console.error('Blog fetch failed:', error?.message || error, error)
        setError('Blog not found or not public.')
        setBlog(null)
        setLoading(false)
        return
      }

      setBlog(row as Blog)
      setLoading(false)

      // related — FIX: use filter('id','neq', postId)
      const postId = String(row.id)
      const { data: more } = await supabase
        .from('blogs')
        .select('id,title,image_url,created_at,status')
        .eq('status', 'published')
        .filter('id', 'neq', postId)
        .order('created_at', { ascending: false })
        .limit(3)

      if (mounted) setRelated((more || []) as Mini[])
    }

    fetchOne()
    return () => { mounted = false }
  }, [id])

  // ToC build + active heading highlight
  useEffect(() => {
    if (!contentRef.current) return
    const root = contentRef.current
    const heads = Array.from(root.querySelectorAll<HTMLHeadingElement>('h2, h3'))

    const items: { id: string; text: string; level: 2 | 3 }[] = []
    heads.forEach(h => {
      const text = h.textContent || ''
      const hid = h.id || slugify(text)
      h.id = hid
      items.push({ id: hid, text, level: h.tagName === 'H2' ? 2 : 3 })
    })
    setToc(items)

    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActiveId((e.target as HTMLElement).id)),
      { rootMargin: '0px 0px -70% 0px', threshold: 0.1 }
    )
    heads.forEach(h => io.observe(h))
    return () => io.disconnect()
  }, [blog?.content])

  const rtime = useMemo(() => readingTime(blog?.content), [blog?.content])

  // share helpers
  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(blog?.title || 'Blog')

  const webShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: blog?.title || 'Blog', url: currentUrl })
      } else {
        await navigator.clipboard.writeText(currentUrl)
        alert('Link copied to clipboard!')
      }
    } catch {}
  }
  const copyForInstagram = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      alert('Link copied — open Instagram and paste into your story/bio.')
    } catch {}
  }

  // Small reusable share row
  const ShareRow = () => (
    <div className="flex items-center gap-2">
      <button
        onClick={webShare}
        className="rounded-full border border-gray-300 p-2 hover:bg-gray-50"
        title="Share"
        aria-label="Share"
      >
        <Share2 className="h-4 w-4" />
      </button>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank" rel="noopener noreferrer"
        className="rounded-full border border-gray-300 p-2 hover:bg-gray-50"
        title="Share on Twitter" aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank" rel="noopener noreferrer"
        className="rounded-full border border-gray-300 p-2 hover:bg-gray-50"
        title="Share on Facebook" aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <button
        onClick={copyForInstagram}
        className="rounded-full border border-gray-300 p-2 hover:bg-gray-50"
        title="Copy link for Instagram" aria-label="Copy link for Instagram"
      >
        <Instagram className="h-4 w-4" />
      </button>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank" rel="noopener noreferrer"
        className="rounded-full border border-gray-300 p-2 hover:bg-gray-50"
        title="Share on WhatsApp" aria-label="Share on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
      </a>
    </div>
  )

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Hero / cover */}
        <section className="w-full h-[70vh] relative overflow-hidden flex items-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog?.image_url || '/images/background6.webp'}
            alt={blog?.title || 'Blog cover'}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
            <span className="inline-block text-xs tracking-wide uppercase bg-white/20 text-white px-3 py-1 rounded-full mb-3">
              Blog
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {loading ? 'Loading…' : (blog?.title || 'Untitled')}
            </h1>
            <p className="text-white/80 text-sm mt-2">
              {blog?.created_at ? new Date(blog.created_at).toLocaleDateString() : ''} • {rtime} min read
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="py-4 text-sm">
            <Link href="/blog" className="text-emerald-700 hover:underline">Blog</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">{blog?.title || 'Post'}</span>
          </div>
        </div>

        {/* Content + Sticky ToC */}
        <div className="max-w-6xl mx-auto px-6 pb-14 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
          {/* Content */}
          <article className="prose prose-lg max-w-none prose-img:rounded-xl">
            {loading && <div className="h-40 bg-gray-200 rounded-xl animate-pulse" />}
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
            )}
            {!loading && !error && (
              <div ref={contentRef} dangerouslySetInnerHTML={{ __html: blog?.content || '' }} />
            )}

            {/* Bottom share */}
            {!loading && !error && (
              <div className="mt-10 flex items-center justify-between rounded-xl border border-gray-200 p-4">
                <div className="text-sm text-gray-500">
                  Published {blog?.created_at ? new Date(blog.created_at).toLocaleDateString() : ''}
                </div>
                <div className="flex items-center gap-3">
                  <ShareRow />
                  <Link
                    href="/blog"
                    className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Back to Blog
                  </Link>
                </div>
              </div>
            )}
          </article>

          {/* Sticky ToC + share card */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-gray-200 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  On this page
                </div>
                {toc.length === 0 ? (
                  <p className="text-sm text-gray-500">Sections will appear here.</p>
                ) : (
                  <ul className="space-y-2">
                    {toc.map(item => (
                      <li key={item.id} className={`text-sm ${activeId === item.id ? 'text-emerald-700' : 'text-gray-700'}`}>
                        <a href={`#${item.id}`} className={`hover:underline block ${item.level === 3 ? 'pl-4 text-[13px]' : ''}`}>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-2xl border border-gray-200 p-5">
                <div className="text-sm font-semibold mb-2">Enjoying this article?</div>
                <p className="text-sm text-gray-600 mb-3">Share it with your network.</p>
                <div className="flex items-center gap-2">
                  <ShareRow />
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 pb-16">
            <h3 className="text-xl font-semibold mb-6">Related articles</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(b => (
                <Link
                  key={b.id}
                  href={`/blog/${b.id}`}
                  className="group overflow-hidden rounded-2xl border border-gray-200 hover:shadow-md transition"
                >
                  <div className="relative h-40 w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.image_url || '/images/blogs/providing-brands-with-online-growth-strategies.webp'}
                      alt={b.title || 'Blog'}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-500">
                      {b.created_at ? new Date(b.created_at).toLocaleDateString() : ''}
                    </div>
                    <h5 className="mt-1 text-[15px] font-semibold text-gray-900 group-hover:underline">
                      {b.title || 'Untitled'}
                    </h5>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
