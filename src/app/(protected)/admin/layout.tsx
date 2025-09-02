'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Home, LogOut, Newspaper, Users, AlertCircle,
  Search, Bell, ChevronDown, User as UserIcon, Settings as SettingsIcon,
  CheckCircle, X, Menu
} from 'lucide-react';
import { FaMoneyBill, FaPeopleCarry } from 'react-icons/fa';
import SidebarItem from '@/components/admin/SidebarItem';
import { supabase } from '@/lib/supabaseClient';

type SuggestItem = { id: number | string; title: string };

type NotificationRow = {
  id: string;
  user_id: string;
  event: string;
  title: string;
  body: string | null;
  data: any;
  read: boolean;
  created_at: string;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // --- auth/profile state ---
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // --- menus & popovers ---
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // --- notifs ---
  const [notifs, setNotifs] = useState<NotificationRow[]>([]);
  const unreadCount = useMemo(() => notifs.filter(n => !n.read).length, [notifs]);

  // --- search ---
  const [q, setQ] = useState('');
  const [suggest, setSuggest] = useState<SuggestItem[]>([]);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const suggestRef = useRef<HTMLFormElement>(null);

  // --- HR dropdown auto-open based on path ---
  const [hrOpen, setHrOpen] = useState<boolean>(pathname?.startsWith('/admin/hr') ?? false);
  useEffect(() => {
    if (pathname?.startsWith('/admin/hr')) setHrOpen(true);
  }, [pathname]);

  // close popovers on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (suggestRef.current && !suggestRef.current.contains(e.target as Node)) setSuggestOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // esc to close sidebar, lock scroll, close on route change
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSidebarOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => { setSidebarOpen(false); }, [pathname]);
  useEffect(() => {
    const { style } = document.body;
    const prev = style.overflow;
    if (sidebarOpen) style.overflow = 'hidden';
    return () => { style.overflow = prev; };
  }, [sidebarOpen]);

  // --- role guard + profile hydrate ---
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace('/login?redirectedFrom=/admin'); return; }

      // role check using API (cookie-based)
      const res = await fetch('/api/check-role', { credentials: 'include' });
      const json = await res.json();
      if (!res.ok || json.role !== 'admin') {
        router.replace('/dashboard'); // non-admins bounce
        return;
      }

      setUserId(user.id);
      setEmail(user.email ?? null);

      let fullName: string | null = null;
      let dp: string | null = null;
      const { data } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .maybeSingle();

      fullName = (data?.full_name as string | null) ?? null;
      dp = (data?.avatar_url as string | null) ?? null;

      const displayName =
        fullName ??
        (user.user_metadata as any)?.name ??
        (user.email ? user.email.split('@')[0] : 'Admin');

      const avatar =
        dp ??
        (user.user_metadata as any)?.avatar_url ??
        null;

      setName(displayName);
      setAvatarUrl(avatar);
      setChecking(false);
    })();
  }, [router]);

  // notifications
  useEffect(() => {
    if (!userId) return;

    const fetchNotifs = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(30);
      setNotifs((data as NotificationRow[]) || []);
    };
    fetchNotifs();

    const channel = supabase
      .channel('notifs-admin-' + userId)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
        (payload: any) => setNotifs(prev => [payload.new as NotificationRow, ...prev].slice(0, 50))
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  const markAllRead = async () => {
    const ids = notifs.filter(n => !n.read).map(n => n.id);
    if (!ids.length) return;
    const backup = notifs;
    setNotifs(prev => prev.map(n => ids.includes(n.id) ? { ...n, read: true } : n));
    const { error } = await supabase.from('notifications').update({ read: true }).in('id', ids);
    if (error) setNotifs(backup);
  };

  const deleteNotif = async (id: string) => {
    const backup = notifs;
    setNotifs(prev => prev.filter(n => n.id !== id));
    const { error } = await supabase.from('notifications').delete().eq('id', id);
    if (error) setNotifs(backup);
  };

  // search (blogs)
  useEffect(() => {
    const run = async () => {
      const term = q.trim();
      if (term.length < 2) { setSuggest([]); return; }
      const pattern = `%${term}%`;
      const { data, error } = await supabase
        .from('blogs')
        .select('id,title')
        .or(`title.ilike.${pattern},content.ilike.${pattern}`)
        .order('created_at', { ascending: false })
        .limit(5);
      if (!error && data) {
        setSuggest(data.map(b => ({ id: b.id as any, title: b.title || 'Untitled' })));
        setSuggestOpen(true);
      }
    };
    const t = setTimeout(run, 250);
    return () => clearTimeout(t);
  }, [q]);

  const submitSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const term = q.trim();
    if (!term) return;
    setSuggestOpen(false);
    router.push(`/admin/blogs?search=${encodeURIComponent(term)}`);
  };

  const initials = useMemo(() => {
    if (name) {
      const parts = name.trim().split(/\s+/);
      return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
    }
    if (email) return (email[0] || '').toUpperCase();
    return 'A';
  }, [name, email]);

  const timeAgo = (iso: string) => {
    const ms = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(ms / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    return `${days}d`;
  };

  // skeleton to avoid flash
  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-sm text-gray-500">Checking permissions…</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white shadow-lg">
        <Link href="/admin" className="flex items-center gap-3 p-6 border-b border-blue-600">
          <div className="relative h-10 w-10 rounded-xl bg-white/10 ring-1 ring-white/15 overflow-hidden">
            <Image src="/logo.svg" alt="WDB" fill className="object-contain p-1.5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold leading-tight">WDB</h1>
            <p className="text-[11px] text-blue-200 leading-tight">Admin Dashboard</p>
          </div>
        </Link>

        <nav className="flex flex-col gap-1 px-4 py-4 text-sm">
          <SidebarItem icon={<Home size={18} />} label="Dashboard" href="/admin" />
          <SidebarItem icon={<Newspaper size={18} />} label="Blogs" href="/admin/blogs" />
          <SidebarItem icon={<Users size={18} />} label="Clients" href="/admin/clients" />
          <SidebarItem icon={<AlertCircle size={18} />} label="Leads" href="/admin/leads" />
          <SidebarItem icon={<FaMoneyBill size={18} />} label="Payments" href="/admin/payments" />

          {/* HR dropdown */}
          <div className="mt-1">
            <button
              onClick={() => setHrOpen(v => !v)}
              className="w-full inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-white/10 transition"
              aria-expanded={hrOpen}
            >
              <FaPeopleCarry size={18} />
              <span className="flex-1 text-left">HR</span>
              <ChevronDown size={16} className={`transition ${hrOpen ? 'rotate-180' : ''}`} />
            </button>
            {hrOpen && (
              <div className="pl-6 pt-1 pb-2 space-y-1 text-[13px]">
                <SidebarItem icon={<Users size={16} />} label="Employees" href="/admin/hr/employees" />
                <SidebarItem icon={<CheckCircle size={16} />} label="Attendance" href="/admin/hr/attendance" />
                <SidebarItem icon={<UserIcon size={16} />} label="Leaves" href="/admin/hr/leaves" />
                <SidebarItem icon={<Newspaper size={16} />} label="Holidays" href="/admin/hr/holidays" />
              </div>
            )}
          </div>

          <button
            onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }}
            className="mt-2 inline-flex items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-white/10 transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <button className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar" />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-[20rem] bg-gradient-to-b from-blue-700 to-blue-800 text-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-blue-600">
              <Link href="/admin" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3">
                <div className="relative h-9 w-9 rounded-lg bg-white/10 ring-1 ring-white/15 overflow-hidden">
                  <Image src="/logo.svg" alt="WDB" fill className="object-contain p-1.5" />
                </div>
                <div>
                  <div className="text-base font-semibold leading-tight">WDB</div>
                  <div className="text-[10px] text-blue-200 leading-tight">Admin Dashboard</div>
                </div>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="rounded-md p-2 hover:bg-white/10" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-4 py-4 text-sm">
              <SidebarItem icon={<Home size={18} />} label="Dashboard" href="/admin" onClick={() => setSidebarOpen(false)} />
              <SidebarItem icon={<Newspaper size={18} />} label="Blogs" href="/admin/blogs" onClick={() => setSidebarOpen(false)} />
              <SidebarItem icon={<Users size={18} />} label="Clients" href="/admin/clients" onClick={() => setSidebarOpen(false)} />
              <SidebarItem icon={<AlertCircle size={18} />} label="Leads" href="/admin/leads" onClick={() => setSidebarOpen(false)} />
              <SidebarItem icon={<FaMoneyBill size={18} />} label="Payments" href="/admin/payments" onClick={() => setSidebarOpen(false)} />

              <button
                onClick={async () => { await supabase.auth.signOut(); setSidebarOpen(false); router.push('/login'); }}
                className="mt-2 inline-flex items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-white/10 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="h-16 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-3 min-w-0">
              <button
                className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
                aria-label="Open sidebar"
                aria-controls="mobile-sidebar"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </button>

              <div className="hidden md:block text-sm text-gray-500 truncate max-w-[200px]">{pathname}</div>

              <form onSubmit={submitSearch} className="relative hidden md:flex flex-1 min-w-[240px] max-w-[420px]" ref={suggestRef}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onFocus={() => suggest.length && setSuggestOpen(true)}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Search blogs…"
                />
                {suggestOpen && suggest.length > 0 && (
                  <div className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                    <ul className="max-h-72 overflow-auto py-1">
                      {suggest.map((s) => (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => { setSuggestOpen(false); router.push(`/admin/blogs/edit/${s.id}`); }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 truncate"
                            title={s.title}
                          >
                            {s.title}
                          </button>
                        </li>
                      ))}
                      <li className="border-t">
                        <button type="submit" className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50">
                          See all results for “{q}”
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </form>
            </div>

            <div className="ml-auto flex items-center gap-3">
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button className="relative rounded-full p-2 hover:bg-gray-100" title="Notifications" onClick={() => setNotifOpen(v => !v)}>
                  <Bell className="h-5 w-5 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-red-600 text-white text-[10px] grid place-items-center ring-2 ring-white">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 max-h-[70vh] overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="flex items-center justify-between px-3 py-2 border-b">
                      <div className="text-sm font-medium">Notifications</div>
                      <button onClick={markAllRead} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                        <CheckCircle className="h-3.5 w-3.5" /> Mark all read
                      </button>
                    </div>

                    {notifs.length === 0 ? (
                      <div className="p-4 text-sm text-gray-500">No notifications yet.</div>
                    ) : (
                      <ul className="divide-y">
                        {notifs.map(n => (
                          <li key={n.id} className={`px-3 py-2 hover:bg-gray-50 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="text-sm font-medium truncate">{n.title}</div>
                                {n.body && <div className="text-xs text-gray-600 truncate">{n.body}</div>}
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <div className="text-[10px] text-gray-500">{timeAgo(n.created_at)}</div>
                                <button onClick={() => deleteNotif(n.id)} className="p-1 rounded hover:bg-gray-100" title="Delete notification" aria-label="Delete notification">
                                  <X className="h-3.5 w-3.5 text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* User menu */}
              <div className="relative" ref={menuRef}>
                <button onClick={() => setMenuOpen(v => !v)} className="flex items-center gap-2 rounded-full border border-gray-200 bg-white pl-1 pr-3 py-1 hover:bg-gray-50">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarUrl} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white grid place-items-center text-xs font-semibold">
                      {initials}
                    </div>
                  )}
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium leading-tight">{name || 'Admin'}</div>
                    <div className="text-[11px] text-gray-500 leading-tight">{email || ''}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
                    <div className="px-3 py-2">
                      <div className="text-sm font-medium">{name || 'Admin'}</div>
                      <div className="text-xs text-gray-500 truncate">{email || ''}</div>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <button onClick={() => { setMenuOpen(false); router.push('/admin/profile'); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
                      <UserIcon className="h-4 w-4" /> Profile
                    </button>
                    <button onClick={() => { setMenuOpen(false); router.push('/admin/settings'); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
                      <SettingsIcon className="h-4 w-4" /> Settings
                    </button>
                    <div className="h-px bg-gray-100" />
                    <button
                      onClick={async () => { setMenuOpen(false); await supabase.auth.signOut(); router.push('/login'); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
