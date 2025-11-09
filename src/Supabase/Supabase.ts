import { createClient } from '@supabase/supabase-js';
const supabaseUrl:any = 'https://hcrlummukhfelwjzppef.supabase.co';
const supabaseKey:any = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjcmx1bW11a2hmZWx3anpwcGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MjkwOTIsImV4cCI6MjAyOTAwNTA5Mn0.5xrvWoBzThRHBMOCzraxF03XUJ6dFlevUHHgjlY64D8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;