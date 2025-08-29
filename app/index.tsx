
import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { supabaseService } from '../services/supabaseService';

export default function Index() {
  useEffect(() => {
    // Check if user is already logged in
    const currentUser = supabaseService.getCurrentUser();
    
    setTimeout(() => {
      if (currentUser) {
        console.log('User already logged in, redirecting to channels');
        router.replace('/main/channels');
      } else {
        console.log('No user logged in, redirecting to login');
        router.replace('/auth/login');
      }
    }, 1000);
  }, []);

  return (
    <View style={[commonStyles.container, commonStyles.center]}>
      <Text style={commonStyles.title}>Falcon</Text>
      <Text style={commonStyles.textSecondary}>Loading...</Text>
    </View>
  );
}
