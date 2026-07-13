import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const isConfigured = process.env.SUPABASE_URL && 
                     process.env.SUPABASE_URL.startsWith('http') && 
                     process.env.SUPABASE_KEY && 
                     process.env.SUPABASE_KEY !== 'your_supabase_anon_key_here';

if (!isConfigured) {
  console.warn('\n⚠️  [MediScan Warning]: SUPABASE_URL or SUPABASE_KEY is not configured yet! Please edit backend/.env to add your actual Supabase URL and Key.\n');
}

const supabaseUrl = isConfigured ? process.env.SUPABASE_URL : 'https://placeholder-project-id.supabase.co';
const supabaseKey = isConfigured ? process.env.SUPABASE_KEY : 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
