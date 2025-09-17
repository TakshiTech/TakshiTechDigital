// src/app/blog/[id]/page.tsx
import ClientBlogDetailPage from './ClientBlogDetail'
import { createClient } from '@supabase/supabase-js'

// Render per-request (no static caching), so metadata updates per post
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const dynamicParams = true

// Public Supabase client for server usage
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id

  const { data } = await supabase
    .from('blogs')
    .select('title, seo_title, seo_description, seo_keywords, image_url, status')
    .eq('id', id)
    .eq('status', 'published')
    .single()

  const title = data?.seo_title || data?.title || `Blog ${id}`
  const description = data?.seo_description || undefined
  const keywords = (data?.seo_keywords as string[] | null) || undefined
  const images = data?.image_url ? [{ url: data.image_url }] : undefined

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: data?.image_url ? [data.image_url] : undefined,
    },
    // Optional: canonical per post (nice for SEO)
    alternates: {
      canonical: `https://www.webdigitalbazaar.com/blog/${id}`,
    },
  }
}

export default function Page({ params }: { params: { id: string } }) {
  return <ClientBlogDetailPage id={params.id} />
}
