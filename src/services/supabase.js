
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = '[supabase_url]'
const supabaseKey = '[your_supabase_key]'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
