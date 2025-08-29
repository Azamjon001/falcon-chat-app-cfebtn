
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#007AFF',      // iOS Blue
  secondary: '#5856D6',    // Purple
  accent: '#34C759',       // Green
  background: '#FFFFFF',   // White background
  backgroundAlt: '#F2F2F7', // Light gray
  backgroundSecondary: '#F2F2F7', // Light gray (alias for backgroundAlt)
  text: '#000000',         // Black text
  textSecondary: '#8E8E93', // Gray text
  border: '#E5E5EA',       // Light border
  card: '#FFFFFF',         // White card
  danger: '#FF3B30',       // Red
  warning: '#FF9500',      // Orange
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  secondary: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
  danger: {
    backgroundColor: colors.danger,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    width: '100%',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
});
