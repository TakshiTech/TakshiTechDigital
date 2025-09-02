import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// If you have a Database type, do: createClientComponentClient<Database>()
export const supabase = createClientComponentClient();
