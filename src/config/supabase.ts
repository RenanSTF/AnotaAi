import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lsutyjmahtfxqmjfqkpp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzdXR5am1haHRmeHFtamZxa3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NTM0NzgsImV4cCI6MjA1ODUyOTQ3OH0.ezQeuMsSEqvvERFEWMcnokmuWb5A1xND5OmPBNlB3Bk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 