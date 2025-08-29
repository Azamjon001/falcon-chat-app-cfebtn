
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
      setIsUnavailable(true);
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
      if (isLoading) return;

      // If the file is unavailable, show error immediately
      if (isUnavailable || (uri.startsWith('file://') && uri.includes('ExperienceData'))) {
        Alert.alert(
          'Voice Message Unavailable', 
          'This voice message is no longer available. Local recordings are temporary and may be deleted by the system.',
          [{ text: 'OK' }]
        );
        return;
      }

      if (!soundRef.current) {
        setIsLoading(true);
        console.log('Loading voice message:', uri);
        
        // Validate URI before attempting to load
        let audioSource;
        if (uri.startsWith('http://') || uri.startsWith('https://')) {
          // Remote URL - use directly
          audioSource = { uri };
          console.log('Using remote URL:', uri);
        } else {
          // Local file - this should not happen for new messages
          console.warn('Local file URI detected, this may not work:', uri);
          audioSource = { uri };
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
      if (error.message && (error.message.includes('FileNotFoundException') || error.message.includes('ENOENT'))) {
        setIsUnavailable(true);
        Alert.alert(
          'Voice Message Unavailable', 
          'This voice message file is no longer available. Local recordings are temporary and may be automatically deleted by the system.',
          [{ text: 'OK' }]
        );
      } else if (error.message && error.message.includes('Network')) {
        Alert.alert('Network Error', 'Unable to load voice message. Please check your internet connection.');
      } else {
        Alert.alert('Playback Error', 'Failed to play voice message. The file may be corrupted or unavailable.');
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

  // Show unavailable state for local files
  const showUnavailable = isUnavailable || (uri.startsWith('file://') && uri.includes('ExperienceData'));

  return (
    <View style={[{
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 200,
    }, style]}>
      <TouchableOpacity
        onPress={togglePlayback}
        disabled={isLoading || showUnavailable}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: showUnavailable 
            ? (isOwnMessage ? 'rgba(255,255,255,0.1)' : colors.border)
            : (isOwnMessage ? 'rgba(255,255,255,0.2)' : colors.cardBackground),
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}
      >
        {isLoading ? (
          <Icon name="hourglass-outline" size={20} color={iconColor} />
        ) : showUnavailable ? (
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
            width: showUnavailable ? '0%' : `${getProgressPercentage()}%`,
            backgroundColor: showUnavailable ? colors.textSecondary : iconColor,
            borderRadius: 1.5,
          }} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ 
            color: secondaryTextColor, 
            fontSize: 12,
            fontWeight: '500'
          }}>
            {showUnavailable ? 'Unavailable' : (isPlaying ? formatTime(playbackPosition) : '0:00')}
          </Text>
          <Text style={{ 
            color: secondaryTextColor, 
            fontSize: 12 
          }}>
            {formatTime(playbackDuration)}
          </Text>
        </View>

        {showUnavailable && (
          <Text style={{
            color: secondaryTextColor,
            fontSize: 10,
            marginTop: 4,
            fontStyle: 'italic'
          }}>
            Voice message no longer available
          </Text>
        )}
      </View>
    </View>
  );
}
