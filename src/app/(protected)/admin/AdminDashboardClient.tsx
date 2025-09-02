"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

// ---------- Types ----------
type Heat = "Hot" | "Warm" | "Cold";

type LeadLite = {
  id: number | string;
  name: string;
  phone: string | null;
  email: string | null;
  owner?: string | null;
  status?: string | null;
};

type Props = {
  userId: string;
  role: string; // "user" expected here
};

// Enum normalization (if db has casing differences)
const DB_TO_UI: Record<string, Heat> = {
  hot: "Hot",
  Hot: "Hot",
  warm: "Warm",
  Warm: "Warm",
  cold: "Cold",
  Cold: "Cold",
};

const moneyINR = (paise: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format((paise || 0) / 100);

// ---------- Helpers ----------
function fmtDay(dateISO: string) {
  const d = new Date(dateISO);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function startOfTodayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function startOfMonthISO() {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function daysAgoISO(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

// ---------- Component ----------
export default function AdminDashboardClient({ userId, role }: Props) {
  const [userName, setUserName] = useState<string>("User");

  // Blogs
  const [published, setPublished] = useState<number>(0);
  const [drafts, setDrafts] = useState<number>(0);

  // Leads
  const [leadTotal, setLeadTotal] = useState(0);
  const [leadNewToday, setLeadNewToday] = useState(0);
  const [leadHot, setLeadHot] = useState(0);
  const [leadWarm, setLeadWarm] = useState(0);
  const [leadCold, setLeadCold] = useState(0);

  // Payments
  const [payTodayPaise, setPayTodayPaise] = useState(0);
  const [payMonthPaise, setPayMonthPaise] = useState(0);

  // Trends (for charts)
  const [leadTrend, setLeadTrend] = useState<{ day: string; leads: number }[]>([]); // last 14 days
  const [statusBreakdown, setStatusBreakdown] = useState<{ name: Heat; value: number }[]>([]);
  const [paymentTrend, setPaymentTrend] = useState<{ day: string; amount: number }[]>([]); // this month

  const [loading, setLoading] = useState(true);

  // ----- Modal state (top level) -----
  const [listOpen, setListOpen] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [listStatus, setListStatus] = useState<Heat>("Hot");
  const [listLeads, setListLeads] = useState<LeadLite[]>([]);

  // =========================== DATA FETCHERS ===========================

  const fetchUserName = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("full_name").eq("id", userId).single();
      if (error) throw error;
      setUserName(data?.full_name || "User");
    } catch (err) {
      console.error("Error fetching user name:", err);
      setUserName("User");
    }
  };

  const fetchBlogCounts = async () => {
    const [{ count: pubCount, error: pubErr }, { count: draftCount, error: draftErr }] =
      await Promise.all([
        supabase.from("blogs").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("blogs").select("id", { count: "exact", head: true }).eq("status", "draft"),
      ]);

    if (pubErr) console.error("Published count error:", pubErr);
    if (draftErr) console.error("Draft count error:", draftErr);

    setPublished(pubCount ?? 0);
    setDrafts(draftCount ?? 0);
  };

  const fetchLeadCounts = async () => {
    const startISO = startOfTodayISO();

    try {
      const [{ count: totalCount, error: totalErr }, { count: todayCount, error: todayErr }] =
        await Promise.all([
          supabase.from("leads").select("id", { count: "exact", head: true }),
          supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", startISO),
        ]);
      if (totalErr) console.error("Lead total error:", totalErr);
      if (todayErr) console.error("Lead today error:", todayErr);

      setLeadTotal(totalCount ?? 0);
      setLeadNewToday(todayCount ?? 0);

      const { data: statuses, error: sErr } = await supabase.from("leads").select("status");
      if (sErr) {
        console.error("Lead status fetch error:", sErr);
        setLeadHot(0);
        setLeadWarm(0);
        setLeadCold(0);
        setStatusBreakdown([]);
        return;
      }

      let hot = 0,
        warm = 0,
        cold = 0;
      (statuses ?? []).forEach((row: any) => {
        const ui = DB_TO_UI[row.status as string];
        if (ui === "Hot") hot++;
        else if (ui === "Warm") warm++;
        else if (ui === "Cold") cold++;
      });

      setLeadHot(hot);
      setLeadWarm(warm);
      setLeadCold(cold);
      setStatusBreakdown([
        { name: "Hot", value: hot },
        { name: "Warm", value: warm },
        { name: "Cold", value: cold },
      ]);
    } catch (err: any) {
      console.error("fetchLeadCounts failed:", err);
      setLeadTotal(0);
      setLeadNewToday(0);
      setLeadHot(0);
      setLeadWarm(0);
      setLeadCold(0);
      setStatusBreakdown([]);
    }
  };

  const fetchLeadTrend = async () => {
    try {
      const since = daysAgoISO(14);
      const { data, error } = await supabase
        .from("leads")
        .select("id, created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: true });
      if (error) throw error;

      const byDay = new Map<string, number>();
      (data || []).forEach((r: any) => {
        const key = fmtDay(r.created_at);
        byDay.set(key, (byDay.get(key) || 0) + 1);
      });

      const days: { day: string; leads: number }[] = [];
      for (let i = 14; i >= 0; i--) {
        const key = fmtDay(daysAgoISO(i));
        days.push({ day: key, leads: byDay.get(key) || 0 });
      }
      setLeadTrend(days);
    } catch (e) {
      console.error("fetchLeadTrend error", e);
      setLeadTrend([]);
    }
  };

  const fetchPaymentSumsAndTrend = async () => {
    try {
      const todayISO = startOfTodayISO();
      const monthISO = startOfMonthISO();

      let qToday = supabase
        .from("payments")
        .select("amount, created_at, date, status")
        .eq("status", "COMPLETED")
        .or(`created_at.gte.${todayISO},date.gte.${todayISO}`);

      let qMonth = supabase
        .from("payments")
        .select("amount, created_at, date, status")
        .eq("status", "COMPLETED")
        .or(`created_at.gte.${monthISO},date.gte.${monthISO}`);

      const [{ data: todayRows, error: tErr }, { data: monthRows, error: mErr }] = await Promise.all([qToday, qMonth]);
      if (tErr) throw tErr;
      if (mErr) throw mErr;

      const sumPaise = (rows: any[]) => (rows || []).reduce((acc, r) => acc + (Number(r?.amount) || 0), 0);

      setPayTodayPaise(sumPaise(todayRows || []));
      setPayMonthPaise(sumPaise(monthRows || []));

      const byDay = new Map<string, number>();
      (monthRows || []).forEach((r: any) => {
        const src = r.date || r.created_at;
        const key = fmtDay(src);
        byDay.set(key, (byDay.get(key) || 0) + (Number(r.amount) || 0));
      });

      const days: { day: string; amount: number }[] = [];
      const start = new Date(monthISO);
      const today = new Date();
      for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
        const key = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
        days.push({ day: key, amount: (byDay.get(key) || 0) / 100 });
      }
      setPaymentTrend(days);
    } catch (e: any) {
      console.error("fetchPaymentSumsAndTrend error:", e);
      setPayTodayPaise(0);
      setPayMonthPaise(0);
      setPaymentTrend([]);
    }
  };

  const refreshAll = async () => {
    await Promise.all([fetchUserName(), fetchBlogCounts(), fetchLeadCounts(), fetchPaymentSumsAndTrend(), fetchLeadTrend()]);
  };

  // ============================== EFFECTS ==============================

  useEffect(() => {
    let blogsCh: ReturnType<typeof supabase.channel> | null = null;
    let leadsCh: ReturnType<typeof supabase.channel> | null = null;
    let paysCh: ReturnType<typeof supabase.channel> | null = null;
    let mounted = true;

    (async () => {
      await refreshAll();
      if (!mounted) return;
      setLoading(false);

      blogsCh = supabase
        .channel(`blogs-counts-${userId}`)
        .on("postgres_changes", { event: "*", schema: "public", table: "blogs" }, fetchBlogCounts)
        .subscribe();

      leadsCh = supabase
        .channel(`leads-counts-${userId}`)
        .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => {
          fetchLeadCounts();
          fetchLeadTrend();
        })
        .subscribe();

      paysCh = supabase
        .channel(`payments-sum-${userId}`)
        .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, fetchPaymentSumsAndTrend)
        .subscribe();
    })();

    return () => {
      mounted = false;
      if (blogsCh) supabase.removeChannel(blogsCh);
      if (leadsCh) supabase.removeChannel(leadsCh);
      if (paysCh) supabase.removeChannel(paysCh);
    };
  }, [userId]);

  // ================================ UI =================================

  const StatCard = ({
    title,
    primary,
    sublabel,
    gradient,
    icon,
    onClick,
  }: {
    title: string;
    primary: string;
    sublabel?: string;
    gradient: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
    >
      <div className={`pointer-events-none absolute inset-0 ${gradient}`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-700">{title}</h2>
          <div className="text-xl">{icon}</div>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight">{loading ? "—" : primary}</div>
        {sublabel ? <div className="mt-1 text-xs text-gray-600">{sublabel}</div> : null}
      </div>
    </button>
  );

  async function openStatusList(status: Heat) {
    setListStatus(status);
    setListOpen(true);
    setListLoading(true);
    try {
      let { data, error } = await supabase
        .from("leads")
        .select("id,name,phone,email,owner,status")
        .eq("status", status)
        .order("created_at", { ascending: false })
        .limit(200);

      if (error) {
        const fb = await supabase
          .from("leads")
          .select("id,name,phone,email,owner,status")
          .ilike("status", status)
          .order("created_at", { ascending: false })
          .limit(200);
        data = fb.data as any;
        if (fb.error) throw fb.error;
      }

      setListLeads((data || []) as unknown as LeadLite[]);
    } catch (e: any) {
      console.error("openStatusList error:", e);
      setListLeads([]);
    } finally {
      setListLoading(false);
    }
  }

  const statusData = useMemo(
    () => [
      { name: "Hot", value: leadHot },
      { name: "Warm", value: leadWarm },
      { name: "Cold", value: leadCold },
    ],
    [leadHot, leadWarm, leadCold]
  );

  return (
    <div className="space-y-6">
      {/* Top heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome back, {userName}!
          </h1>
          <p className="mt-1 text-sm text-gray-600">Here's what's happening today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Blogs"
          primary={`${published}`}
          sublabel={`Drafts: ${loading ? "—" : drafts} • ${role === "admin" ? "All accounts" : "Your scope"}`}
          gradient="bg-gradient-to-r from-indigo-50/80 to-transparent"
          icon={<span>📝</span>}
        />

        <StatCard
          title="Payments"
          primary={moneyINR(payTodayPaise)}
          sublabel={`Today • This Month: ${moneyINR(payMonthPaise)}`}
          gradient="bg-gradient-to-r from-emerald-50/80 to-transparent"
          icon={<span>💳</span>}
        />

        <StatCard
          title="Leads (Total)"
          primary={`${leadTotal}`}
          sublabel={`New Today: ${loading ? "—" : leadNewToday}`}
          gradient="bg-gradient-to-r from-violet-50/80 to-transparent"
          icon={<span>👥</span>}
        />

        {/* Today highlight */}
        <div className="relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-fuchsia-50/80 to-transparent" />
          <div className="relative z-10 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-700">New Leads Today</h2>
            <span className="text-xl">⚡️</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <div className="text-3xl font-extrabold">{loading ? "—" : leadNewToday}</div>
            <span className="text-xs text-gray-500">since midnight</span>
          </div>
        </div>
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Payments this month */}
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">Payments (This Month)</h3>
            <span className="text-xs text-gray-500">Daily total</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={paymentTrend} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="pmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `₹${v.toLocaleString("en-IN")}`} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => moneyINR(Math.round(v * 100))} />
                <Area type="monotone" dataKey="amount" stroke="#6366f1" fillOpacity={1} fill="url(#pmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead creation trend */}
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">New Leads (Last 14 Days)</h3>
            <span className="text-xs text-gray-500">Daily count</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadTrend} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Status distribution */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Hot"
          primary={String(loading ? "—" : leadHot)}
          sublabel="Most interested"
          gradient="bg-gradient-to-r from-rose-50/80 to-transparent"
          icon={<span>🔥</span>}
          onClick={() => openStatusList("Hot")}
        />
        <StatCard
          title="Warm"
          primary={String(loading ? "—" : leadWarm)}
          sublabel="Engaged"
          gradient="bg-gradient-to-r from-amber-50/80 to-transparent"
          icon={<span>🧡</span>}
          onClick={() => openStatusList("Warm")}
        />
        <StatCard
          title="Cold"
          primary={String(loading ? "—" : leadCold)}
          sublabel="Low intent"
          gradient="bg-gradient-to-r from-sky-50/80 to-transparent"
          icon={<span>❄️</span>}
          onClick={() => openStatusList("Cold")}
        />
      </div>

      {/* Status bar chart */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Lead Status Breakdown</h3>
          <span className="text-xs text-gray-500">Tap a card above to view</span>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Center Modal: Status List ===== */}
      {listOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setListOpen(false)} />
          <div className="relative w-full max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900">{listStatus} Leads</span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{listLeads.length}</span>
              </div>
              <button
                className="rounded-lg p-1 hover:bg-gray-100"
                onClick={() => setListOpen(false)}
                aria-label="Close"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {listLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-12 animate-pulse rounded-xl bg-gray-100" />
                  ))}
                </div>
              ) : listLeads.length === 0 ? (
                <div className="py-10 text-center text-gray-500">No leads found.</div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {listLeads.map((l) => (
                    <li key={l.id} className="flex items-center justify-between py-3">
                      <div>
                        <div className="font-medium text-gray-900">{l.name}</div>
                        <div className="text-sm text-gray-600">
                          {l.phone || "—"} {l.email ? `• ${l.email}` : ""}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-gray-200 p-3">
              <button
                onClick={() => setListOpen(false)}
                className="rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
