
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://odwcykjmcbeqayxjmxhv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kd2N5a2ptY2JlcWF5eGpteGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxMTY0MDMsImV4cCI6MjAzMzY5MjQwM30.5henQS0jIRzJJtC8om3Pw-tYUP0b-vv7TeAFEdfHOGI';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;