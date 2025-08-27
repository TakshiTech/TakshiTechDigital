// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Supabase client usable in Middleware (use req/res cookies)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set(name, '', { ...options, maxAge: 0 });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  const { pathname } = new URL(req.url);
  const isAuth = pathname.startsWith('/auth');
  const isUserArea = pathname.startsWith('/dashboard');
  const isAdminArea = pathname.startsWith('/admin');

  // 1) Not logged in → block protected routes
  if (!session && (isUserArea || isAdminArea)) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // 2) Logged-in but NOT admin → block /admin
  if (session && isAdminArea) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .maybeSingle();

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // 3) Logged-in going to /auth → send to their home
  if (session && isAuth) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .maybeSingle();

    const target = profile?.role === 'admin' ? '/admin' : '/dashboard';
    return NextResponse.redirect(new URL(target, req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/auth/:path*'],
};
