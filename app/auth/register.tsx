
import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';
import { supabaseService } from '../../services/supabaseService';
import { router } from 'expo-router';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    console.log('Registration attempt:', { 
      name: name.trim(), 
      username: username.trim() 
    });
    setLoading(true);

    try {
      // Check if username is unique first
      const formattedUsername = username.startsWith('@') ? username : `@${username}`;
      const isUnique = await supabaseService.isUsernameUnique(formattedUsername);
      
      if (!isUnique) {
        Alert.alert('Error', 'This username is already taken. Please choose a different one.');
        setLoading(false);
        return;
      }

      const user = await supabaseService.createUser(name.trim(), username.trim(), password.trim());
      
      console.log('Registration successful:', user.username);
      Alert.alert(
        'Success', 
        `Account created successfully! Welcome to Falcon, ${user.name}!`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/auth/login')
          }
        ]
      );
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.message?.includes('already exists')) {
        Alert.alert('Error', 'This username is already taken. Please choose a different one.');
      } else {
        Alert.alert('Error', error.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDebugShowUsers = async () => {
    try {
      const users = await supabaseService.getAllUsers();
      const userList = users.map(u => `${u.name} (${u.username})`).join('\n');
      Alert.alert('All Users', userList || 'No users found');
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'Failed to fetch users');
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

  return (
    <KeyboardAvoidingView 
      style={commonStyles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.center}>
          <Text style={[commonStyles.title, { marginBottom: 8 }]}>Create Account</Text>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 40 }]}>
            Join Falcon and start messaging
          </Text>
        </View>

        <View style={{ marginBottom: 16 }}>
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <TextInput
            placeholder="Username (e.g., john or @john)"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={{ marginBottom: 32 }}>
          <TextInput
            placeholder="Password (min 6 characters)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Button
          title={loading ? "Creating Account..." : "Create Account"}
          onPress={handleRegister}
          disabled={loading}
          style={buttonStyles.primary}
        />

        <View style={[commonStyles.row, { marginTop: 24, justifyContent: 'center' }]}>
          <Text style={commonStyles.textSecondary}>Already have an account? </Text>
          <Button
            title="Sign In"
            onPress={() => router.push('/auth/login')}
            style={{ backgroundColor: 'transparent' }}
            textStyle={{ color: colors.primary }}
          />
        </View>

        {/* Debug Tools */}
        <View style={{ marginTop: 40, gap: 8 }}>
          <Button
            title="Debug: Show All Users"
            onPress={handleDebugShowUsers}
            style={{ backgroundColor: colors.cardBackground }}
            textStyle={{ color: colors.text, fontSize: 12 }}
          />
          <Button
            title="Debug: Clear All Data"
            onPress={handleDebugClearData}
            style={{ backgroundColor: '#ff4444' }}
            textStyle={{ color: 'white', fontSize: 12 }}
          />
        </View>

        {/* Info */}
        <View style={{ marginTop: 16, padding: 16, backgroundColor: colors.cardBackground, borderRadius: 8 }}>
          <Text style={[commonStyles.textSecondary, { fontSize: 12, textAlign: 'center' }]}>
            Usernames are unique across all devices. The @ symbol will be added automatically if not provided.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
