
import React, { useState } from 'react';
import { View, Text, Alert, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import ImagePickerButton from '../../components/ImagePicker';
import { storage } from '../../data/storage';

export default function ProfileScreen() {
  const [currentUser, setCurrentUser] = useState(storage.getCurrentUser());

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('User logging out');
            storage.logoutUser();
            router.replace('/auth/login');
          },
        },
      ]
    );
  };

  const handleProfileImageUpdate = (uri: string) => {
    console.log('Updating profile image:', uri);
    const success = storage.updateUserProfile({ avatar: uri });
    if (success) {
      setCurrentUser(storage.getCurrentUser());
      Alert.alert('Success', 'Profile picture updated!');
    } else {
      Alert.alert('Error', 'Failed to update profile picture');
    }
  };

  const handleBackgroundImageUpdate = (uri: string) => {
    console.log('Updating background image:', uri);
    const success = storage.updateUserProfile({ backgroundImage: uri });
    if (success) {
      setCurrentUser(storage.getCurrentUser());
      Alert.alert('Success', 'Background image updated!');
    } else {
      Alert.alert('Error', 'Failed to update background image');
    }
  };

  if (!currentUser) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <Text style={commonStyles.text}>Not logged in</Text>
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
      {/* Background Image Section */}
      <View style={{ 
        height: 200, 
        backgroundColor: colors.backgroundAlt,
        position: 'relative',
      }}>
        {currentUser.backgroundImage ? (
          <Image 
            source={{ uri: currentUser.backgroundImage }} 
            style={{ 
              width: '100%', 
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        ) : (
          <View style={{
            flex: 1,
            backgroundColor: colors.primary,
            opacity: 0.1,
          }} />
        )}
        
        {/* Background Image Picker */}
        <View style={{
          position: 'absolute',
          top: 60,
          right: 20,
        }}>
          <ImagePickerButton
            onImageSelected={handleBackgroundImageUpdate}
            title="Background"
            icon="image-outline"
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              borderColor: 'rgba(255,255,255,0.3)',
            }}
          />
        </View>
      </View>

      <View style={[commonStyles.content, { marginTop: -60 }]}>
        {/* Profile Picture Section */}
        <View style={[commonStyles.center, { marginBottom: 40 }]}>
          <View style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            borderWidth: 4,
            borderColor: colors.background,
            overflow: 'hidden',
          }}>
            {currentUser.avatar ? (
              <Image 
                source={{ uri: currentUser.avatar }} 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
            ) : (
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 48 }}>
                {currentUser.name.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          
          <ImagePickerButton
            onImageSelected={handleProfileImageUpdate}
            title="Change Photo"
            icon="camera-outline"
            style={{ marginBottom: 16 }}
          />
          
          <Text style={[commonStyles.subtitle, { textAlign: 'center' }]}>
            {currentUser.name}
          </Text>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
            {currentUser.username}
          </Text>
        </View>

        {/* Profile Information Cards */}
        <View style={commonStyles.card}>
          <View style={commonStyles.row}>
            <Icon name="person-outline" size={24} color={colors.primary} />
            <View style={commonStyles.flex1}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>Name</Text>
              <Text style={commonStyles.textSecondary}>{currentUser.name}</Text>
            </View>
          </View>
        </View>

        <View style={commonStyles.card}>
          <View style={commonStyles.row}>
            <Icon name="at-outline" size={24} color={colors.primary} />
            <View style={commonStyles.flex1}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>Username</Text>
              <Text style={commonStyles.textSecondary}>{currentUser.username}</Text>
            </View>
          </View>
        </View>

        <View style={commonStyles.card}>
          <View style={commonStyles.row}>
            <Icon name="calendar-outline" size={24} color={colors.primary} />
            <View style={commonStyles.flex1}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>Member since</Text>
              <Text style={commonStyles.textSecondary}>
                {currentUser.createdAt.toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 40, marginBottom: 40 }}>
          <Button
            text="Logout"
            onPress={handleLogout}
            style={buttonStyles.danger}
          />
        </View>
      </View>
    </ScrollView>
  );
}
