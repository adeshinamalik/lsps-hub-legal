
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase URL and Key not available in environment variables. Some features may not work correctly.");
}

export const supabase = createClient(
    supabaseUrl || "https://wiyunkyzqihfdoesfmcw.supabase.co",
    supabaseKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpeXVua3l6cWloZmRvZXNmbWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NzU3MzEsImV4cCI6MjA1ODU1MTczMX0.pywm5FywKtZJ9cLr3Z6kd0lZpyY2L6gHqOutI_t91EI"
);
