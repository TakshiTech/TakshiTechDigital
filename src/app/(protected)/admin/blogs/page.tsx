import { Suspense } from 'react'
import BlogListClient from './BlogListClient'

export const dynamic = 'force-dynamic' // optional, but handy with Supabase + RLS

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading blogs…</div>}>
      <BlogListClient />
    </Suspense>
  )
}
