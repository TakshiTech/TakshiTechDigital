'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// ✅ singular file name use karo (aur alias ho to best)
import { supabase } from '../../../lib/supabase/clients'; 

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setMsg(error.message);

    // 🔑 role fetch karke redirect
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.replace('/auth/login');

    const { data: profile, error: pErr } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (pErr) console.warn('profile fetch error:', pErr?.message);
    const role = profile?.role ?? 'user';

    router.replace(role === 'admin' ? '/admin' : '/dashboard');
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (password.length < 6) return setMsg('Password must be at least 6 characters.');
    if (password !== confirm) return setMsg('Passwords do not match.');
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}` },
    });
    setLoading(false);
    if (error) return setMsg(error.message);
    setMsg('Account created! Check your email to verify, then sign in.');
    setMode('signin');
    setPassword('');
    setConfirm('');
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow">
        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 rounded-xl border px-3 py-2 ${mode==='signin' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            onClick={() => { setMode('signin'); setMsg(null); }}
          >
            Sign in
          </button>
          <button
            className={`flex-1 rounded-xl border px-3 py-2 ${mode==='signup' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            onClick={() => { setMode('signup'); setMsg(null); }}
          >
            Sign up
          </button>
        </div>

        {mode === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border rounded-xl px-3 py-2"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="your password"
              className="w-full border rounded-xl px-3 py-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl border px-3 py-2 hover:bg-gray-50"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border rounded-xl px-3 py-2"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="create password (min 6 chars)"
              className="w-full border rounded-xl px-3 py-2"
            />
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="confirm password"
              className="w-full border rounded-xl px-3 py-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl border px-3 py-2 hover:bg-gray-50"
            >
              {loading ? 'Creating…' : 'Create account'}
            </button>
          </form>
        )}

        {msg && <p className="text-sm mt-3">{msg}</p>}

        <div className="text-xs text-gray-500 mt-4">
          Tip: Supabase Auth → <strong>Providers</strong> me “Email” provider enable hona chahiye.
        </div>
      </div>
    </div>
  );
}
