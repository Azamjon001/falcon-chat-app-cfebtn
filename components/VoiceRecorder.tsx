
import React, { useState, useRef } from 'react';
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import { Audio } from 'expo-av';
import Icon from './Icon';
import { colors } from '../styles/commonStyles';

interface VoiceRecorderProps {
  onRecordingComplete: (uri: string, duration: number) => void;
  style?: any;
}

export default function VoiceRecorder({ onRecordingComplete, style }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      console.log('Requesting recording permissions');
      const permission = await Audio.requestPermissionsAsync();
      
      if (permission.status !== 'granted') {
        Alert.alert('Permission Required', 'Permission to access microphone is required!');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      recordingRef.current = recording;
      setIsRecording(true);
      setRecordingDuration(0);

      // Start duration counter
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    try {
      console.log('Stopping recording');
      
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }

      if (!recordingRef.current) return;

      setIsRecording(false);
      await recordingRef.current.stopAndUnloadAsync();
      
      const uri = recordingRef.current.getURI();
      if (uri) {
        console.log('Recording saved to', uri);
        onRecordingComplete(uri, recordingDuration);
      }
      
      recordingRef.current = null;
      setRecordingDuration(0);
    } catch (error) {
      console.error('Failed to stop recording', error);
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity
      onPress={isRecording ? stopRecording : startRecording}
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        backgroundColor: isRecording ? colors.danger : colors.primary,
        borderRadius: 25,
        minWidth: isRecording ? 120 : 50,
      }, style]}
    >
      <Icon 
        name={isRecording ? "stop" : "mic"} 
        size={20} 
        color="white" 
      />
      {isRecording && (
        <Text style={{ 
          marginLeft: 8, 
          color: 'white', 
          fontWeight: '500',
          fontSize: 14,
        }}>
          {formatDuration(recordingDuration)}
        </Text>
      )}
    </TouchableOpacity>
  );
}
