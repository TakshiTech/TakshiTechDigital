// src/lib/supabaseAdmin.ts
import 'server-only'; // guarantees this file is never bundled into client
import { createClient } from '@supabase/supabase-js';

// NOTE: service role must only be used on the server.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!, // rotate this key if it was exposed
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
