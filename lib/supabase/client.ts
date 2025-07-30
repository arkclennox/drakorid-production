import { createClient } from '@supabase/supabase-js';

// Helper function to get the appropriate Supabase client
export function getSupabaseClient(useServiceRole: boolean = false) {
  // Get environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  // Check if required environment variables are available
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing required Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  
  if (useServiceRole && !supabaseServiceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable for admin operations');
  }
  
  // Create and return the appropriate client
  const key = useServiceRole ? supabaseServiceRoleKey! : supabaseAnonKey;
  return createClient(supabaseUrl, key);
}

// Create default clients for backward compatibility
export const supabase = (() => {
  try {
    return getSupabaseClient(false);
  } catch {
    // Return null during build time when env vars might not be available
    return null;
  }
})();

export const supabaseAdmin = (() => {
  try {
    return getSupabaseClient(true);
  } catch {
    // Return null during build time when env vars might not be available
    return null;
  }
})();

export default supabase;