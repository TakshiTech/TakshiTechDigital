import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// avoid caching so cookies/session hamesha latest rahe
export const dynamic = "force-dynamic";
// export const runtime = "nodejs"; // (optional) force node runtime, if needed

export async function GET() {
  try {
    const cookieStore = cookies(); // ❌ no await
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore as any });

    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr) {
      return NextResponse.json({ error: userErr.message }, { status: 500 });
    }
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      // yahan typical error RLS/permission hota hai
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!profile) {
      return NextResponse.json({ error: "no-profile" }, { status: 403 });
    }

    return NextResponse.json({ role: profile.role }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "unexpected" }, { status: 500 });
  }
}
