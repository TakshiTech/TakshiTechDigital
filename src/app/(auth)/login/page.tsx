"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- Login submit ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setSubmitting(false);
      setError(error.message);
      toast.error("❌ " + error.message);
      return;
    }

    // Full page reload so auth cookies are visible to server pages.
    const backParam = new URLSearchParams(window.location.search).get("redirectedFrom");
    const target = backParam && backParam.startsWith("/") ? backParam : "/dashboard";
    window.location.replace(target);
  };

  // --- Password reset ---
  const handleForgot = async () => {
    if (!email) {
      toast.error("⚠️ Pehle email daalo (enter email first)");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      if (
        error.message.includes("User not found") ||
        error.message.includes("Invalid login credentials") ||
        error.message.includes("Email not found")
      ) {
        toast.error("❌ Yeh email registered nahi hai");
      } else {
        toast.error("❌ " + error.message);
      }
    } else {
      toast.success("📧 Password reset email sent to " + email);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white">
      <Toaster position="top-center" />

      {/* Decorative background */}
      <DecorativeBackground />

      {/* Top branding */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Takshi Tech Digital" className="h-10 w-10 rounded-lg ring-1 ring-white/15" />
          <div className="hidden sm:block">
            <p className="text-xs font-medium tracking-wide text-white/80">Takshi Tech Digital</p>
            <p className="-mt-0.5 text-[10px] uppercase tracking-[.2em] text-white/40">TTD Platform</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-xs text-white/60 sm:flex">
          <ShieldIcon className="h-4 w-4" /> Secure by Supabase
        </div>
      </div>

      {/* Main grid */}
      <main className="relative z-20 mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-28 sm:px-6 md:grid-cols-2 md:py-36">
        {/* Left: Hero copy */}
        <section className="order-2 md:order-1">
          <div className="mx-auto max-w-lg text-center md:text-left">
            <h1 className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-5xl">
              Welcome back to <span className="font-extrabold">TTD</span>
            </h1>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
               Access to Dashboard, Blog Admin, Leads, etc.
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
              {[
                "Role-based access",
                "Magic link & password",
                "2FA ready",
                "Server-side sessions",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Right: Auth card (pure Tailwind, no shadcn) */}
        <section className="order-1 md:order-2">
          <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <h2 className="mb-6 text-center text-xl font-semibold">Login to TTD</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="grid gap-2">
                <label htmlFor="email" className="text-white/80">Email</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                    <MailIcon className="h-4 w-4" />
                  </span>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    disabled={submitting}
                    className="w-full rounded-lg border border-white/15 bg-white/10 py-2.5 pl-9 pr-3 text-sm text-white placeholder-white/40 outline-none ring-0 transition focus:border-emerald-400/60 focus:bg-white/15"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <label htmlFor="password" className="text-white/80">Password</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                    <LockIcon className="h-4 w-4" />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    disabled={submitting}
                    className="w-full rounded-lg border border-white/15 bg-white/10 py-2.5 pl-9 pr-10 text-sm text-white placeholder-white/40 outline-none ring-0 transition focus:border-emerald-400/60 focus:bg-white/15"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/60 hover:text-white"
                    disabled={submitting}
                  >
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Row: remember + forgot */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-white/70 select-none">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-white/30 bg-white/10 text-emerald-500 focus:ring-0" />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={handleForgot}
                  className="underline-offset-4 text-white/70 hover:text-white hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Error */}
              {error && (
                <p className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2.5 text-base font-semibold text-emerald-950 shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition hover:brightness-110 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              {/* Footer helper */}
              <p className="text-center text-xs text-white/60">
                Having trouble? {" "}
                <a href="mailto:support@webdigitalbazaar.com" className="text-white underline">Contact Support</a>
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-20 mx-auto mb-6 mt-2 w-full max-w-6xl px-4 text-center text-xs text-white/50 sm:text-right">
        © 2025 Takshi Tech Digital. All rights reserved.
      </footer>
    </div>
  );
}

function DecorativeBackground() {
  return (
    <>
      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_60%)]" />

      {/* Floating gradient blobs */}
      <div className="absolute -left-40 -top-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 blur-3xl" />
      <div className="absolute -right-32 top-1/4 h-[28rem] w-[28rem] animate-pulse rounded-full bg-gradient-to-br from-indigo-500/25 to-purple-500/25 blur-3xl [animation-delay:200ms]" />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* Subtle noise */}
      <div aria-hidden className="absolute inset-0 opacity-[0.07] mix-blend-soft-light" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\' /></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.5\'/></svg>')" }} />
    </>
  );
}

/* --- Tiny inline SVG icon components (no external deps) --- */
function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m22 6-10 7L2 6" />
    </svg>
  );
}

function LockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <rect x="4" y="11" width="16" height="9" rx="2" strokeWidth="2" />
      <path strokeWidth="2" strokeLinecap="round" d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
    </svg>
  );
}

function EyeOffIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m3 3 18 18" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6 0 10 7 10 7a18 18 0 0 1-3.6 4.5M6.6 6.6A18 18 0 0 0 2 12s4 7 10 7c1.3 0 2.6-.3 3.8-.8" />
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
    </svg>
  );
}

function ShieldIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
    </svg>
  );
}

function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`animate-spin ${className}`}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2" fill="none" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" fill="none" />
    </svg>
  );
}
