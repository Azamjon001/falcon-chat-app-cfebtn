
import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { colors } from '../styles/commonStyles';

interface CustomTextInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

export default function TextInput({ containerStyle, style, ...props }: CustomTextInputProps) {
  return (
    <RNTextInput
      style={[styles.input, style]}
      placeholderTextColor={colors.textSecondary}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
  },
});
