"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import Papa from "papaparse";

// -------------------- Types --------------------
type Heat = "Hot" | "Warm" | "Cold";

type Lead = {
  id: number | string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  owner: string | null;
  source: string | null;
  status: Heat;
  notes: string | null;
  last_contacted: string | null; // ISO
  created_at: string | null;
  deleted_at?: string | null; // NEW: soft-delete timestamp
};

const HEATS: Heat[] = ["Hot", "Warm", "Cold"];
const HEAT_BADGE: Record<Heat, string> = {
  Hot: "bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-200",
  Warm: "bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-200",
  Cold: "bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-200",
};

// -------------------- Small UI helpers --------------------
function cn(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

function Icon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "plus":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" />
        </svg>
      );
    case "upload":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
        </svg>
      );
    case "download":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l4-4m-4 4l-4-4M20 20H4" />
        </svg>
      );
    case "search":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
        </svg>
      );
    case "edit":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.1 2.1 0 012.97 2.97L8.25 18.04 4 20l1.96-4.25 10.902-12.263z" />
        </svg>
      );
    case "trash":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0V5a2 2 0 012-2h2a2 2 0 012 2v2" />
        </svg>
      );
    case "close":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    case "user":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
        </svg>
      );
    case "restore":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 101.68-5.25M3 4v5h5" />
        </svg>
      );
    case "bin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-9 0l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12" />
        </svg>
      );
    default:
      return null;
  }
}

function Button({
  children,
  onClick,
  variant = "default",
  className,
  type = "button",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "soft" | "outline" | "danger";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[.98] disabled:opacity-50 disabled:cursor-not-allowed";
  const styles = {
    default:
      "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm hover:brightness-[1.05] focus:outline-none focus:ring-2 focus:ring-blue-500/40",
    soft: "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-gray-100",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-gray-50",
    danger: "bg-rose-600 text-white hover:brightness-110",
  } as const;
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cn(base, styles[variant], className)}>
      {children}
    </button>
  );
}

// -------------------- Component --------------------
export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [trash, setTrash] = useState<Lead[]>([]); // NEW: soft-deleted rows
  const [loading, setLoading] = useState(true);

  // filters
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"" | Heat>("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // modal/form
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [form, setForm] = useState<Partial<Lead>>({ status: "Warm" });

  // details drawer
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selected, setSelected] = useState<Lead | null>(null);

  // csv import
  const fileRef = useRef<HTMLInputElement | null>(null);

  // convert state
  const [convertingId, setConvertingId] = useState<number | string | null>(null);

  // NEW: live counters
  const [counts, setCounts] = useState<{ Hot: number; Warm: number; Cold: number }>({
    Hot: 0,
    Warm: 0,
    Cold: 0,
  });

  // NEW: dump toggle
  const [showDump, setShowDump] = useState(false);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  useEffect(() => {
    fetchLeads();
    fetchCounters();
    if (showDump) fetchTrash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, status, page, showDump]);

  // realtime re-fetch on any change
  useEffect(() => {
    const channel = supabase
      .channel("public:leads")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => {
        fetchLeads();
        fetchCounters();
        if (showDump) fetchTrash();
      });

    channel.subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [showDump]);

  function applyTextFilter(query: any) {
    const t = q.trim();
    return t ? query.or(`name.ilike.%${t}%,email.ilike.%${t}%,phone.ilike.%${t}%,company.ilike.%${t}%`) : query;
  }

  async function fetchLeads() {
    setLoading(true);
    try {
      // Only non-deleted
      let query: any = supabase
        .from("leads")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });
      query = applyTextFilter(query);
      if (status) query = query.eq("status", status);
      const { data, error } = await query.range(from, to);
      if (error) throw error;
      setLeads((data || []) as Lead[]);
    } catch (err: any) {
      console.error("fetchLeads error:", err);
      toast.error(err?.message || "Failed to load leads");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }

  // counts for ALL rows matching search query (ignores pagination and ignores deleted)
  async function fetchCounters() {
    try {
      const hotQ = applyTextFilter(
        supabase.from("leads").select("id", { count: "exact", head: true }).is("deleted_at", null).eq("status", "Hot")
      );
      const warmQ = applyTextFilter(
        supabase.from("leads").select("id", { count: "exact", head: true }).is("deleted_at", null).eq("status", "Warm")
      );
      const coldQ = applyTextFilter(
        supabase.from("leads").select("id", { count: "exact", head: true }).is("deleted_at", null).eq("status", "Cold")
      );

      const [{ count: hot = 0 }, { count: warm = 0 }, { count: cold = 0 }] = await Promise.all([hotQ, warmQ, coldQ]);
      setCounts({ Hot: hot, Warm: warm, Cold: cold });
    } catch (err) {
      console.error("fetchCounters error:", err);
      setCounts({ Hot: 0, Warm: 0, Cold: 0 });
    }
  }

  // NEW: fetch trash (only deleted)
  async function fetchTrash() {
    try {
      let query: any = supabase
        .from("leads")
        .select("*")
        .not("deleted_at", "is", null)
        .order("deleted_at", { ascending: false });
      query = applyTextFilter(query);
      const { data, error } = await query;
      if (error) throw error;
      setTrash((data || []) as Lead[]);
    } catch (err: any) {
      console.error("fetchTrash error:", err);
      toast.error(err?.message || "Failed to load trash");
      setTrash([]);
    }
  }

  function resetFilters() {
    setQ("");
    setStatus("");
    setPage(1);
  }
  function openCreate() {
    setEditing(null);
    setForm({ status: "Warm" });
    setOpen(true);
  }
  function openEdit(l: Lead) {
    setEditing(l);
    setForm(l);
    setOpen(true);
  }
  function openDetails(l: Lead) {
    setSelected(l);
    setDetailsOpen(true);
  }

  async function saveLead(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !String(form.name).trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      if (editing) {
        const { error } = await supabase
          .from("leads")
          .update({
            name: form.name,
            email: form.email ?? null,
            phone: form.phone ?? null,
            company: form.company ?? null,
            owner: form.owner ?? null,
            source: form.source ?? null,
            status: (form.status as Heat) ?? "Warm",
            notes: form.notes ?? null,
            last_contacted: form.last_contacted ? new Date(form.last_contacted).toISOString() : null,
          })
          .eq("id", Number(editing.id));
        if (error) throw error;
        toast.success("Lead updated");
      } else {
        const { error } = await supabase
          .from("leads")
          .insert({
            name: form.name,
            email: form.email ?? null,
            phone: form.phone ?? null,
            company: form.company ?? null,
            owner: form.owner ?? null,
            source: form.source ?? null,
            status: (form.status as Heat) ?? "Warm",
            notes: form.notes ?? null,
            last_contacted: form.last_contacted ? new Date(form.last_contacted).toISOString() : null,
            deleted_at: null,
          })
          .select()
          .maybeSingle();
        if (error) throw error;
        toast.success("Lead created");
      }
      setOpen(false);
      await fetchLeads();
      await fetchCounters();
    } catch (err: any) {
      console.error("saveLead error:", err);
      toast.error(err?.message || "Save failed");
    }
  }

  // ---------- Soft Delete / Restore / Hard Delete ----------
  async function softDeleteLead(id: Lead["id"]) {
    if (!confirm("Move to Trash?")) return;
    await softDeleteLeadSilent(id);
  }

  async function softDeleteLeadSilent(id: Lead["id"]) {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", Number(id));
      if (error) throw error;
      toast.success("Moved to Trash");
      await fetchLeads();
      await fetchCounters();
      if (showDump) await fetchTrash();
      if (selected && Number(selected.id) === Number(id)) {
        setDetailsOpen(false);
        setSelected(null);
      }
    } catch (err: any) {
      console.error("softDeleteLead error:", err);
      toast.error(err?.message || "Failed to move to Trash");
    }
  }

  async function restoreLead(id: Lead["id"]) {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ deleted_at: null })
        .eq("id", Number(id));
      if (error) throw error;
      toast.success("Restored");
      await fetchLeads();
      if (showDump) await fetchTrash();
    } catch (err: any) {
      console.error("restoreLead error:", err);
      toast.error(err?.message || "Restore failed");
    }
  }

  async function hardDeleteLead(id: Lead["id"]) {
    if (!confirm("Permanently delete? This cannot be undone.")) return;
    try {
      const { error } = await supabase.from("leads").delete().eq("id", Number(id));
      if (error) throw error;
      toast.success("Deleted permanently");
      await fetchLeads();
      await fetchCounters();
      if (showDump) await fetchTrash();
    } catch (err: any) {
      console.error("hardDeleteLead error:", err);
      toast.error(err?.message || "Delete failed");
    }
  }

  // ---------- Convert to Client ----------
  async function convertToClient(lead: Lead, { deleteLeadAfter = true } = {}) {
    try {
      setConvertingId(lead.id);

      const payload = {
        name: lead.name,
        email: lead.email ?? null,
        is_active: true,
        joined_at: new Date().toISOString(),
        phone: lead.phone ?? null,
        company: lead.company ?? null,
        owner: lead.owner ?? null,
        source: lead.source ?? null,
        notes: lead.notes ?? null,
        lead_id: Number(lead.id),
      };

      const { error } = await supabase.from("clients").insert(payload).select().single();
      if (error) {
        const extra = [error.details, error.hint, error.code].filter(Boolean).join(" | ");
        throw new Error(`${error.message}${extra ? ` (${extra})` : ""}`);
      }

      if (deleteLeadAfter) {
        await softDeleteLeadSilent(lead.id); // silent soft delete (no confirm)
      }

      toast.success("Converted to client");
    } catch (err: any) {
      console.error("convertToClient error:", err);
      toast.error(err?.message || "Conversion failed");
    } finally {
      setConvertingId(null);
    }
  }

  // ---------- CSV helpers ----------
  function downloadCSV(csv: string, filename: string) {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function normalizeStatus(v: any): Heat {
    const s = String(v || "").trim().toLowerCase();
    if (s === "hot") return "Hot";
    if (s === "cold") return "Cold";
    return "Warm";
  }

  function normalizeDate(v: any): string | null {
    if (!v) return null;
    const raw = String(v).trim();
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return d.toISOString();
    const parts = raw.split("/");
    if (parts.length === 3) {
      let dd = parseInt(parts[0], 10);
      let mm = parseInt(parts[1], 10);
      const yyyy = parseInt(parts[2], 10);
      if (dd <= 12 && mm > 12) [dd, mm] = [mm, dd];
      const d2 = new Date(yyyy, (mm || 1) - 1, dd || 1);
      if (!isNaN(d2.getTime())) return d2.toISOString();
    }
    return null;
  }

  // Get ALL matching leads (filters respected), chunked — no pagination in UI
async function fetchAllMatchingLeads(
  { includeDeleted = false }: { includeDeleted?: boolean } = {}
) {
  const CHUNK = 1000;
  let from = 0;
  let to = CHUNK - 1;
  let all: Lead[] = [];

  // base query + filters
  const base = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  // apply text filter (q) on the builder
  let filtered: any = applyTextFilter(base);

  // status filter
  if (status) filtered = filtered.eq("status", status);

  // hide deleted when needed
  if (!includeDeleted) filtered = filtered.is("deleted_at", null);

  // chunked fetch
  while (true) {
    const { data, error } = await filtered.range(from, to);
    if (error) throw error;
    const batch = (data || []) as Lead[];
    all = all.concat(batch);
    if (batch.length < CHUNK) break; // last page
    from += CHUNK;
    to += CHUNK;
  }

  return all;
}

async function handleExportCSV() {
  try {
    // active (non-deleted) + current filters ke saath saare rows
    const all = await fetchAllMatchingLeads({ includeDeleted: false });

    if (!all || all.length === 0) {
      const template = [["name", "email", "phone", "company", "owner", "source", "status", "notes", "last_contacted"]];
      const csv = Papa.unparse(template as any);
      downloadCSV(csv, "leads_template.csv");
      toast.success("Template downloaded");
      return;
    }

    const rows = all.map((l) => ({
      name: l.name ?? "",
      email: l.email ?? "",
      phone: l.phone ?? "",
      company: l.company ?? "",
      owner: l.owner ?? "",
      source: l.source ?? "",
      status: l.status ?? "Warm",
      notes: l.notes ?? "",
      last_contacted: l.last_contacted ? new Date(l.last_contacted).toISOString().slice(0, 10) : "",
    }));

    const csv = Papa.unparse(rows as any);
    downloadCSV(csv, `leads_export_${rows.length}.csv`);
    toast.success(`Exported ${rows.length} lead(s)`);
  } catch (e: any) {
    console.error("export error", e);
    toast.error(e?.message || "Export failed");
  }
}


  async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const loadId = toast.loading("Parsing CSV…");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        toast.dismiss(loadId);

        const rows = results.data as any[];
        if (!rows.length) {
          toast.error("CSV seems empty");
          e.target.value = "";
          return;
        }

        const required = ["name"];
        const missing = required.filter((h) => !(h in rows[0]));
        if (missing.length) {
          toast.error(`Missing column(s): ${missing.join(", ")}`);
          e.target.value = "";
          return;
        }

        let payloads: any[] = [];
        try {
          payloads = rows.map((r, idx) => {
            const p = {
              name: String(r.name || "").trim(),
              email: r.email ? String(r.email).trim() : null,
              phone: r.phone ? String(r.phone).trim() : null,
              company: r.company ? String(r.company).trim() : null,
              owner: r.owner ? String(r.owner).trim() : null,
              source: r.source ? String(r.source).trim() : null,
              status: normalizeStatus(r.status),
              notes: r.notes ? String(r.notes).trim() : null,
              last_contacted: normalizeDate(r.last_contacted),
              deleted_at: null, // ensure imported rows are visible
            };
            if (!p.name) throw new Error(`Row ${idx + 2}: name is required`);
            return p;
          });
        } catch (err: any) {
          console.error("validation error:", err);
          toast.error(err?.message || "Validation failed");
          e.target.value = "";
          return;
        }

        const CHUNK = 500;
        try {
          toast.loading("Importing to database…", { id: "import-progress" });

          for (let i = 0; i < payloads.length; i += CHUNK) {
            const slice = payloads.slice(i, i + CHUNK);
            const { error } = await supabase.from("leads").insert(slice);
            if (error) throw error;
            toast.loading(`Imported ${Math.min(i + CHUNK, payloads.length)} / ${payloads.length}`, { id: "import-progress" });
          }

          toast.success(`Imported ${payloads.length} lead(s)`, { id: "import-progress" });
          await fetchLeads();
          await fetchCounters();
        } catch (err: any) {
          console.error("import error:", err);
          toast.error(err?.message || err?.details || "Import failed", { id: "import-progress" });
        } finally {
          e.target.value = "";
        }
      },
      error: (err) => {
        console.error("Papa parse error:", err);
        toast.error(err?.message || "Failed to parse CSV");
        e.target.value = "";
      },
    });
  }
  // ---------- CSV helpers end ----------

  // -------------------- UI --------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Leads</h1>
            <p className="mt-1 text-sm text-gray-500">Manage, filter & update your pipeline</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="soft" onClick={handleExportCSV}>
              <Icon name="download" className="h-4 w-4" /> Export CSV
            </Button>
            <Button variant="outline" onClick={() => fileRef.current?.click()}>
              <Icon name="upload" className="h-4 w-4" /> Import CSV
            </Button>
            <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleImportFile} />
            <Button onClick={openCreate}>
              <Icon name="plus" className="h-4 w-4" /> Add Lead
            </Button>
            {/* NEW: Trash toggle */}
            <Button variant="outline" onClick={() => setShowDump((s) => !s)} className={cn(showDump && "ring-2 ring-rose-400/40")}>
              <Icon name="bin" className="h-4 w-4" /> {showDump ? "Hide Trash" : "Open Trash"}
            </Button>
          </div>
        </div>

        {/* Filters (hidden when Trash open) */}
        {!showDump && (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white/70 p-4 backdrop-blur-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-96">
                <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  value={q}
                  onChange={(e) => {
                    setPage(1);
                    setQ(e.target.value);
                  }}
                  placeholder="Search name, email, phone, company…"
                  className="w-full rounded-xl border border-gray-200 bg-white px-10 py-2.5 text-sm shadow-sm outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={status}
                  onChange={(e) => {
                    setPage(1);
                    setStatus(e.target.value as Heat | "");
                  }}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="">All Priority</option>
                  {HEATS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <Button variant="outline" onClick={resetFilters}>Reset</Button>
              </div>
            </div>

            {/* Counters (live) */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {HEATS.map((s) => (
                <div key={s} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="text-xs text-gray-500">{s}</div>
                  <div className="mt-1 text-2xl font-semibold">{counts[s] ?? 0}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Table or Trash */}
        {!showDump ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="max-h-[70vh] overflow-auto">
              <table className="min-w-full">
                <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                  <tr className="text-left text-sm text-gray-600">
                    {["Name", "Email", "Phone", "Source", "Priority", "Last Contacted", ""].map((h) => (
                      <th key={h} className="px-4 py-3 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        {Array.from({ length: 7 }).map((__, j) => (
                          <td key={j} className="px-4 py-3">
                            <div className="h-4 w-full max-w-[160px] animate-pulse rounded bg-gray-100" />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : leads.length === 0 ? (
                    <tr>
                      <td className="px-4 py-10 text-center text-gray-500" colSpan={7}>
                        No leads found.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="border-t border-gray-100 hover:bg-gray-50/60">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          <button
                            onClick={() => openDetails(lead)}
                            className="underline decoration-dotted underline-offset-2 hover:text-blue-600"
                            title="View details"
                          >
                            {lead.name}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{lead.email ?? "-"}</td>
                        <td className="px-4 py-3 text-gray-700">{lead.phone ?? "-"}</td>
                        <td className="px-4 py-3 text-gray-700">{lead.source ?? "-"}</td>
                        <td className="px-4 py-3">
                          <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", HEAT_BADGE[lead.status])}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{lead.last_contacted ? new Date(lead.last_contacted).toLocaleDateString() : "-"}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <Button variant="soft" onClick={() => convertToClient(lead)} className="px-3 py-1" disabled={convertingId === lead.id}>
                              {convertingId === lead.id ? "Converting…" : "Convert → Client"}
                            </Button>
                            <Button variant="soft" onClick={() => openEdit(lead)} className="px-3 py-1">
                              <Icon name="edit" className="h-4 w-4" /> Edit
                            </Button>
                            <Button variant="outline" onClick={() => softDeleteLead(lead.id)} className="px-3 py-1 text-rose-600 hover:bg-rose-50">
                              <Icon name="trash" className="h-4 w-4" /> Move to Trash
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-3 border-t border-gray-200 bg-white/70 px-4 py-3">
              <div className="text-xs text-gray-500">Page {page}</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  Prev
                </Button>
                <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // -------------------- Trash View --------------------
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Trash (Dump)</h3>
                <p className="text-xs text-gray-500">Items here are hidden from Leads. Restore or delete permanently.</p>
              </div>
            </div>
            <div className="max-h-[70vh] overflow-auto">
              <table className="min-w-full">
                <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                  <tr className="text-left text-sm text-gray-600">
                    {["Name", "Email", "Phone", "Priority", "Deleted At", ""].map((h) => (
                      <th key={h} className="px-4 py-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {trash.length === 0 ? (
                    <tr>
                      <td className="px-4 py-10 text-center text-gray-500" colSpan={6}>
                        Trash is empty.
                      </td>
                    </tr>
                  ) : (
                    trash.map((lead) => (
                      <tr key={lead.id} className="border-t border-gray-100 hover:bg-gray-50/60">
                        <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                        <td className="px-4 py-3 text-gray-700">{lead.email ?? "-"}</td>
                        <td className="px-4 py-3 text-gray-700">{lead.phone ?? "-"}</td>
                        <td className="px-4 py-3">
                          <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", HEAT_BADGE[lead.status])}>{lead.status}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{lead.deleted_at ? new Date(lead.deleted_at).toLocaleString() : "-"}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <Button variant="soft" onClick={() => restoreLead(lead.id)} className="px-3 py-1">
                              <Icon name="restore" className="h-4 w-4" /> Restore
                            </Button>
                            <Button variant="danger" onClick={() => hardDeleteLead(lead.id)} className="px-3 py-1">
                              <Icon name="trash" className="h-4 w-4" /> Delete Forever
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Details Drawer */}
        {detailsOpen && selected && (
          <div className="fixed inset-0 z-50 flex">
            <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setDetailsOpen(false)} />
            <aside className="w-full max-w-md overflow-y-auto border-l border-gray-200 bg-white shadow-xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/80 p-4 backdrop-blur">
                <div className="flex items-center gap-2">
                  <Icon name="user" className="h-5 w-5 text-gray-500" />
                  <h3 className="text-base font-semibold text-gray-900">Lead Details</h3>
                </div>
                <button onClick={() => setDetailsOpen(false)} className="rounded-lg p-1 hover:bg-gray-100" title="Close">
                  <Icon name="close" className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="text-xs text-gray-500">Name</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">{selected.name}</div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Email" value={selected.email || "-"} />
                  <Field label="Phone" value={selected.phone || "-"} />
                  <Field label="Company" value={selected.company || "-"} />
                  <Field label="Owner" value={selected.owner || "-"} />
                  <Field label="Source" value={selected.source || "-"} />
                  <Field label="Priority" value={selected.status} badgeClass={HEAT_BADGE[selected.status]} />
                  <Field label="Last Contacted" value={selected.last_contacted ? new Date(selected.last_contacted).toLocaleDateString() : "-"} />
                  <Field label="Created" value={selected.created_at ? new Date(selected.created_at).toLocaleString() : "-"} />
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700">Notes</div>
                  <div className="mt-1 whitespace-pre-wrap rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800">
                    {selected.notes || "—"}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap justify-end gap-2">
                  <Button variant="soft" onClick={() => convertToClient(selected!)} disabled={convertingId === selected!.id}>
                    {convertingId === selected!.id ? "Converting…" : "Convert → Client"}
                  </Button>
                  <Button variant="outline" onClick={() => openEdit(selected!)}>
                    <Icon name="edit" className="h-4 w-4" /> Edit
                  </Button>
                  <Button variant="danger" onClick={() => softDeleteLead(selected!.id)}>
                    <Icon name="trash" className="h-4 w-4" /> Move to Trash
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <div className="relative w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{editing ? "Edit Lead" : "Add Lead"}</h2>
                <button onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-gray-100">
                  <Icon name="close" className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={saveLead} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm text-gray-700">Name *</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form.name ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form.email ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Phone</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form.phone ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Company</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form.company ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Owner</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form.owner ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, owner: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Source</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form.source ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Priority</label>
                  <select
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form.status ?? "Warm"}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Heat }))}
                  >
                    {HEATS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-700">Last Contacted</label>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form.last_contacted ? String(form.last_contacted).slice(0, 10) : ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        last_contacted: e.target.value ? new Date(e.target.value).toISOString() : null,
                      }))
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-700">Notes</label>
                  <textarea
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form.notes ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  />
                </div>

                <div className="md:col-span-2 mt-2 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit">{editing ? "Save Changes" : "Create Lead"}</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, badgeClass }: { label: string; value: string; badgeClass?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      {badgeClass ? (
        <span className={cn("mt-1 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium", badgeClass)}>
          {value}
        </span>
      ) : (
        <div className="mt-1 text-sm text-gray-900">{value}</div>
      )}
    </div>
  );
  
}
