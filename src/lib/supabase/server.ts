import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function supabaseServer() {
  const cookieStore = await cookies() // await is correct

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Next blocks cookie writes during RSC renders — allow only in actions/route
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // ignore: we're in a server component render path
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options, maxAge: 0 })
          } catch {
            // ignore in RSC
          }
        },
      },
    }
  )
}
