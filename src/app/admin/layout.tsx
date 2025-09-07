// src/app/admin/layout.tsx
import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import type React from 'react'
import { AdminShell } from './_components/AdminShell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: me } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (me?.role !== 'admin') redirect('/login?reason=forbidden')

  return <AdminShell>{children}</AdminShell>
}
