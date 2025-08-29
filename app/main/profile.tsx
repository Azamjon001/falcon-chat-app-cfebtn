
import React, { useState } from 'react';
import { View, Text, Alert, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import ImagePickerButton from '../../components/ImagePicker';
import Icon from '../../components/Icon';
import { supabaseService } from '../../services/supabaseService';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const currentUser = supabaseService.getCurrentUser();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            console.log('Logging out...');
            await supabaseService.logoutUser();
            router.replace('/auth/login');
          }
        }
      ]
    );
  };

  const handleProfileImageUpdate = async (uri: string) => {
    console.log('Updating profile image:', uri);
    setLoading(true);
    
    try {
      const success = await supabaseService.updateUserProfile({ avatar: uri });
      if (success) {
        Alert.alert('Success', 'Profile picture updated successfully!');
      } else {
        Alert.alert('Error', 'Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
      Alert.alert('Error', 'Failed to update profile picture');
    } finally {
      setLoading(false);
    }
  };

  const handleBackgroundImageUpdate = async (uri: string) => {
    console.log('Updating background image:', uri);
    setLoading(true);
    
    try {
      const success = await supabaseService.updateUserProfile({ backgroundImage: uri });
      if (success) {
        Alert.alert('Success', 'Background image updated successfully!');
      } else {
        Alert.alert('Error', 'Failed to update background image');
      }
    } catch (error) {
      console.error('Error updating background image:', error);
      Alert.alert('Error', 'Failed to update background image');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <Text style={commonStyles.textSecondary}>Please log in to view your profile</Text>
        <Button
          text="Go to Login"
          onPress={() => router.replace('/auth/login')}
          style={buttonStyles.primary}
        />
      </View>
    );
  }

  return (
    <ScrollView style={commonStyles.container}>
      <View style={[commonStyles.content, { paddingTop: 60 }]}>
        <Text style={commonStyles.title}>Profile</Text>

        {/* Profile Picture Section */}
        <View style={[commonStyles.card, { alignItems: 'center' }]}>
          <View style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            {currentUser.avatar ? (
              <Image 
                source={{ uri: currentUser.avatar }} 
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            ) : (
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 32 }}>
                {currentUser.name.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          
          <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18 }]}>
            {currentUser.name}
          </Text>
          <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>
            {currentUser.username}
          </Text>

          <ImagePickerButton
            onImageSelected={handleProfileImageUpdate}
            title="Update Profile Picture"
            icon="camera-outline"
            style={[buttonStyles.secondary, { marginBottom: 8 }]}
          />

          <ImagePickerButton
            onImageSelected={handleBackgroundImageUpdate}
            title="Update Background"
            icon="image-outline"
            style={buttonStyles.secondary}
          />
        </View>

        {/* Account Info */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
            Account Information
          </Text>
          
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="person-outline" size={20} color={colors.textSecondary} />
            <Text style={[commonStyles.text, { marginLeft: 12 }]}>
              {currentUser.name}
            </Text>
          </View>
          
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="at-outline" size={20} color={colors.textSecondary} />
            <Text style={[commonStyles.text, { marginLeft: 12 }]}>
              {currentUser.username}
            </Text>
          </View>
          
          <View style={commonStyles.row}>
            <Icon name="calendar-outline" size={20} color={colors.textSecondary} />
            <Text style={[commonStyles.text, { marginLeft: 12 }]}>
              Joined {currentUser.createdAt.toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <View style={{ marginTop: 20, marginBottom: 40 }}>
          <Button
            text={loading ? "Updating..." : "Logout"}
            onPress={handleLogout}
            style={[buttonStyles.secondary, { borderColor: colors.error }]}
            textStyle={{ color: colors.error }}
            disabled={loading}
          />
        </View>
      </View>
    </ScrollView>
  );
}
