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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pagePath = `/blog/${id}`

  // 1. Try fetching from dedicated SEO table
  const { data: seo } = await supabase
    .from('seo_metadata')
    .select('*')
    .eq('page_path', pagePath)
    .single()

  if (seo) {
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      openGraph: {
        title: seo.title || undefined,
        description: seo.description || undefined,
        // We might want to fetch the blog image if SEO image is missing?
        // But seo_metadata doesn't store image url specifically yet (only section/tags)
        // So we might still want to fetch the blog to get the image default.
      },
      alternates: {
        canonical: `https://www.takshitechdigital.com/blog/${id}`,
      },
    }
  }

  // 2. Fallback to existing Blog table data
  const { data } = await supabase
    .from('blogs')
    .select('title, seo_title, seo_description, seo_keywords, image_url, status')
    .eq('id', id)
    // .eq('status', 'published') // Allow previewing drafts via direct link?
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
    alternates: {
      canonical: `https://www.takshitechdigital.com/blog/${id}`,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ClientBlogDetailPage id={id} />
}
