
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { commonStyles } from '../styles/commonStyles';
import { storage } from '../data/storage';

export default function IndexScreen() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log('App starting, checking authentication');
    
    // Add a small delay to ensure the layout is mounted
    const timer = setTimeout(() => {
      // Check if user is already logged in
      const currentUser = storage.getCurrentUser();
      
      if (currentUser) {
        console.log('User already logged in:', currentUser.username);
        router.replace('/main');
      } else {
        console.log('No user logged in, redirecting to login');
        router.replace('/auth/login');
      }
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[commonStyles.container, commonStyles.center]}>
      <Text style={commonStyles.title}>Falcon</Text>
      <Text style={commonStyles.textSecondary}>Loading...</Text>
    </View>
  );
}
