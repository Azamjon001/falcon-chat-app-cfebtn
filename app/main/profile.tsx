
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { storage } from '../../data/storage';

export default function ProfileScreen() {
  const currentUser = storage.getCurrentUser();

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
    <View style={commonStyles.container}>
      <View style={[commonStyles.content, { paddingTop: 60 }]}>
        <Text style={commonStyles.title}>Profile</Text>

        <View style={[commonStyles.center, { marginVertical: 40 }]}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 32 }}>
              {currentUser.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          
          <Text style={[commonStyles.subtitle, { textAlign: 'center' }]}>
            {currentUser.name}
          </Text>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
            {currentUser.username}
          </Text>
        </View>

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

        <View style={{ marginTop: 40 }}>
          <Button
            text="Logout"
            onPress={handleLogout}
            style={buttonStyles.danger}
          />
        </View>
      </View>
    </View>
  );
}
