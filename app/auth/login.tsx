
import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';
import { supabaseService } from '../../services/supabaseService';
import { router } from 'expo-router';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    console.log('Login attempt:', { username: username.trim() });
    setLoading(true);

    try {
      const user = await supabaseService.loginUser(username.trim(), password.trim());
      
      if (user) {
        console.log('Login successful, navigating to main');
        Alert.alert('Success', `Welcome back, ${user.name}!`, [
          {
            text: 'OK',
            onPress: () => router.replace('/main/channels')
          }
        ]);
      } else {
        console.log('Login failed - invalid credentials');
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
      <ScrollView contentContainerStyle={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.center}>
          <Text style={[commonStyles.title, { marginBottom: 8 }]}>Welcome Back</Text>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 40 }]}>
            Sign in to continue to Falcon
          </Text>
        </View>

        <View style={{ marginBottom: 24 }}>
          <TextInput
            placeholder="Username (e.g., @john)"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={{ marginBottom: 32 }}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Button
          text={loading ? "Signing In..." : "Sign In"}
          onPress={handleLogin}
          disabled={loading}
          style={buttonStyles.primary}
        />

        <View style={[commonStyles.row, { marginTop: 24, justifyContent: 'center' }]}>
          <Text style={commonStyles.textSecondary}>Don&apos;t have an account? </Text>
          <Button
            text="Sign Up"
            onPress={() => router.push('/auth/register')}
            style={{ backgroundColor: 'transparent', paddingVertical: 0, paddingHorizontal: 0, minHeight: 'auto' }}
            textStyle={{ color: colors.primary, fontWeight: '600' }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
