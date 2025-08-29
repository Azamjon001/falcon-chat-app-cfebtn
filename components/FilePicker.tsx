
import React from 'react';
import { Alert, TouchableOpacity, View, Text } from 'react-native';
import { colors } from '../styles/commonStyles';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import Icon from './Icon';

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
      'Share File',
      'Choose what you want to share',
      [
        {
          text: 'Photo from Camera',
          onPress: takePhoto,
        },
        {
          text: 'Photo from Gallery',
          onPress: pickImage,
        },
        {
          text: 'Document/File',
          onPress: pickDocument,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const takePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Camera permission is required to take photos.');
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
          fileName: `photo_${Date.now()}.jpg`,
          mimeType: 'image/jpeg',
          fileSize: asset.fileSize,
        });
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Photo library permission is required to select images.');
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
          fileName: asset.fileName || `image_${Date.now()}.jpg`,
          mimeType: asset.mimeType || 'image/jpeg',
          fileSize: asset.fileSize,
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        
        // Determine if it's an image based on mime type
        const isImage = file.mimeType?.startsWith('image/') || false;
        
        onFileSelected(file.uri, isImage ? 'image' : 'file', {
          fileName: file.name,
          mimeType: file.mimeType || 'application/octet-stream',
          fileSize: file.size,
        });
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to select file');
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
        style,
      ]}
    >
      <Icon name="attach-outline" size={20} color={colors.text} />
    </TouchableOpacity>
  );
}
