
import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { storage } from '../../data/storage';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
    
    // Check if username already exists
    const existingUsers = storage.searchUsers(formattedUsername);
    if (existingUsers.length > 0) {
      Alert.alert('Error', 'Username already exists');
      return;
    }

    setLoading(true);
    
    try {
      const user = storage.createUser(name.trim(), formattedUsername, password);
      
      if (user) {
        console.log('Registration successful:', user.username);
        Alert.alert(
          'Success', 
          'Account created successfully! You can now sign in.',
          [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
        );
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
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
              />
              
              <Button
                text="Back to Sign In"
                onPress={() => router.back()}
                style={buttonStyles.secondary}
                textStyle={{ color: colors.primary }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
