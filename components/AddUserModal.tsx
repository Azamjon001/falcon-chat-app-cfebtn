
import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Alert } from 'react-native';
import Button from './Button';
import { colors } from '../styles/commonStyles';
import TextInput from './TextInput';
import { supabaseService } from '../services/supabaseService';

interface AddUserModalProps {
  visible: boolean;
  channelId: string;
  channelName: string;
  onClose: () => void;
  onUserAdded: () => void;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: {
    marginLeft: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default function AddUserModal({ 
  visible, 
  channelId, 
  channelName, 
  onClose, 
  onUserAdded 
}: AddUserModalProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    setLoading(true);
    console.log('Adding user to channel:', { channelId, username: username.trim() });

    try {
      const success = await supabaseService.addUserToChannel(channelId, username.trim());
      
      if (success) {
        Alert.alert('Success', `User ${username.trim()} has been added to ${channelName}`);
        setUsername('');
        onUserAdded();
        onClose();
      } else {
        Alert.alert('Error', 'Failed to add user. Please check if the username exists.');
      }
    } catch (error) {
      console.error('Error adding user to channel:', error);
      Alert.alert('Error', 'Failed to add user to channel');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setUsername('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add User to Channel</Text>
          <Text style={styles.message}>
            Enter the username of the user you want to add to "{channelName}"
          </Text>
          
          <TextInput
            placeholder="@username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={handleCancel}
              style={[styles.button, { backgroundColor: colors.cardBackground }]}
              textStyle={{ color: colors.text }}
            />
            <Button
              title={loading ? "Adding..." : "Add User"}
              onPress={handleAddUser}
              disabled={loading || !username.trim()}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
