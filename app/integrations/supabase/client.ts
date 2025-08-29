
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = "https://tsgscovvsjohsutpggip.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZ3Njb3Z2c2pvaHN1dHBnZ2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMzE1NDcsImV4cCI6MjA3MTcwNzU0N30.kEDgEeTL2YgCPzj1BlIUHJPZuN9mke6RiSWlKnWIJk4";

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
