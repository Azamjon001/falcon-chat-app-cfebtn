
import React from 'react';
import { Alert, TouchableOpacity, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import Icon from './Icon';
import { colors } from '../styles/commonStyles';

interface FilePickerProps {
  onFileSelected: (uri: string, type: 'image' | 'file', options?: {
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
  }) => void;
  style?: any;
}

export default function FilePicker({ onFileSelected, style }: FilePickerProps) {
  const showOptions = () => {
    Alert.alert(
      'Select File',
      'Choose what you want to send',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose Photo', onPress: pickImage },
        { text: 'Choose Document', onPress: pickDocument },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Camera permission is required to take photos');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        onFileSelected(asset.uri, 'image', {
          fileName: asset.fileName || 'photo.jpg',
          fileSize: asset.fileSize,
          mimeType: asset.mimeType || 'image/jpeg'
        });
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Photo library permission is required to choose images');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        onFileSelected(asset.uri, 'image', {
          fileName: asset.fileName || 'image.jpg',
          fileSize: asset.fileSize,
          mimeType: asset.mimeType || 'image/jpeg'
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        onFileSelected(asset.uri, 'file', {
          fileName: asset.name,
          fileSize: asset.size,
          mimeType: asset.mimeType || 'application/octet-stream'
        });
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  return (
    <TouchableOpacity
      onPress={showOptions}
      style={[
        {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.cardBackground,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style
      ]}
    >
      <Icon name="attach-outline" size={20} color={colors.primary} />
    </TouchableOpacity>
  );
}
