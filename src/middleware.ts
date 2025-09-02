import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();
  const path = req.nextUrl.pathname;

  const isProtected =
    path.startsWith("/dashboard") || path.startsWith("/admin");

  // 1) Not logged in → send to login
  if (isProtected && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectedFrom", path);
    return NextResponse.redirect(url);
  }

  // 2) Logged in → fetch role once here
  if (isProtected && session) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .maybeSingle();

    const role = profile?.role ?? null;

    // safe fallback: no profile -> logout or block
    if (error || !role) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirectedFrom", path);
      return NextResponse.redirect(url);
    }

    // 3) Guard admin area
    if (path.startsWith("/admin") && role !== "admin") {
      // normal users trying admin -> send to user dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // 4) (Opinionated) Admin ko user dashboard par na dikhayein
    // force them to the admin area if they hit /dashboard
    if (path.startsWith("/dashboard") && role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
