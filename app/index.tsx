
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { commonStyles } from '../styles/commonStyles';
import { storage } from '../data/storage';

export default function IndexScreen() {
  useEffect(() => {
    console.log('App starting, checking authentication');
    
    // Check if user is already logged in
    const currentUser = storage.getCurrentUser();
    
    if (currentUser) {
      console.log('User already logged in:', currentUser.username);
      router.replace('/main');
    } else {
      console.log('No user logged in, redirecting to login');
      router.replace('/auth/login');
    }
  }, []);

  return (
    <View style={[commonStyles.container, commonStyles.center]}>
      <Text style={commonStyles.title}>Falcon</Text>
      <Text style={commonStyles.textSecondary}>Loading...</Text>
    </View>
  );
}
