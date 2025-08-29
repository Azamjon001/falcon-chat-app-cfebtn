
import { supabase } from '../app/integrations/supabase/client';

export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('app_users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Exception testing Supabase connection:', error);
    return false;
  }
};

export const testUserOperations = async () => {
  try {
    console.log('Testing user operations...');
    
    // Test fetching users
    const { data: users, error } = await supabase
      .from('app_users')
      .select('id, username, name')
      .limit(5);
    
    if (error) {
      console.error('Error fetching users:', error);
      return false;
    }
    
    console.log('Users fetched successfully:', users?.length || 0);
    return true;
  } catch (error) {
    console.error('Exception testing user operations:', error);
    return false;
  }
};
