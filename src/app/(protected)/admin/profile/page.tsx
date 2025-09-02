'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Globe, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react'

type Tab = 'personal' | 'social' | 'other'

type Links = {
  website?: string | null
  twitter?: string | null
  linkedin?: string | null
  instagram?: string | null
  facebook?: string | null
}

const sanitizeLink = (v?: string | null) => {
  const val = (v || '').trim()
  if (!val) return null
  return /^https?:\/\//i.test(val) ? val : `https://${val}`
}

export default function ProfilePage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('personal')

  // auth + profile
  const [userId, setUserId] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')

  // avatar
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // links
  const [links, setLinks] = useState<Links>({
    website: null, twitter: null, linkedin: null, instagram: null, facebook: null,
  })

  // ui
  const [loading, setLoading] = useState(true)
  const [savingPersonal, setSavingPersonal] = useState(false)
  const [savingSocial, setSavingSocial] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/admin')

      setUserId(user.id)
      setEmail(user.email || '')

      const { data } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, links')
        .eq('id', user.id)
        .maybeSingle()

      setFullName((data?.full_name as string) || (user.user_metadata as any)?.name || '')
      setAvatarUrl((data?.avatar_url as string) || (user.user_metadata as any)?.avatar_url || null)

      const dbLinks = (data?.links as any) || {}
      setLinks({
        website: dbLinks.website ?? null,
        twitter: dbLinks.twitter ?? null,
        linkedin: dbLinks.linkedin ?? null,
        instagram: dbLinks.instagram ?? null,
        facebook: dbLinks.facebook ?? null,
      })

      setLoading(false)
    }
    load()
  }, [router])

  const initials = useMemo(() => {
    if (!fullName && email) return (email[0] || 'U').toUpperCase()
    const parts = (fullName || 'U').trim().split(/\s+/)
    return (parts[0]?.[0] || 'U') + (parts[1]?.[0] || '')
  }, [fullName, email])

  const hasAnyLink =
    !!(links.website || links.twitter || links.linkedin || links.instagram || links.facebook)

  const onPickAvatar = () => fileInputRef.current?.click()

  const savePersonal = async () => {
    setSavingPersonal(true)
    try {
      if (!userId) throw new Error('Not authenticated')

      let url = avatarUrl
      if (file) {
        const path = `avatars/${userId}-${Date.now()}-${file.name}`
        const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
        if (upErr) throw upErr
        const { data: pub } = supabase.storage.from('avatars').getPublicUrl(path)
        url = pub?.publicUrl || url
      }

      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName || null, avatar_url: url || null })
        .eq('id', userId)
        .select('id')

      if (error) throw error

      setAvatarUrl(url || null)
      setFile(null)
      toast.success('Profile updated ✅')
    } catch (e: any) {
      toast.error(e.message || 'Failed to save')
    } finally {
      setSavingPersonal(false)
    }
  }

  const saveSocial = async () => {
    setSavingSocial(true)
    try {
      if (!userId) throw new Error('Not authenticated')

      const payload: Links = {
        website: sanitizeLink(links.website),
        twitter: sanitizeLink(links.twitter),
        linkedin: sanitizeLink(links.linkedin),
        instagram: sanitizeLink(links.instagram),
        facebook: sanitizeLink(links.facebook),
      }

      const { error } = await supabase
        .from('profiles')
        .update({ links: payload as any })
        .eq('id', userId)
        .select('id')

      if (error) throw error
      toast.success('Social links saved ✅')
    } catch (e: any) {
      toast.error(e.message || 'Failed to save links')
    } finally {
      setSavingSocial(false)
    }
  }

  if (loading) return <div className="p-6">Loading…</div>

  return (
    <div className="flex gap-6">
      {/* Left: identity + social icons + mini nav (unchanged layout) */}
      <aside className="w-60 shrink-0">
        <div className="bg-white border rounded-xl overflow-hidden">
          {/* Identity header */}
          <div className="px-4 py-4 border-b">
            <div className="flex items-center gap-3">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} className="h-10 w-10 rounded-full object-cover" alt="avatar" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white grid place-items-center text-sm font-semibold">
                  {initials}
                </div>
              )}
              <div>
                <div className="font-medium leading-tight">{fullName || 'Your Name'}</div>
                <div className="text-xs text-gray-500 leading-tight">{email}</div>
              </div>
            </div>
          </div>

          {/* NEW: Social icons row (only if any link exists) */}
          {hasAnyLink && (
            <div className="px-4 pb-3 pt-2 border-b bg-white">
              <div className="flex flex-wrap gap-2">
                {links.website && (
                  <a
                    href={links.website as string}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border hover:bg-gray-50"
                    title="Website"
                  >
                    <Globe className="h-4 w-4 text-gray-600" />
                  </a>
                )}
                {links.twitter && (
                  <a
                    href={links.twitter as string}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border hover:bg-gray-50"
                    title="Twitter"
                  >
                    <Twitter className="h-4 w-4 text-gray-600" />
                  </a>
                )}
                {links.linkedin && (
                  <a
                    href={links.linkedin as string}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border hover:bg-gray-50"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4 text-gray-600" />
                  </a>
                )}
                {links.instagram && (
                  <a
                    href={links.instagram as string}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border hover:bg-gray-50"
                    title="Instagram"
                  >
                    <Instagram className="h-4 w-4 text-gray-600" />
                  </a>
                )}
                {links.facebook && (
                  <a
                    href={links.facebook as string}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border hover:bg-gray-50"
                    title="Facebook"
                  >
                    <Facebook className="h-4 w-4 text-gray-600" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Left nav (same as before) */}
          <nav className="p-2 text-sm">
            {[
              { key: 'personal', label: 'Personal Information' },
              { key: 'social', label: 'Social Accounts' },
              { key: 'other', label: 'Other' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key as Tab)}
                className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 ${
                  tab === item.key ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="h-px my-2 bg-gray-100" />
            <button
              onClick={() => router.push('/dashboard/settings')}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 text-amber-700"
            >
              Change Password
            </button>
          </nav>
        </div>
      </aside>

      {/* Right: content */}
      <section className="flex-1 space-y-6">
        {/* Personal */}
        {tab === 'personal' && (
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

            <div className="grid gap-6 md:grid-cols-[160px,1fr]">
              {/* Avatar block */}
              <div>
                <div className="relative h-28 w-28">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarUrl} className="h-28 w-28 rounded-full object-cover" alt="avatar" />
                  ) : (
                    <div className="h-28 w-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white grid place-items-center text-2xl font-semibold">
                      {initials}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={onPickAvatar}
                    className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50"
                  >
                    Change
                  </button>
                  {avatarUrl && (
                    <button
                      onClick={() => { setAvatarUrl(null); setFile(null) }}
                      className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                {file && <p className="mt-2 text-xs text-gray-500 truncate">Selected: {file.name}</p>}
              </div>

              {/* Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm mb-1">Full name</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Jane Cooper"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    value={email}
                    readOnly
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-600"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={savePersonal}
                disabled={savingPersonal}
                className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-60"
              >
                {savingPersonal ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {/* Social */}
        {tab === 'social' && (
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Social Accounts</h2>
            <div className="grid gap-4">
              {[
                { key: 'website', label: 'Website', placeholder: 'https://your-site.com' },
                { key: 'twitter', label: 'Twitter', placeholder: 'https://twitter.com/you' },
                { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/you' },
                { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/you' },
                { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/you' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm mb-1">{label}</label>
                  <input
                    value={(links as any)[key] || ''}
                    placeholder={placeholder}
                    onChange={(e) => setLinks(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={saveSocial}
                disabled={savingSocial}
                className="px-4 py-2 rounded-md bg-emerald-600 text-white disabled:opacity-60"
              >
                {savingSocial ? 'Saving…' : 'Save Links'}
              </button>
            </div>
          </div>
        )}

        {/* Other (minimal, same vibe) */}
        {tab === 'other' && (
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Other</h2>
            <p className="text-sm text-gray-600">
              Change your password from{' '}
              <button onClick={()=>router.push('/dashboard/settings')} className="text-blue-600 underline">
                Settings
              </button>.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
