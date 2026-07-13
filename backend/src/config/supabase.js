import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const isConfigured = process.env.SUPABASE_URL && 
                     process.env.SUPABASE_URL.startsWith('http') && 
                     (process.env.SUPABASE_KEY || process.env.SUPERBASE_SECRET_KEY || process.env.SUPABASE_SECRET_KEY);

if (!isConfigured) {
  console.warn('\n⚠️  [MediScan Warning]: SUPABASE_URL is not configured yet! Please edit backend/.env to add your actual Supabase URL.\n');
}

const supabaseUrl = isConfigured ? process.env.SUPABASE_URL : 'https://placeholder-project-id.supabase.co';
const supabaseKey = isConfigured 
  ? (process.env.SUPERBASE_SECRET_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_KEY) 
  : 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
