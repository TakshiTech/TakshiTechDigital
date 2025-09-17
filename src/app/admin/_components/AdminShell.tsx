// src/app/admin/_components/AdminShell.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type React from 'react'

// simple client hook to load the logged-in user (name/email) from an API route
// expects /api/me -> { name?: string, email: string }
function useUser() {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/me', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        if (mounted) setUser(data)
      } catch {
        // no-op; keep user null
      }
    })()
    return () => {
      mounted = false
    }
  }, [])
  return user
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const safePath = pathname ?? '' // ensure non-null for comparisons/formatting
  const user = useUser()

  const nav = [
    { label: 'Blog', href: '/admin/blogs', icon: BlogIcon },
    { label: 'Leads', href: '/admin/leads', icon: LeadsIcon },
  ]

  return (
    <div className="relative min-h-screen text-white selection:bg-fuchsia-500/30 selection:text-white flex flex-col">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-slate-950" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1000px_600px_at_20%_-10%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(900px_500px_at_80%_110%,rgba(236,72,153,0.25),transparent_60%)]"
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="mr-1 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 md:hidden transition"
              aria-label="Open menu"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
            <Link href="/admin" className="flex items-center gap-2">
              <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/20">
                <Image src="/logo.svg" alt="Takshi Tech Digital" fill className="object-cover" />
              </span>
              <span className="text-sm font-semibold tracking-tight text-white/90">Takshi Tech Digital</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <input
                placeholder="Search…"
                className="h-9 w-64 rounded-xl border border-white/15 bg-white/10 px-3 text-sm text-white placeholder:text-white/60 outline-none ring-0 focus:border-white/30"
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                <SearchIcon className="h-4 w-4 text-white/60" />
              </span>
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 text-sm hover:bg-white/20 transition shadow-sm">
              <SparklesIcon className="h-4 w-4" />
              Quick Action
            </button>
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 hover:bg-white/20 transition">
              <AvatarIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <div className="mx-auto w-full max-w-screen-2xl flex-1 md:pl-[260px]">
        <aside className="hidden md:block fixed left-0 top-14 bottom-0 w-[260px] border-r border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex h-full flex-col">
            <div className="p-3">
              <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10 shadow-lg">
                <p className="text-xs font-medium text-white/90">{`Welcome${user?.name ? `, ${user.name}` : ''} 👋`}</p>
                <p className="mt-1 text-[11px] text-white/70">
                  {user?.email ? `Signed in as ${user.email}` : 'Manage content & leads in one place.'}
                </p>
              </div>
            </div>

            <nav className="px-2">
              <SectionLabel>Content</SectionLabel>
              <ul className="space-y-1">
                <NavItem item={nav[0]} active={safePath.startsWith(nav[0].href)} />
              </ul>

              <SectionLabel className="mt-4">Growth</SectionLabel>
              <ul className="space-y-1">
                <NavItem item={nav[1]} active={safePath.startsWith(nav[1].href)} />
              </ul>
            </nav>
          </div>
        </aside>

        {/* Drawer (mobile) */}
        {open && (
          <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-72 bg-white/10 backdrop-blur-2xl ring-1 ring-white/15 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 p-3">
                <span className="text-sm font-semibold">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <nav className="p-2">
                <SectionLabel>Content</SectionLabel>
                <ul className="space-y-1">
                  <NavItem item={nav[0]} active={safePath.startsWith(nav[0].href)} onNavigate={() => setOpen(false)} />
                </ul>
                <SectionLabel className="mt-4">Growth</SectionLabel>
                <ul className="space-y-1">
                  <NavItem item={nav[1]} active={safePath.startsWith(nav[1].href)} onNavigate={() => setOpen(false)} />
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Main content (with bottom padding so footer doesn't overlap) */}
        <main className="min-h-[calc(100vh-3.5rem)] pb-20">
          <div className="p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-white/60">
                Admin <span className="mx-1">/</span>
                <span className="font-medium text-white/90">
                  {formatCrumb(safePath) ?? 'Dashboard'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 text-sm hover:bg-white/20 transition">
                  <PlusIcon className="h-4 w-4" />
                  New
                </button>
                <button className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 text-sm hover:bg-white/20 transition">
                  <SlidersIcon className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>

            <div className="mb-4 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
              <p className="text-sm">
                {user?.name
                  ? `Welcome, ${user.name}!`
                  : user?.email
                    ? `Welcome, ${user.email.split('@')[0]}!`
                    : 'Welcome to the dashboard!'}
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 shadow-xl">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Fixed footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mx-auto max-w-screen-2xl px-4 py-4 text-xs text-white/70">
          <div className="flex flex-col items-start justify-between gap-2 md:flex-row">
            <p>© {new Date().getFullYear()} Takshi Tech Digital. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white/80">Privacy</Link>
              <Link href="/terms" className="hover:text-white/80">Terms</Link>
              <a href="mailto:hello@takshitechdigital.com" className="hover:text-white/80">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ---------- helpers ---------- */
function formatCrumb(path: string) {
  const last = path.split('/').filter(Boolean).slice(-1)[0]
  if (!last) return null
  return last.charAt(0).toUpperCase() + last.slice(1)
}

/* ---------- small components ---------- */
function SectionLabel({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 ${className}`}>{children}</div>
}

function NavItem({
  item,
  active,
  onNavigate,
}: {
  item: { label: string; href: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }
  active?: boolean
  onNavigate?: () => void
}) {
  const Icon = item.icon
  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        className={`group relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ring-1 ring-inset ring-white/10 hover:ring-white/20 shadow-sm 
        ${active ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
      >
        <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-white/70 group-hover:text-white'}`} />
        <span className="font-medium">{item.label}</span>
        {active && <span className="absolute inset-y-0 right-0 w-1 rounded-r-xl bg-gradient-to-b from-indigo-500 to-fuchsia-500" />}
      </Link>
    </li>
  )
}

/* ---------- icons ---------- */
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><path stroke="currentColor" strokeWidth="1.5" d="M4 7h16M4 12h16M4 17h16"/></svg>
}
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><path stroke="currentColor" strokeWidth="1.5" d="M6 6l12 12M6 18L18 6"/></svg>
}
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5"/></svg>
}
function AvatarIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5"/></svg>
}
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3zM19 13l.8 1.8L21 16l-1.2 1.2L19 19l-.8-1.8L17 16l1.2-1.2L19 13zM6 13l.8 1.8L8 16l-1.2 1.2L6 19l-.8-1.8L4 16l1.2-1.2L6 13z" stroke="currentColor" strokeWidth="1.2"/></svg>
}
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5"/></svg>
}
function SlidersIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M4 7h12M4 17h16M16 7v6M10 17v-6" stroke="currentColor" strokeWidth="1.5"/></svg>
}
function BlogIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5"/></svg>
}
function LeadsIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M2.5 19.5C3.5 16 6 14.5 8 14.5s4.5 1.5 5.5 5" stroke="currentColor" strokeWidth="1.5"/><rect x="14" y="5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>
}
