import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = "https://ddzengkcfjicbenklvfr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkemVuZ2tjZmppY2JlbmtsdmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0OTIwNzUsImV4cCI6MjA3MjA2ODA3NX0.b7DsJeG3i6mKwCuj7_eIkMlyLPvIjy9gQt9Lr77QZtM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
