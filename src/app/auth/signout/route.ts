import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function POST(req: Request) {
  const url = new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
  const res = NextResponse.redirect(url)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.headers.get('cookie')?.split('; ')
            .find(c => c.startsWith(name + '='))?.split('=')[1]
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({ name, value: '', ...options, maxAge: 0 })
        },
      },
    }
  )

  await supabase.auth.signOut()
  return res
}
