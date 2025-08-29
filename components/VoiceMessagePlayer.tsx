
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

  useEffect(() => {
    return () => {
      // Cleanup sound when component unmounts
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayback = async () => {
    try {
      if (isLoading) return;

      if (!soundRef.current) {
        setIsLoading(true);
        console.log('Loading voice message:', uri);
        
        const { sound } = await Audio.Sound.createAsync(
          { uri },
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
      Alert.alert('Error', 'Failed to play voice message');
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
        disabled={isLoading}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: isOwnMessage ? 'rgba(255,255,255,0.2)' : colors.cardBackground,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}
      >
        {isLoading ? (
          <Icon name="hourglass-outline" size={20} color={iconColor} />
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
