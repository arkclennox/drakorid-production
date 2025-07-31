'use client'

import { createClient } from '@supabase/supabase-js'
import { Database } from './schema'

// Create a single supabase client for interacting with your database
export const supabaseBrowser = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default supabaseBrowser