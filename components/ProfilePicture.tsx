
import React from 'react';
import { View, Image, Text } from 'react-native';
import { colors } from '../styles/commonStyles';

interface ProfilePictureProps {
  user?: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  size?: number;
  style?: any;
}

export default function ProfilePicture({ user, size = 40, style }: ProfilePictureProps) {
  if (!user) {
    return (
      <View style={[{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.cardBackground,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
      }, style]}>
        <Text style={{ 
          color: colors.textSecondary, 
          fontSize: size * 0.4,
          fontWeight: '600'
        }}>
          ?
        </Text>
      </View>
    );
  }

  if (user.avatar) {
    return (
      <Image
        source={{ uri: user.avatar }}
        style={[{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.cardBackground,
        }, style]}
        onError={(error) => {
          console.error('Profile picture load error for user:', user.username, error.nativeEvent.error);
        }}
      />
    );
  }

  // Fallback to initials
  const initials = user.name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);

  return (
    <View style={[{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    }, style]}>
      <Text style={{ 
        color: 'white', 
        fontSize: size * 0.4,
        fontWeight: '600'
      }}>
        {initials}
      </Text>
    </View>
  );
}
