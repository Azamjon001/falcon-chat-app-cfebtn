
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import { supabaseService } from '../services/supabaseService';
import { testSupabaseConnection, testUserOperations } from '../utils/testConnection';
import Button from '../components/Button';

export default function IndexScreen() {
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking connection...');

  useEffect(() => {
    checkAppStatus();
  }, []);

  const checkAppStatus = async () => {
    try {
      console.log('Checking app status...');
      setConnectionStatus('Testing Supabase connection...');
      
      const connectionOk = await testSupabaseConnection();
      if (!connectionOk) {
        setConnectionStatus('Connection failed - check network');
        setLoading(false);
        return;
      }
      
      setConnectionStatus('Testing user operations...');
      const userOpsOk = await testUserOperations();
      if (!userOpsOk) {
        setConnectionStatus('User operations failed');
        setLoading(false);
        return;
      }
      
      setConnectionStatus('All systems ready!');
      
      // Check if user is already logged in
      const currentUser = supabaseService.getCurrentUser();
      if (currentUser) {
        console.log('User already logged in:', currentUser.username);
        router.replace('/main/channels');
      } else {
        console.log('No user logged in, redirecting to login');
        router.replace('/auth/login');
      }
    } catch (error) {
      console.error('Error checking app status:', error);
      setConnectionStatus('Startup error occurred');
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    checkAppStatus();
  };

  const handleForceLogin = () => {
    router.replace('/auth/login');
  };

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
          {connectionStatus}
        </Text>
      </View>
    );
  }

  return (
    <View style={[commonStyles.container, commonStyles.center]}>
      <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 16 }]}>
        Falcon
      </Text>
      <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 32 }]}>
        {connectionStatus}
      </Text>
      
      <View style={{ gap: 16 }}>
        <Button
          title="Retry Connection"
          onPress={handleRetry}
          style={{ backgroundColor: colors.primary }}
        />
        <Button
          title="Continue to Login"
          onPress={handleForceLogin}
          style={{ backgroundColor: colors.cardBackground }}
          textStyle={{ color: colors.text }}
        />
      </View>
    </View>
  );
}
