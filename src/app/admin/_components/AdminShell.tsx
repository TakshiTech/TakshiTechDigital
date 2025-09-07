// src/app/admin/_components/AdminShell.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type React from 'react'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const nav = [
    { label: 'Blog', href: '/admin/blog', icon: BlogIcon },
    { label: 'Leads', href: '/admin/leads', icon: LeadsIcon },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="mr-1 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 md:hidden"
              aria-label="Open menu"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
            <Link href="/admin" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white font-semibold">DM</span>
              <span className="text-sm font-semibold tracking-tight">Digital Marketing Admin</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <input
                placeholder="Search…"
                className="h-9 w-64 rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-300"
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                <SearchIcon className="h-4 w-4 text-neutral-400" />
              </span>
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-sm hover:bg-neutral-100">
              <SparklesIcon className="h-4 w-4" />
              Quick Action
            </button>
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-100">
              <AvatarIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-[260px_1fr]">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] border-r border-neutral-200 bg-white md:block">
          <div className="flex h-full flex-col">
            <div className="p-3">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 p-3">
                <p className="text-xs font-medium text-neutral-700">Welcome back 👋</p>
                <p className="mt-1 text-[11px] text-neutral-500">Manage content & leads in one place.</p>
              </div>
            </div>

            <nav className="px-2">
              <SectionLabel>Content</SectionLabel>
              <ul className="space-y-1">
                <NavItem item={nav[0]} active={pathname.startsWith(nav[0].href)} />
              </ul>

              <SectionLabel className="mt-4">Growth</SectionLabel>
              <ul className="space-y-1">
                <NavItem item={nav[1]} active={pathname.startsWith(nav[1].href)} />
              </ul>
            </nav>

            <div className="mt-auto p-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-3">
                <p className="text-xs font-medium">Usage</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full w-1/3 bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
                </div>
                <p className="mt-1 text-[11px] text-neutral-500">This month’s activity</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Drawer (mobile) */}
        {open && (
          <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-200 p-3">
                <span className="text-sm font-semibold">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-neutral-100"
                  aria-label="Close menu"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <nav className="p-2">
                <SectionLabel>Content</SectionLabel>
                <ul className="space-y-1">
                  <NavItem item={nav[0]} active={pathname.startsWith(nav[0].href)} onNavigate={() => setOpen(false)} />
                </ul>
                <SectionLabel className="mt-4">Growth</SectionLabel>
                <ul className="space-y-1">
                  <NavItem item={nav[1]} active={pathname.startsWith(nav[1].href)} onNavigate={() => setOpen(false)} />
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="min-h-[calc(100vh-3.5rem)] bg-neutral-50">
          <div className="p-4 md:p-6">
            {/* Page header (breadcrumbs / actions) */}
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-neutral-500">
                Admin <span className="mx-1">/</span>
                <span className="font-medium text-neutral-900">
                  {formatCrumb(pathname) ?? 'Dashboard'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex h-9 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-sm hover:bg-neutral-100">
                  <PlusIcon className="h-4 w-4" />
                  New
                </button>
                <button className="inline-flex h-9 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-sm hover:bg-neutral-100">
                  <SlidersIcon className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>

            {children}

            {/* Footer */}
            <footer className="mt-10 border-t border-neutral-200 pt-4 text-xs text-neutral-500">
              <div className="flex flex-col items-start justify-between gap-2 md:flex-row">
                <p>© {new Date().getFullYear()} Your Agency Name. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <Link href="/privacy" className="hover:text-neutral-700">Privacy</Link>
                  <Link href="/terms" className="hover:text-neutral-700">Terms</Link>
                  <a href="mailto:hello@youragency.com" className="hover:text-neutral-700">Contact</a>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
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
  return <div className={`px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 ${className}`}>{children}</div>
}

function NavItem({
  item,
  active,
  onNavigate,
}: {
  item: { label: string; href: string; icon: (p: any) => JSX.Element }
  active?: boolean
  onNavigate?: () => void
}) {
  const Icon = item.icon
  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        className={`group relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition
        ${active ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'}`}
      >
        <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-700'}`} />
        <span className="font-medium">{item.label}</span>
        {active && <span className="absolute inset-y-0 right-0 w-1 rounded-r-xl bg-gradient-to-b from-indigo-500 to-fuchsia-500" />}
      </Link>
    </li>
  )
}

/* ---------- icons (inline, no deps) ---------- */
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
