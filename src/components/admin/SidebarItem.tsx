'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface SidebarItemProps {
  href?: string
  icon: React.ReactNode
  label: string
  danger?: boolean
  onClick?: () => void
  collapsed?: boolean
  title?: string
}

export default function SidebarItem({
  href,
  icon,
  label,
  danger,
  onClick,
  collapsed = false,
  title,
}: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = Boolean(href && pathname && pathname.startsWith(href))

  const base =
    'group relative flex items-center gap-3 px-3 py-2 rounded-lg select-none outline-none ' +
    'transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-white/60'

  const state = cn(
    'text-white/85 hover:text-white',
    isActive ? 'bg-white/15 shadow-inner' : 'hover:bg-white/10 active:bg-white/15',
    isActive &&
      'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:rounded-full before:bg-white/80',
    danger && 'text-red-100 hover:text-white hover:bg-red-500/20 focus-visible:ring-red-300'
  )

  const classes = cn(base, state)

  const Content = (
    <>
      <span
        className={cn(
          'grid place-items-center h-8 w-8 rounded-md',
          isActive ? 'bg-white/10' : 'bg-white/5 group-hover:bg-white/10',
          'transition-colors'
        )}
        aria-hidden
      >
        <span className="transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
          {icon}
        </span>
      </span>

      {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}

      {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden />}
    </>
  )

  if (onClick && !href) {
    return (
      <button type="button" onClick={onClick} className={classes} title={title ?? label} aria-label={label}>
        {Content}
      </button>
    )
  }

  return (
    <Link
      href={href || '#'}
      className={classes}
      title={title ?? label}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
    >
      {Content}
    </Link>
  )
}
