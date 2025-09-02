// ProjectsDashboard.tsx — sleek CRM dashboard for Next.js + Supabase
// Tailwind already set up. Install UI deps:
//   npm i @supabase/supabase-js date-fns lucide-react recharts
// Env: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
// Drop this file at: app/dashboard/projects/page.tsx  (App Router)

'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  addDays,
  endOfMonth,
  endOfToday,
  endOfWeek,
  format,
  isBefore,
  isWithinInterval,
  parseISO,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns';
import { Search, Plus, RefreshCcw, Trash2, CalendarDays, User2, Building2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

// ---------- Types ----------

type Project = {
  id: string;
  name: string;
  account: string | null;
  value: number | null;
  stage: 'LEAD' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST' | string;
  status: string;
  owner: string | null;
  due_date: string | null; // ISO date
  created_at: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const STAGES = ['LEAD', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST'];
const STAGE_COLORS = {
  LEAD: '#94a3b8',
  QUALIFIED: '#f59e0b',
  PROPOSAL: '#3b82f6',
  WON: '#22c55e',
  LOST: '#ef4444',
};

type RangeKey = 'today' | 'week' | 'month' | 'all';

// ---------- Page ----------

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('');
  const [range, setRange] = useState<RangeKey>('month');
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Partial<Project>>({ stage: 'LEAD', status: 'Open' });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    setProjects((data as any) || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // ----- Filtering -----
  const dateWindow = useMemo(() => getDateWindow(range), [range]);

  const visible = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = !search
        ? true
        : [p.name, p.account, p.owner, p.status]
            .filter(Boolean)
            .some((txt) => txt!.toLowerCase().includes(search.toLowerCase()));
      const matchesStage = stageFilter ? p.stage === stageFilter : true;
      const inRange = !dateWindow
        ? true
        : (() => {
            const d = p.due_date ? parseISO(p.due_date) : null;
            if (!d) return false;
            return isWithinInterval(d, dateWindow);
          })();
      return matchesSearch && matchesStage && inRange;
    });
  }, [projects, search, stageFilter, dateWindow]);

  // Fallback for cards/charts when filter hides everything
  const baseForStats = visible.length > 0 ? visible : projects;

  // ----- Derived: stage pie -----
  const stageCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of STAGES) map[s] = 0;
    for (const p of baseForStats) map[p.stage] = (map[p.stage] || 0) + 1;
    return STAGES.map((s) => ({ name: s, value: map[s] || 0, color: (STAGE_COLORS as any)[s] }));
  }, [baseForStats]);

  // ----- Derived: value by month line -----
  const valueByMonth = useMemo(() => {
    const buckets: Record<string, number> = {};
    for (const p of projects) {
      const d = parseISO(p.created_at);
      const key = format(d, 'MMM');
      buckets[key] = (buckets[key] || 0) + (p.value || 0);
    }
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months.map((m) => ({ month: m, value: Number((buckets[m] || 0).toFixed(2)) }));
  }, [projects]);

  // ----- Quick lists -----
  const today = startOfToday();
  const overdue = baseForStats.filter((p) => p.due_date && isBefore(parseISO(p.due_date!), today));
  const dueSoon = baseForStats.filter((p) => {
    if (!p.due_date) return false;
    const d = parseISO(p.due_date);
    return isWithinInterval(d, { start: today, end: addDays(today, 7) });
  });

  async function addProject(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    const payload = {
      name: form.name?.trim() || 'Untitled',
      account: form.account || null,
      value: form.value ? Number(form.value) : null,
      stage: (form.stage as string) || 'LEAD',
      status: form.status || 'Open',
      owner: form.owner || null,
      due_date: form.due_date || null,
    };
    const { data, error } = await supabase.from('projects').insert(payload).select('*').single();
    setAdding(false);
    if (error) return alert('Failed to add: ' + error.message);
    setProjects((prev) => [data as Project, ...prev]);
    setForm({ stage: 'LEAD', status: 'Open' });
  }

  async function updateProject(id: string, patch: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(patch)
      .eq('id', id)
      .select('*')
      .single();
    if (error) return alert('Update failed: ' + error.message);
    setProjects((prev) => prev.map((p) => (p.id === id ? (data as Project) : p)));
  }

  async function deleteProject(id: string) {
    if (!confirm('Delete this project?')) return;
    setDeletingId(id);
    const { error } = await supabase.from('projects').delete().eq('id', id);
    setDeletingId(null);
    if (error) return alert('Delete failed: ' + error.message);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f7fa] to-[#eef6ff]">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="hidden md:flex md:col-span-2 flex-col gap-3">
          <div className="rounded-2xl bg-white/70 backdrop-blur border p-4">
            <div className="text-xl font-semibold">panze</div>
          </div>
          <nav className="rounded-2xl bg-white/70 backdrop-blur border p-2">
            {[
              { label: 'Dashboard', icon: <CalendarDays className="size-4" /> },
              { label: 'Projects', icon: <Building2 className="size-4" /> },
              { label: 'Owners', icon: <User2 className="size-4" /> },
            ].map((i) => (
              <button key={i.label} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50">
                {i.icon}
                <span className="text-sm">{i.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="col-span-12 md:col-span-10">
          {/* Header */}
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm text-gray-500">Manage and track your projects</div>
              <h1 className="text-3xl font-bold tracking-tight">Project Dashboard</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(['today','week','month'] as RangeKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setRange(k)}
                  className={`px-4 py-2 rounded-xl border text-sm backdrop-blur ${
                    range === k ? 'bg-black text-white border-black' : 'bg-white/70 hover:bg-white'
                  }`}
                >
                  {labelForRange(k)}
                </button>
              ))}
              <button
                onClick={fetchProjects}
                className="px-3 py-2 rounded-xl border text-sm bg-white/70 hover:bg-white flex items-center gap-2"
              >
                <RefreshCcw className="size-4" /> Refresh
              </button>
            </div>
          </header>

          {/* Toolbar */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                placeholder="Search projects, accounts, owners..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border bg-white/70 backdrop-blur focus:outline-none focus:ring-2"
              />
            </div>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border bg-white/70 backdrop-blur"
            >
              <option value="">All stages</option>
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <form onSubmit={addProject} className="flex gap-2">
              <input
                required
                placeholder="New project name"
                value={form.name || ''}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="flex-1 px-3 py-2 rounded-xl border bg-white/70 backdrop-blur"
              />
              <button disabled={adding} className="px-4 py-2 rounded-xl bg-black text-white text-sm">
                <Plus className="inline size-4 mr-1" /> {adding ? 'Adding…' : 'Add'}
              </button>
            </form>
          </div>

          {/* Top widgets */}
          <section className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Tasks */}
            <div className="lg:col-span-4 rounded-2xl border bg-white/70 backdrop-blur p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">My Tasks</h3>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-black text-white">Today</span>
                  <span className="px-2 py-1 rounded-full border">Tomorrow</span>
                </div>
              </div>
              <TaskList title="Overdue" items={overdue} empty="No overdue tasks 🎉" />
              <div className="h-3" />
              <TaskList title="Due soon (7d)" items={dueSoon} empty="Nothing due soon" />
            </div>

            {/* Projects Overview (Pie) */}
            <div className="lg:col-span-4 rounded-2xl border bg-white/70 backdrop-blur p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Projects Overview</h3>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={stageCounts} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70}>
                      {stageCounts.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: any, n: any) => [v, n]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                {stageCounts.map((s) => (
                  <div key={s.name} className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ background: s.color }} />
                    <span>{s.name}: {s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Income vs Expense (Value over months) */}
            <div className="lg:col-span-4 rounded-2xl border bg-white/70 backdrop-blur p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Pipeline Value (by month)</h3>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={valueByMonth} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" interval={1} />
                    <YAxis tickFormatter={(v) => `₹${v}`} width={60} />
                    <Tooltip formatter={(v: any) => `₹${v}`} />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Table */}
          <div className="mt-6 overflow-x-auto rounded-2xl border bg-white/70 backdrop-blur">
            <table className="min-w-full text-sm">
              <thead className="text-gray-600">
                <tr>
                  <Th>Name</Th>
                  <Th>Account</Th>
                  <Th className="text-right">Value</Th>
                  <Th>Stage</Th>
                  <Th>Status</Th>
                  <Th>Owner</Th>
                  <Th>Due</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-gray-500">Loading…</td>
                  </tr>
                ) : (visible.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-gray-500">No projects found.</td>
                  </tr>
                ) : (
                  visible.map((p) => (
                    <tr key={p.id} className="odd:bg-white/0 even:bg-white/40">
                      <Td>
                        <InlineEdit value={p.name} onSave={(val) => updateProject(p.id, { name: val })} />
                        <div className="text-xs text-gray-400">{shortId(p.id)}</div>
                      </Td>
                      <Td>
                        <div className="flex items-center gap-2">
                          <Building2 className="size-4 text-gray-400" />
                          <InlineEdit value={p.account || ''} placeholder="—" onSave={(val) => updateProject(p.id, { account: val || null })} />
                        </div>
                      </Td>
                      <Td className="text-right">
                        <InlineEdit value={p.value?.toString() || ''} placeholder="—" type="number" onSave={(val) => updateProject(p.id, { value: val ? Number(val) : null })} />
                      </Td>
                      <Td>
                        <select value={p.stage} onChange={(e) => updateProject(p.id, { stage: e.target.value })} className={`px-2 py-1 rounded-lg border bg-white ${badgeClass(p.stage)}`}>
                          {STAGES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </Td>
                      <Td>
                        <InlineEdit value={p.status} onSave={(val) => updateProject(p.id, { status: val })} />
                      </Td>
                      <Td>
                        <InlineEdit value={p.owner || ''} placeholder="—" onSave={(val) => updateProject(p.id, { owner: val || null })} />
                      </Td>
                      <Td>
                        <InlineDate value={p.due_date} onSave={(val) => updateProject(p.id, { due_date: val })} />
                      </Td>
                      <Td>
                        <div className="flex items-center gap-2">
                          <button onClick={() => deleteProject(p.id)} disabled={deletingId === p.id} className="px-2 py-1 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50">
                            <Trash2 className="inline size-4" />
                          </button>
                        </div>
                      </Td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>

          {/* KPI cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {STAGES.map((s) => {
              const items = baseForStats.filter((p) => p.stage === s);
              const total = items.reduce((sum, p) => sum + (p.value || 0), 0);
              return (
                <div key={s} className="rounded-2xl border p-4 bg-white/70 backdrop-blur">
                  <div className="text-sm text-gray-500">{s}</div>
                  <div className="text-2xl font-semibold">{items.length}</div>
                  <div className="text-xs text-gray-500">₹ {total.toLocaleString()}</div>
                </div>
              );
            })}
          </div>

          {/* Quick add details */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Quick add details</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <input placeholder="Account" value={form.account || ''} onChange={(e) => setForm((f) => ({ ...f, account: e.target.value }))} className="px-3 py-2 rounded-xl border bg-white/70 backdrop-blur" />
              <input placeholder="Owner" value={form.owner || ''} onChange={(e) => setForm((f) => ({ ...f, owner: e.target.value }))} className="px-3 py-2 rounded-xl border bg-white/70 backdrop-blur" />
              <input type="number" placeholder="Value (₹)" value={(form.value as any as string) || ''} onChange={(e) => setForm((f) => ({ ...f, value: Number(e.target.value) }))} className="px-3 py-2 rounded-xl border bg-white/70 backdrop-blur" />
              <select value={(form.stage as string) || 'LEAD'} onChange={(e) => setForm((f) => ({ ...f, stage: e.target.value as any }))} className="px-3 py-2 rounded-xl border bg-white/70 backdrop-blur">
                {STAGES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input placeholder="Status" value={form.status || 'Open'} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="px-3 py-2 rounded-xl border bg-white/70 backdrop-blur" />
              <input type="date" value={form.due_date || ''} onChange={(e) => setForm((f) => ({ ...f, due_date: e.target.value }))} className="px-3 py-2 rounded-xl border bg-white/70 backdrop-blur" />
            </div>
          </section>

          <footer className="mt-10 text-xs text-gray-500">
            Tip: tighten RLS later by introducing a user_id column to projects and mapping to auth.users.
          </footer>
        </main>
      </div>
    </div>
  );
}

// ---------- Task List ----------

function TaskList({ title, items, empty }: { title: string; items: Project[]; empty: string }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-600 mb-2">{title}</h4>
      {items.length === 0 ? (
        <div className="text-xs text-gray-400 border rounded-xl p-3 bg-white/60">{empty}</div>
      ) : (
        <ul className="space-y-2 max-h-56 overflow-auto pr-1">
          {items.map((p) => (
            <li key={p.id} className="p-3 rounded-xl border bg-white/70 backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-medium text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    {p.account ? <><span>{p.account}</span><span>•</span></> : null}
                    <span>Due {p.due_date ? format(parseISO(p.due_date), 'dd MMM') : '—'}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-lg border ${badgeClass(p.stage)}`}>{p.stage}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------- UI helpers ----------

function Th({ children, className = '' }: any) {
  return <th className={`text-left font-medium px-4 py-3 ${className}`}>{children}</th>;
}
function Td({ children, className = '' }: any) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}

function shortId(id: string) {
  return id.split('-')[0];
}

function badgeClass(stage: string) {
  switch (stage) {
    case 'WON':
      return 'border-green-200 text-green-700';
    case 'LOST':
      return 'border-rose-200 text-rose-700';
    case 'PROPOSAL':
      return 'border-blue-200 text-blue-700';
    case 'QUALIFIED':
      return 'border-amber-200 text-amber-700';
    default:
      return 'border-gray-200 text-gray-700';
  }
}

function InlineEdit({
  value,
  onSave,
  placeholder,
  type = 'text',
}: {
  value: string;
  onSave: (val: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
}) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value || '');
  useEffect(() => setVal(value || ''), [value]);
  function commit() {
    if (val !== value) onSave(val);
    setEditing(false);
  }
  if (!editing) {
    return (
      <button onClick={() => setEditing(true)} className="text-left w-full hover:bg-gray-50 px-2 py-1 rounded-lg">
        {value ? value : <span className="text-gray-400">{placeholder || '—'}</span>}
      </button>
    );
  }
  return (
    <input
      type={type}
      autoFocus
      onBlur={commit}
      onKeyDown={(e) => (e.key === 'Enter' ? commit() : null)}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      className="w-full px-2 py-1 rounded-lg border"
      placeholder={placeholder}
    />
  );
}

function InlineDate({ value, onSave }: { value: string | null; onSave: (val: string | null) => void }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState<string | null>(value);
  useEffect(() => setVal(value), [value]);
  function commit() {
    if (val !== value) onSave(val);
    setEditing(false);
  }
  if (!editing) {
    return (
      <button onClick={() => setEditing(true)} className="text-left w-full hover:bg-gray-50 px-2 py-1 rounded-lg">
        {value ? format(parseISO(value), 'dd MMM yyyy') : <span className="text-gray-400">—</span>}
      </button>
    );
  }
  return (
    <input
      type="date"
      autoFocus
      onBlur={commit}
      onKeyDown={(e) => (e.key === 'Enter' ? commit() : null)}
      value={val || ''}
      onChange={(e) => setVal(e.target.value || null)}
      className="w-full px-2 py-1 rounded-lg border"
    />
  );
}

// ---------- utils ----------

function getDateWindow(range: RangeKey): { start: Date; end: Date } | null {
  switch (range) {
    case 'today':
      return { start: startOfToday(), end: endOfToday() };
    case 'week':
      return { start: startOfWeek(new Date(), { weekStartsOn: 1 }), end: endOfWeek(new Date(), { weekStartsOn: 1 }) };
    case 'month':
      return { start: startOfMonth(new Date()), end: endOfMonth(new Date()) };
    default:
      return null;
  }
}

function labelForRange(k: RangeKey) {
  switch (k) {
    case 'today':
      return 'Today';
    case 'week':
      return 'This Week';
    case 'month':
      return 'This Month';
    default:
      return 'All';
  }
}
