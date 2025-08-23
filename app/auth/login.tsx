
import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { storage } from '../../data/storage';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log('Login attempt:', { username });
    
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const user = storage.loginUser(username.trim(), password);
      
      if (user) {
        console.log('Login successful, navigating to main app');
        router.replace('/main');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
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
              Welcome to Falcon
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 40 }]}>
              Sign in to continue
            </Text>

            <TextInput
              placeholder="Username (e.g., @john_doe)"
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

            <View style={commonStyles.buttonContainer}>
              <Button
                text={loading ? "Signing in..." : "Sign In"}
                onPress={handleLogin}
                style={buttonStyles.primary}
              />
              
              <Button
                text="Create Account"
                onPress={() => router.push('/auth/register')}
                style={buttonStyles.secondary}
                textStyle={{ color: colors.primary }}
              />
            </View>

            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 20 }]}>
              Demo accounts: @john_doe, @jane_smith, @bob_wilson{'\n'}
              Password: password123
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
