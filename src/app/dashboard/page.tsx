import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';


export default async function DashboardPage() {
  const supabase = await createClient(); // ✅ IMPORTANT

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  // (optional) role-based redirect:
  const { data: p } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (p?.role === 'admin') redirect('/admin');

  return <main className="p-6"><h1 className="text-2xl font-bold">User Dashboard 👋</h1></main>;
}
