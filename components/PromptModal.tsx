
import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';
import Button from './Button';
import TextInput from './TextInput';

interface PromptModalProps {
  visible: boolean;
  title: string;
  message: string;
  placeholder?: string;
  onCancel: () => void;
  onConfirm: (text: string) => void;
  confirmText?: string;
  cancelText?: string;
}

export default function PromptModal({
  visible,
  title,
  message,
  placeholder,
  onCancel,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
}: PromptModalProps) {
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    onConfirm(inputValue);
    setInputValue('');
  };

  const handleCancel = () => {
    onCancel();
    setInputValue('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}
          
          <TextInput
            placeholder={placeholder}
            value={inputValue}
            onChangeText={setInputValue}
            autoFocus
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <Button
              text={cancelText}
              onPress={handleCancel}
              style={[styles.button, styles.cancelButton]}
              textStyle={styles.cancelButtonText}
            />
            <Button
              text={confirmText}
              onPress={handleConfirm}
              style={[styles.button, styles.confirmButton]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: colors.backgroundSecondary,
  },
  cancelButtonText: {
    color: colors.text,
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
});
