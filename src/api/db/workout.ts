import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(import.meta.env.VITE_API_KEY, import.meta.env.VITE_AUTH_DOMAIN);
