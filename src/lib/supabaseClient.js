import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://dapahckzdflctubdvhuz.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhcGFoY2t6ZGZsY3R1YmR2aHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxODk1NzcsImV4cCI6MjEwMTc2NTU3N30.AiZrvXUmfPDdlT-Pa9me2wQbsPDDRKdZ2FOa2hPwsfg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
