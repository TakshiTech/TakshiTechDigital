// next.config.ts
import type { NextConfig } from 'next'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseHostname = SUPABASE_URL ? new URL(SUPABASE_URL).hostname : ''

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: supabaseHostname, pathname: '/storage/v1/object/public/**' },
    ],
  },
}
export default config
