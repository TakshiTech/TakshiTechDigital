import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';


export default async function AdminPage() {
  const supabase = await createClient(); // ✅ IMPORTANT

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/admin');

  return <main className="p-6"><h1 className="text-2xl font-bold">Admin Dashboard ✅</h1></main>;
}
