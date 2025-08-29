
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';
import Icon from './Icon';
import { colors } from '../styles/commonStyles';

interface VoiceMessagePlayerProps {
  uri: string;
  duration: number;
  isOwnMessage: boolean;
  style?: any;
}

export default function VoiceMessagePlayer({ 
  uri, 
  duration, 
  isOwnMessage, 
  style 
}: VoiceMessagePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(duration * 1000); // Convert to milliseconds
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    // Check if this is a local file that might not exist
    if (uri.startsWith('file://') && uri.includes('ExperienceData')) {
      console.log('Detected potentially unavailable local file:', uri);
      // We'll check availability when user tries to play
    }

    return () => {
      // Cleanup sound when component unmounts
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [uri]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayback = async () => {
    try {
      if (isLoading || isUnavailable) return;

      if (!soundRef.current) {
        setIsLoading(true);
        console.log('Loading voice message:', uri);
        
        // Check if the URI is accessible
        let audioSource;
        if (uri.startsWith('http://') || uri.startsWith('https://')) {
          // Remote URL - use directly
          audioSource = { uri };
          console.log('Using remote URL:', uri);
        } else if (uri.startsWith('file://')) {
          // Local file - check if it exists
          try {
            const response = await fetch(uri);
            if (response.ok) {
              audioSource = { uri };
              console.log('Local file exists, using:', uri);
            } else {
              throw new Error('Local file not accessible');
            }
          } catch (error) {
            console.error('Local file not accessible:', error);
            setIsUnavailable(true);
            Alert.alert(
              'Voice Message Unavailable', 
              'This voice message is no longer available. Local recordings are temporary and may be deleted by the system.',
              [{ text: 'OK' }]
            );
            setIsLoading(false);
            return;
          }
        } else {
          // Assume it's a local URI
          audioSource = { uri };
          console.log('Using URI as-is:', uri);
        }
        
        const { sound } = await Audio.Sound.createAsync(
          audioSource,
          { shouldPlay: false },
          (status) => {
            if (status.isLoaded) {
              setPlaybackPosition(status.positionMillis || 0);
              if (status.durationMillis) {
                setPlaybackDuration(status.durationMillis);
              }
              
              if (status.didJustFinish) {
                setIsPlaying(false);
                setPlaybackPosition(0);
                soundRef.current?.setPositionAsync(0);
              }
            }
          }
        );
        
        soundRef.current = sound;
        setIsLoading(false);
      }

      if (isPlaying) {
        console.log('Pausing voice message');
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        console.log('Playing voice message');
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing voice message:', error);
      setIsLoading(false);
      setIsPlaying(false);
      
      // More specific error messages
      if (error.message && error.message.includes('FileNotFoundException')) {
        setIsUnavailable(true);
        Alert.alert(
          'Voice Message Unavailable', 
          'This voice message file is no longer available. It may have been moved or deleted by the system.',
          [{ text: 'OK' }]
        );
      } else if (error.message && error.message.includes('ENOENT')) {
        setIsUnavailable(true);
        Alert.alert(
          'File Not Found', 
          'Voice message file not found. Local recordings are temporary and may be automatically deleted.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Playback Error', 'Failed to play voice message. Please try again.');
      }
    }
  };

  const getProgressPercentage = () => {
    if (playbackDuration === 0) return 0;
    return (playbackPosition / playbackDuration) * 100;
  };

  const iconColor = isOwnMessage ? 'white' : colors.primary;
  const textColor = isOwnMessage ? 'white' : colors.text;
  const secondaryTextColor = isOwnMessage ? 'rgba(255,255,255,0.7)' : colors.textSecondary;

  return (
    <View style={[{
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 200,
    }, style]}>
      <TouchableOpacity
        onPress={togglePlayback}
        disabled={isLoading || isUnavailable}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: isUnavailable 
            ? (isOwnMessage ? 'rgba(255,255,255,0.1)' : colors.border)
            : (isOwnMessage ? 'rgba(255,255,255,0.2)' : colors.cardBackground),
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}
      >
        {isLoading ? (
          <Icon name="hourglass-outline" size={20} color={iconColor} />
        ) : isUnavailable ? (
          <Icon name="alert-circle-outline" size={20} color={isOwnMessage ? 'rgba(255,255,255,0.5)' : colors.textSecondary} />
        ) : (
          <Icon 
            name={isPlaying ? "pause" : "play"} 
            size={20} 
            color={iconColor} 
          />
        )}
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        {/* Waveform visualization (simplified as progress bar) */}
        <View style={{
          height: 3,
          backgroundColor: isOwnMessage ? 'rgba(255,255,255,0.3)' : colors.border,
          borderRadius: 1.5,
          marginBottom: 8,
        }}>
          <View style={{
            height: '100%',
            width: `${getProgressPercentage()}%`,
            backgroundColor: iconColor,
            borderRadius: 1.5,
          }} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ 
            color: secondaryTextColor, 
            fontSize: 12,
            fontWeight: '500'
          }}>
            {isPlaying ? formatTime(playbackPosition) : '0:00'}
          </Text>
          <Text style={{ 
            color: secondaryTextColor, 
            fontSize: 12 
          }}>
            {formatTime(playbackDuration)}
          </Text>
        </View>
      </View>
    </View>
  );
}
