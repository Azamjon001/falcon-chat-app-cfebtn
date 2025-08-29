
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
      console.log('=== STARTING VOICE RECORDING ===');
      console.log('Requesting recording permissions');
      const permission = await Audio.requestPermissionsAsync();
      
      if (permission.status !== 'granted') {
        Alert.alert('Permission Required', 'Permission to access microphone is required!');
        return;
      }

      console.log('Setting audio mode for recording');
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      console.log('Starting recording with high quality settings');
      const recordingOptions = {
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        android: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      };

      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      
      recordingRef.current = recording;
      setIsRecording(true);
      setRecordingDuration(0);

      console.log('✅ Recording started successfully');

      // Start duration counter
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error('❌ Failed to start recording:', err);
      Alert.alert('Recording Error', 'Failed to start recording. Please check microphone permissions and try again.');
    }
  };

  const stopRecording = async () => {
    try {
      console.log('=== STOPPING VOICE RECORDING ===');
      
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }

      if (!recordingRef.current) {
        console.error('No recording to stop');
        Alert.alert('Error', 'No active recording found');
        return;
      }

      setIsRecording(false);
      
      console.log('Stopping and unloading recording');
      await recordingRef.current.stopAndUnloadAsync();
      
      const uri = recordingRef.current.getURI();
      console.log('Recording URI:', uri);
      
      if (uri) {
        // Verify the file exists and has content
        try {
          console.log('Verifying recording file...');
          const response = await fetch(uri);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const blob = await response.blob();
          console.log('Recording file verification - Size:', blob.size, 'bytes, Type:', blob.type);
          
          if (blob.size === 0) {
            throw new Error('Recording file is empty');
          }
          
          if (recordingDuration < 1) {
            console.warn('Recording duration is very short:', recordingDuration, 'seconds');
            Alert.alert('Short Recording', 'Recording is very short. Are you sure you want to send it?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Send', onPress: () => onRecordingComplete(uri, Math.max(recordingDuration, 1)) }
            ]);
          } else {
            console.log('✅ Recording saved successfully');
            console.log('Duration:', recordingDuration, 'seconds');
            console.log('File size:', blob.size, 'bytes');
            onRecordingComplete(uri, recordingDuration);
          }
        } catch (error) {
          console.error('❌ Error verifying recording file:', error);
          Alert.alert('Recording Error', 'Recording failed or file is corrupted. Please try again.');
        }
      } else {
        console.error('❌ No URI returned from recording');
        Alert.alert('Recording Error', 'Recording failed to save. Please try again.');
      }
      
      recordingRef.current = null;
      setRecordingDuration(0);
    } catch (error) {
      console.error('❌ Failed to stop recording:', error);
      Alert.alert('Recording Error', 'Failed to stop recording properly. Please try again.');
      setIsRecording(false);
      setRecordingDuration(0);
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
        paddingHorizontal: isRecording ? 16 : 12,
        paddingVertical: 12,
        backgroundColor: isRecording ? colors.danger : colors.primary,
        borderRadius: 25,
        minWidth: isRecording ? 120 : 48,
        height: 48,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }, style]}
    >
      <Icon 
        name={isRecording ? "stop" : "mic"} 
        size={20} 
        color="white" 
      />
      {isRecording && (
        <>
          <View style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: 'white',
            marginLeft: 8,
            marginRight: 4,
            opacity: recordingDuration % 2 === 0 ? 1 : 0.3, // Blinking effect
          }} />
          <Text style={{ 
            color: 'white', 
            fontWeight: '600',
            fontSize: 14,
          }}>
            {formatDuration(recordingDuration)}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
