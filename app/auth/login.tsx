
import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { supabaseService } from '../../services/supabaseService';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log('Login attempt:', username);
    
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const user = await supabaseService.loginUser(username.trim(), password);
      
      if (user) {
        console.log('Login successful:', user.username);
        router.replace('/main/channels');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error: any) {
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
              Welcome Back
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 40 }]}>
              Sign in to Falcon
            </Text>

            <TextInput
              placeholder="Username"
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
                text={loading ? "Signing In..." : "Sign In"}
                onPress={handleLogin}
                style={buttonStyles.primary}
                disabled={loading}
              />
              
              <Button
                text="Create Account"
                onPress={() => router.push('/auth/register')}
                style={buttonStyles.secondary}
                textStyle={{ color: colors.primary }}
                disabled={loading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
