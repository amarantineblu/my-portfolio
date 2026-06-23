import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = import.meta.env.VITE_REACT_APP_SUPABASE_URL!;

const SUPABASE_ANON_KEY = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY!;
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
export default supabase;