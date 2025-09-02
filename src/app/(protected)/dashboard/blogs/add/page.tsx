'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabaseClient'
import toast from 'react-hot-toast'

// Client-only load
const JoditEditorClient = dynamic(() => import('@/components/admin/JoditEditorClient'), { ssr: false })

export default function AddBlogPage() {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<'published' | 'draft'>('published')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contentRef = useRef<string>('') 
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const content = contentRef.current?.trim() ?? ''
    if (!title || !imageFile || !content) {
      toast.error('All fields are required')
      return
    }

    setIsSubmitting(true)
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (!user || userError) {
      toast.error('Not authenticated')
      setIsSubmitting(false)
      return
    }

    const filePath = `blogs/${Date.now()}-${imageFile.name}`
    const { error: uploadError } = await supabase.storage.from('blog-images').upload(filePath, imageFile)
    if (uploadError) {
      toast.error('Image upload failed: ' + uploadError.message)
      setIsSubmitting(false)
      return
    }

    const { data: imageData } = supabase.storage.from('blog-images').getPublicUrl(filePath)
    const image_url = imageData?.publicUrl

    const { error: insertError } = await supabase.from('blogs').insert([
      { title, status, content, image_url, user_id: user.id },
    ])

    if (insertError) {
      toast.error('Blog creation failed: ' + insertError.message)
    } else {
      toast.success('Blog added successfully ✅')
      router.push('/dashboard/blogs')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Back button */}
      <button
        type="button"
        onClick={() => router.push('/dashboard/blogs')}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
      >
        ← Back to Blogs
      </button>

      <h1 className="text-3xl font-bold mb-6">✍️ Write a New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-semibold border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 pb-2"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          required
        />

        {/* Jodit Editor */}
        <JoditEditorClient
          initialValue=""
          onChangeHTML={(html) => { contentRef.current = html }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
          className="w-full border px-3 py-2 rounded focus:outline-none"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50"
        >
          {isSubmitting ? 'Publishing…' : 'Publish Blog'}
        </button>
      </form>
    </div>
  )
}
