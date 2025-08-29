
import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../styles/commonStyles';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function Button({ text, onPress, style, textStyle, disabled = false }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[
        {
          backgroundColor: colors.primary,
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 48,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <Text
        style={[
          {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
