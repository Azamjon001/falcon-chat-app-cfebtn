
import React from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from './Icon';
import { colors } from '../styles/commonStyles';

interface ImagePickerButtonProps {
  onImageSelected: (uri: string) => void;
  title?: string;
  icon?: string;
  style?: any;
}

export default function ImagePickerButton({ 
  onImageSelected, 
  title = "Select Image", 
  icon = "image-outline",
  style 
}: ImagePickerButtonProps) {
  
  const pickImage = async () => {
    console.log('Opening image picker');
    
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      console.log('Image selected:', result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity 
      onPress={pickImage}
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        backgroundColor: colors.backgroundAlt,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
      }, style]}
    >
      <Icon name={icon} size={20} color={colors.primary} />
      <Text style={{ 
        marginLeft: 8, 
        color: colors.primary, 
        fontWeight: '500' 
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
