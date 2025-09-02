'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';

// -------- Types --------
type Service = 'Digital Marketing' | 'Website Development';
const SERVICES: Service[] = ['Digital Marketing', 'Website Development'];

type Client = {
  id: number;                 // <- int8 in DB, so make it number (NOT string | number)
  name: string;
  email: string | null;
  phone?: string | null;
  company?: string | null;
  owner?: string | null;
  source?: string | null;
  notes?: string | null;
  is_active: boolean | null;
  joined_at: string | null;
  created_at: string | null;
  lead_id?: number | null;
  service?: Service | null;
};

function cn(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(' ');
}

// ---- Button ----
type BtnVariant = 'default' | 'outline' | 'soft' | 'danger';
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: BtnVariant;
};
function Button({ children, variant = 'default', className, ...rest }: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[.98] disabled:opacity-50';
  const styles: Record<BtnVariant, string> = {
    default: 'bg-blue-600 text-white hover:brightness-110',
    outline: 'bg-white text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-gray-50',
    soft: 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-gray-100',
    danger: 'bg-rose-600 text-white hover:brightness-110',
  };
  return (
    <button className={cn(base, styles[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [q, setQ] = useState('');
  const [serviceFilter, setServiceFilter] = useState<'' | Service>('');

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Details
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selected, setSelected] = useState<Client | null>(null);

  // Saving flags
  const [savingServiceId, setSavingServiceId] = useState<number | null>(null);

  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, page, serviceFilter]);

  async function fetchClients() {
    setLoading(true);
    try {
      let query = supabase.from('clients').select('*').order('created_at', { ascending: false });
      if (q.trim()) {
        query = query.or(
          `name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,company.ilike.%${q}%`
        );
      }
      if (serviceFilter) {
        query = query.eq('service', serviceFilter);
      }
      const { data, error } = await query.range(from, to);
      if (error) throw error;
      setClients((data || []) as Client[]);
    } catch (err: any) {
      console.error('fetchClients error:', err);
      toast.error(err?.message || 'Failed to load clients');
      setClients([]);
    } finally {
      setLoading(false);
    }
  }

  // ---- DELETE (id is number) ----
  async function deleteClient(id: number) {
    if (!confirm('Delete this client?')) return;
    try {
      const { data, error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)          // id is number → OK
        .select('id');         // verify rows actually deleted

      if (error) throw error;

      if (!data || data.length === 0) {
        toast.error('Delete failed: no rows matched this id (check RLS/policies).');
        return;
      }

      toast.success('Client deleted');
      await fetchClients();
      if (selected && selected.id === id) {
        setDetailsOpen(false);
        setSelected(null);
      }
    } catch (err: any) {
      console.error('deleteClient error:', err);
      toast.error(err?.message || 'Delete failed');
    }
  }

  // ---- UPDATE service (inline) ----
  async function updateService(client: Client, newValue: '' | Service) {
    if ((client.service ?? '') === newValue) return;

    try {
      setSavingServiceId(client.id);

      const updates: Partial<Client> = { service: (newValue || null) as Client['service'] };

      const { data: updated, error } = await supabase
        .from('clients')
        .update(updates as any)
        .eq('id', client.id)    // id is number
        .select()
        .single<Client>();

      if (error) {
        const extra = [error.details, error.hint, error.code].filter(Boolean).join(' | ');
        throw new Error(`${error.message}${extra ? ` (${extra})` : ''}`);
      }

      setClients(prev =>
        prev.map(c => (c.id === client.id ? { ...c, service: updated?.service ?? null } : c))
      );
      if (selected && selected.id === client.id) {
        setSelected({ ...selected, service: updated?.service ?? null });
      }

      toast.success('Service updated');
    } catch (err: any) {
      console.error('updateService error:', err);
      toast.error(err?.message || 'Update failed');
    } finally {
      setSavingServiceId(null);
    }
  }

  const activeCount = useMemo(() => clients.filter((c) => c.is_active).length, [clients]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Clients</h1>
            <p className="mt-1 text-sm text-gray-500">Converted & active customers</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">Active: {activeCount}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white/70 p-4 backdrop-blur-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
              placeholder="Search name, email, phone, company…"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/30"
            />
            <div className="flex items-center gap-2">
              <select
                value={serviceFilter}
                onChange={(e) => {
                  setPage(1);
                  setServiceFilter(e.target.value as Service | '');
                }}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="">All Services</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <Button
                variant="outline"
                onClick={() => {
                  setQ('');
                  setServiceFilter('');
                  setPage(1);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="max-h-[70vh] overflow-auto">
            <table className="min-w-full">
              <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <tr className="text-left text-sm text-gray-600">
                  {['Name','Email','Phone','Company','Service','Joined','Active',''].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      {Array.from({ length: 8 }).map((__, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 w-full max-w-[160px] animate-pulse rounded bg-gray-100" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : clients.length === 0 ? (
                  <tr>
                    <td className="px-4 py-10 text-center text-gray-500" colSpan={8}>
                      No clients found.
                    </td>
                  </tr>
                ) : (
                  clients.map((c) => (
                    <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50/60">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        <button
                          onClick={() => {
                            setSelected(c);
                            setDetailsOpen(true);
                          }}
                          className="underline decoration-dotted underline-offset-2 hover:text-blue-600"
                        >
                          {c.name}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{c.email ?? '-'}</td>
                      <td className="px-4 py-3 text-gray-700">{c.phone ?? '-'}</td>
                      <td className="px-4 py-3 text-gray-700">{c.company ?? '-'}</td>

                      {/* Editable Service cell */}
                      <td className="px-4 py-3">
                        <select
                          value={c.service ?? ''}
                          onChange={(e) => updateService(c, e.target.value as '' | Service)}
                          disabled={savingServiceId === c.id}
                          className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                          title="Change service"
                        >
                          <option value="">-</option>
                          {SERVICES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-4 py-3 text-gray-700">
                        {c.joined_at ? new Date(c.joined_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-4 py-3">{c.is_active ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => deleteClient(c.id)}
                            className="px-3 py-1 text-rose-600 hover:bg-rose-50"
                          >
                            Delete
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

        {/* Details Drawer */}
        {detailsOpen && selected && (
          <div className="fixed inset-0 z-50 flex">
            <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setDetailsOpen(false)} />
            <aside className="w-full max-w-md overflow-y-auto border-l border-gray-200 bg-white shadow-xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/80 p-4 backdrop-blur">
                <h3 className="text-base font-semibold text-gray-900">Client Details</h3>
                <button onClick={() => setDetailsOpen(false)} className="rounded-lg p-1 hover:bg-gray-100">
                  ✕
                </button>
              </div>

              <div className="p-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Name" value={selected.name} />
                <Field label="Email" value={selected.email || '-'} />
                <Field label="Phone" value={selected.phone || '-'} />
                <Field label="Company" value={selected.company || '-'} />
                <Field label="Owner" value={selected.owner || '-'} />
                <Field label="Source" value={selected.source || '-'} />

                {/* Editable service in drawer too */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="text-xs text-gray-500">Service</div>
                  <select
                    value={selected.service ?? ''}
                    onChange={async (e) => {
                      if (!selected) return;
                      await updateService(selected, e.target.value as '' | Service);
                    }}
                    disabled={savingServiceId === (selected?.id ?? -1)}
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  >
                    <option value="">-</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <Field
                  label="Joined"
                  value={selected.joined_at ? new Date(selected.joined_at).toLocaleDateString() : '-'}
                />
                <Field label="Active" value={selected.is_active ? 'Yes' : 'No'} />
                <div className="sm:col-span-2">
                  <div className="text-sm font-medium text-gray-700">Notes</div>
                  <div className="mt-1 whitespace-pre-wrap rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800">
                    {selected.notes || '—'}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-sm text-gray-900">{value}</div>
    </div>
  );
}
