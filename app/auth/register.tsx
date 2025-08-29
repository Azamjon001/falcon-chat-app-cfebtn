
import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { supabaseService } from '../../services/supabaseService';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDebugShowUsers = async () => {
    try {
      const users = await supabaseService.getAllUsers();
      const userList = users.map(u => `${u.username} (${u.name})`).join('\n');
      Alert.alert('Debug: All Users', userList || 'No users found');
    } catch (error) {
      console.error('Debug error:', error);
      Alert.alert('Debug Error', 'Failed to fetch users');
    }
  };

  const handleDebugClearData = async () => {
    Alert.alert(
      'Clear All Data',
      'This will delete ALL users, channels, and messages. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            const success = await supabaseService.clearAllData();
            Alert.alert(success ? 'Success' : 'Error', success ? 'All data cleared' : 'Failed to clear data');
          }
        }
      ]
    );
  };

  const handleRegister = async () => {
    console.log('Registration attempt:', { name, username });
    
    if (!name.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    const formattedUsername = username.startsWith('@') ? username : `@${username}`;
    
    setLoading(true);
    
    try {
      console.log('Checking username uniqueness for:', formattedUsername);
      
      // Check if username is unique
      const isUnique = await supabaseService.isUsernameUnique(formattedUsername);
      console.log('Username uniqueness result:', isUnique);
      
      if (!isUnique) {
        console.log('Username is already taken:', formattedUsername);
        Alert.alert('Error', 'This username is already taken. Please choose a different one.');
        return;
      }

      console.log('Creating user with unique username:', formattedUsername);
      const user = await supabaseService.createUser(name.trim(), formattedUsername, password);
      
      if (user) {
        console.log('Registration successful:', user.username);
        Alert.alert(
          'Success', 
          'Account created successfully! You can now sign in.',
          [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
        );
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.message || 'Registration failed. Please try again.';
      
      // Show more specific error messages
      if (errorMessage.includes('Username already exists')) {
        Alert.alert('Error', 'This username is already taken. Please choose a different one.');
      } else if (errorMessage.includes('Failed to check username')) {
        Alert.alert('Error', 'Unable to verify username availability. Please check your connection and try again.');
      } else {
        Alert.alert('Error', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={commonStyles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[commonStyles.content, commonStyles.center]}>
          <View style={{ width: '100%', maxWidth: 400 }}>
            <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 8 }]}>
              Create Account
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 40 }]}>
              Join Falcon today
            </Text>

            <TextInput
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <TextInput
              placeholder="Username (e.g., john_doe)"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <View style={commonStyles.buttonContainer}>
              <Button
                text={loading ? "Creating Account..." : "Create Account"}
                onPress={handleRegister}
                style={buttonStyles.primary}
                disabled={loading}
              />
              
              <Button
                text="Back to Sign In"
                onPress={() => router.back()}
                style={buttonStyles.secondary}
                textStyle={{ color: colors.primary }}
                disabled={loading}
              />

              {/* Debug buttons - remove in production */}
              <View style={{ marginTop: 20, opacity: 0.5 }}>
                <Button
                  text="Debug: Show All Users"
                  onPress={handleDebugShowUsers}
                  style={[buttonStyles.secondary, { marginBottom: 8 }]}
                  textStyle={{ color: colors.textSecondary, fontSize: 12 }}
                />
                <Button
                  text="Debug: Clear All Data"
                  onPress={handleDebugClearData}
                  style={buttonStyles.secondary}
                  textStyle={{ color: colors.error, fontSize: 12 }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
