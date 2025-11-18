import { createClient } from "@supabase/supabase-js";

const URL ='https://hvjqugtkqvnllrpgriec.supabase.co'
const API_KEY ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anF1Z3RrcXZubGxycGdyaWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNTA1MTksImV4cCI6MjA3ODYyNjUxOX0.1slBFJdkhHq4Sibs6_iqTE4ZOWkeUY_u0oWKo44ugFo'

export const supabase = createClient(URL, API_KEY)