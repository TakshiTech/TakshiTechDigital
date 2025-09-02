'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'

const JoditEditorClient = dynamic(() => import('@/components/admin/JoditEditorClient'), { ssr: false })

export default function EditBlogPage() {
  // handle string | string[]
  const params = useParams() as { id?: string | string[] }
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<'published' | 'draft'>('published')
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [ownerId, setOwnerId] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const contentRef = useRef<string>('')
  const [editorKey, setEditorKey] = useState(0)

  useEffect(() => {
    if (!id) return

    const fetchBlog = async () => {
      // 1) current user
      const { data: auth } = await supabase.auth.getUser()
      const me = auth?.user || null
      const myId = me?.id ?? null
      const admin = (me?.app_metadata as any)?.role === 'admin'
      setIsAdmin(!!admin)

      // 2) blog row (string id safe)
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .filter('id', 'eq', String(id))
        .single()

      if (error || !data) {
        toast.error('Blog not found')
        router.push('/dashboard/blogs')
        return
      }

      setOwnerId(data.user_id ?? null)
      const isOwner = !!myId && data.user_id === myId
      setCanEdit(isOwner || admin)

      setTitle(data.title || '')
      setStatus((data.status as 'published' | 'draft') || 'published')
      setCurrentImage(data.image_url || null)
      contentRef.current = data.content || ''
      setEditorKey(k => k + 1) // Jodit re-read initialValue

      setLoading(false)
    }

    fetchBlog()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!canEdit) {
      toast.error('You are not allowed to edit this blog (not the author).')
      return
    }
    if (!title.trim() || !contentRef.current.trim()) {
      toast.error('Title and content are required')
      return
    }

    setIsSubmitting(true)
    try {
      let image_url = currentImage

      // optional: upload new image
      if (imageFile) {
        const filePath = `blogs/${Date.now()}-${imageFile.name}`
        const { error: uploadError } = await supabase
          .storage.from('blog-images')
          .upload(filePath, imageFile)
        if (uploadError) throw uploadError

        const { data: pub } = supabase
          .storage.from('blog-images')
          .getPublicUrl(filePath)
        image_url = pub?.publicUrl || image_url
      }

      // Force returning rows -> catch RLS / 0-row updates
      const { data, error } = await supabase
        .from('blogs')
        .update({
          title,
          status,
          content: contentRef.current,
          image_url
        })
        .filter('id', 'eq', String(id))
        .select('id')

      if (error) throw error
      if (!data || data.length === 0) {
        throw new Error('No row updated — RLS blocked or wrong id')
      }

      toast.success('Blog updated successfully ✅')
      router.push('/dashboard/blogs')
    } catch (err: any) {
      console.error(err)
      // Friendlier error if RLS blocked
      if (String(err?.message || '').includes('No row updated')) {
        toast.error('You cannot edit this blog because you did not write it.')
      } else {
        toast.error('Update failed: ' + err.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <div className="p-6">Loading blog...</div>

  const notOwnerBanner = !canEdit ? (
    <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-yellow-800">
      You can view this post, but you can’t edit it because you’re not the author
      {ownerId ? <> (owner: <code className="text-yellow-700">{ownerId}</code>)</> : null}.
    </div>
  ) : null

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">✏️ Edit Blog</h1>
        <button
          type="button"
          onClick={() => router.push('/dashboard/blogs')}
          className="px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50"
        >
          ← Back
        </button>
      </div>

      {notOwnerBanner}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!canEdit}
          className="w-full text-2xl font-semibold border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 pb-2 disabled:opacity-60"
          required
        />

        {currentImage && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
            <img src={currentImage} alt="Current blog" className="h-40 rounded-lg object-cover" />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          disabled={!canEdit}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-60"
        />

        {/* Jodit: show editor when canEdit, otherwise read-only content */}
        {canEdit ? (
          <JoditEditorClient
            key={editorKey}
            initialValue={contentRef.current}
            onChangeHTML={(html) => { contentRef.current = html }}
          />
        ) : (
          <div className="prose max-w-none border rounded-lg p-4 bg-gray-50">
            <div dangerouslySetInnerHTML={{ __html: contentRef.current }} />
          </div>
        )}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
          disabled={!canEdit}
          className="w-full border px-3 py-2 rounded focus:outline-none disabled:opacity-60"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {canEdit && (
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50"
          >
            {isSubmitting ? 'Updating…' : 'Update Blog'}
          </button>
        )}
      </form>
    </div>
  )
}
