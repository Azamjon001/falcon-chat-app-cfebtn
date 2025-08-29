
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import TextInput from '../../components/TextInput';
import Icon from '../../components/Icon';
import FilePicker from '../../components/FilePicker';
import VoiceRecorder from '../../components/VoiceRecorder';
import VoiceMessagePlayer from '../../components/VoiceMessagePlayer';
import { Message, Channel } from '../../types/User';
import { supabaseService } from '../../services/supabaseService';
import { supabase } from '../../app/integrations/supabase/client';
import { debugRealtime } from '../../utils/debugUtils';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const loadChannelData = useCallback(async () => {
    console.log('Loading channel data for:', id);
    try {
      const channels = await supabaseService.getChannels();
      const foundChannel = channels.find(c => c.id === id);
      setChannel(foundChannel || null);
      console.log('Channel found:', foundChannel?.name);
    } catch (error) {
      console.error('Error loading channel data:', error);
    }
  }, [id]);

  const loadMessages = useCallback(async () => {
    if (!id) return;
    
    console.log('Loading messages for channel:', id);
    setLoading(true);
    
    try {
      const messageList = await supabaseService.getMessages(id);
      console.log('Loaded messages count:', messageList.length);
      
      // Debug each message
      messageList.forEach(msg => {
        debugRealtime.logMessageData(msg);
      });
      
      setMessages(messageList);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const setupRealtimeSubscription = useCallback(() => {
    if (!id) return;

    console.log('=== Setting up real-time subscription for channel:', id, '===');
    
    // Clean up existing subscription
    if (unsubscribeRef.current) {
      console.log('Cleaning up existing subscription');
      unsubscribeRef.current();
    }

    // Set up new subscription
    unsubscribeRef.current = supabaseService.subscribeToMessages(id, (newMessage) => {
      console.log('=== REAL-TIME MESSAGE RECEIVED ===');
      debugRealtime.logMessageData(newMessage);
      
      setMessages(prev => {
        // Check if message already exists to avoid duplicates
        const exists = prev.some(msg => msg.id === newMessage.id);
        if (exists) {
          console.log('Message already exists, skipping duplicate:', newMessage.id);
          return prev;
        }
        
        console.log('Adding new message to state:', newMessage.id);
        const updatedMessages = [...prev, newMessage];
        
        // Auto-scroll to bottom when new message arrives
        setTimeout(scrollToBottom, 100);
        
        return updatedMessages;
      });
    });
  }, [id]);

  useEffect(() => {
    if (id) {
      loadChannelData();
      loadMessages();
      setupRealtimeSubscription();
    }

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribeRef.current) {
        console.log('Cleaning up real-time subscription on unmount');
        unsubscribeRef.current();
      }
    };
  }, [id, loadChannelData, loadMessages, setupRealtimeSubscription]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !id || sending) return;

    const messageContent = newMessage.trim();
    setNewMessage('');
    setSending(true);

    try {
      console.log('=== SENDING TEXT MESSAGE ===');
      console.log('Content:', messageContent);
      console.log('Channel ID:', id);
      
      const message = await supabaseService.sendMessage(id, messageContent, 'text');
      if (message) {
        console.log('Text message sent successfully');
        debugRealtime.logMessageData(message);
      } else {
        console.error('Failed to send text message');
        Alert.alert('Error', 'Failed to send message');
        setNewMessage(messageContent); // Restore message
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
      setNewMessage(messageContent); // Restore message
    } finally {
      setSending(false);
    }
  };

  const handleVoiceRecordingComplete = async (uri: string, duration: number) => {
    if (!id) return;

    console.log('=== SENDING VOICE MESSAGE ===');
    console.log('URI:', uri);
    console.log('Duration:', duration);
    setSending(true);

    try {
      // Verify the recorded file exists and is accessible
      try {
        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const blob = await response.blob();
        console.log('Recording file verified - Size:', blob.size, 'bytes');
        
        if (blob.size === 0) {
          throw new Error('Recording file is empty');
        }
      } catch (error) {
        console.error('Recording file verification failed:', error);
        Alert.alert(
          'Recording Error', 
          'The recording file is not accessible or corrupted. Please try recording again.',
          [{ text: 'OK' }]
        );
        setSending(false);
        return;
      }

      // Send the voice message
      const message = await supabaseService.sendMessage(id, 'Voice message', 'voice', {
        fileUri: uri,
        duration,
        mimeType: 'audio/m4a',
        fileName: `voice_${Date.now()}.m4a`
      });
      
      if (message) {
        console.log('✅ Voice message sent successfully');
        debugRealtime.logMessageData(message);
      } else {
        console.error('❌ Failed to send voice message');
        Alert.alert(
          'Upload Failed', 
          'Failed to upload voice message to cloud storage. Please check your internet connection and try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error sending voice message:', error);
      Alert.alert(
        'Voice Message Error', 
        'Failed to send voice message. This could be due to network issues or storage problems. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setSending(false);
    }
  };

  const handleFileSelected = async (
    uri: string, 
    type: 'image' | 'file', 
    options?: {
      fileName?: string;
      fileSize?: number;
      mimeType?: string;
    }
  ) => {
    if (!id) return;

    console.log('=== SENDING FILE/IMAGE ===');
    console.log('URI:', uri);
    console.log('Type:', type);
    console.log('Options:', options);
    setSending(true);

    try {
      const content = type === 'image' ? 'Image' : (options?.fileName || 'File');
      const message = await supabaseService.sendMessage(id, content, type, {
        fileUri: uri,
        fileName: options?.fileName,
        fileSize: options?.fileSize,
        mimeType: options?.mimeType
      });
      
      if (message) {
        console.log(`${type} sent successfully`);
        debugRealtime.logMessageData(message);
      } else {
        console.error(`Failed to send ${type}`);
        Alert.alert('Error', `Failed to send ${type}`);
      }
    } catch (error) {
      console.error(`Error sending ${type}:`, error);
      Alert.alert('Error', `Failed to send ${type}`);
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const renderMessage = (message: Message) => {
    const currentUser = supabaseService.getCurrentUser();
    const isOwnMessage = message.userId === currentUser?.id;

    console.log('Rendering message:', {
      id: message.id,
      type: message.type,
      fileUri: message.fileUri,
      content: message.content
    });

    return (
      <View
        key={message.id}
        style={[
          {
            alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
            backgroundColor: isOwnMessage ? colors.primary : colors.cardBackground,
            padding: 12,
            borderRadius: 16,
            marginVertical: 2,
            maxWidth: '80%',
            minWidth: message.type === 'voice' ? 250 : undefined,
          },
          isOwnMessage ? { borderBottomRightRadius: 4 } : { borderBottomLeftRadius: 4 }
        ]}
      >
        {message.type === 'text' && (
          <Text style={{ color: isOwnMessage ? 'white' : colors.text }}>
            {message.content}
          </Text>
        )}

        {message.type === 'voice' && message.fileUri && (
          <View>
            <VoiceMessagePlayer
              uri={message.fileUri}
              duration={message.duration || 0}
              isOwnMessage={isOwnMessage}
            />
            {/* Debug info for voice messages */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Icon 
                name={message.fileUri.startsWith('http') ? "cloud-outline" : "phone-portrait-outline"} 
                size={10} 
                color={isOwnMessage ? 'rgba(255,255,255,0.5)' : colors.textSecondary} 
              />
              <Text style={{ 
                color: isOwnMessage ? 'rgba(255,255,255,0.5)' : colors.textSecondary,
                fontSize: 10,
                marginLeft: 4
              }}>
                {message.fileUri.startsWith('http') ? 'Cloud' : 'Local'} • {message.fileUri.length > 40 ? message.fileUri.substring(0, 40) + '...' : message.fileUri}
              </Text>
            </View>
          </View>
        )}

        {message.type === 'image' && (
          <View>
            {message.fileUri ? (
              <View>
                <Text style={{ 
                  color: isOwnMessage ? 'rgba(255,255,255,0.7)' : colors.textSecondary,
                  fontSize: 10,
                  marginBottom: 4
                }}>
                  URI: {message.fileUri.substring(0, 50)}...
                </Text>
                <Image 
                  source={{ uri: message.fileUri }} 
                  style={{ 
                    width: 200, 
                    height: 150, 
                    borderRadius: 8,
                    backgroundColor: colors.cardBackground 
                  }}
                  resizeMode="cover"
                  onError={(error) => {
                    console.error('Image load error for URI:', message.fileUri);
                    console.error('Error details:', error.nativeEvent.error);
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', message.fileUri);
                  }}
                  onLoadStart={() => {
                    console.log('Image load started:', message.fileUri);
                  }}
                />
              </View>
            ) : (
              <View style={{
                width: 200,
                height: 150,
                borderRadius: 8,
                backgroundColor: colors.cardBackground,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.border
              }}>
                <Icon name="image-outline" size={48} color={colors.textSecondary} />
                <Text style={{ 
                  color: colors.textSecondary, 
                  marginTop: 8,
                  fontSize: 12
                }}>
                  No image URI
                </Text>
              </View>
            )}
            {message.content !== 'Image' && (
              <Text style={{ 
                color: isOwnMessage ? 'white' : colors.text, 
                marginTop: 4 
              }}>
                {message.content}
              </Text>
            )}
          </View>
        )}

        {message.type === 'file' && (
          <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              if (message.fileUri) {
                console.log('Opening file:', message.fileUri);
                Alert.alert('File', `File: ${message.fileName || message.content}\nURI: ${message.fileUri}`);
              }
            }}
          >
            <Icon 
              name="document-outline" 
              size={24} 
              color={isOwnMessage ? 'white' : colors.primary} 
            />
            <View style={{ marginLeft: 8, flex: 1 }}>
              <Text style={{ 
                color: isOwnMessage ? 'white' : colors.text,
                fontWeight: '600'
              }}>
                {message.fileName || message.content}
              </Text>
              {message.fileSize && (
                <Text style={{ 
                  color: isOwnMessage ? 'rgba(255,255,255,0.7)' : colors.textSecondary,
                  fontSize: 12
                }}>
                  {formatFileSize(message.fileSize)}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}

        <Text style={{
          color: isOwnMessage ? 'rgba(255,255,255,0.7)' : colors.textSecondary,
          fontSize: 11,
          marginTop: 4,
          textAlign: 'right'
        }}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    );
  };

  if (!channel) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <Text style={commonStyles.textSecondary}>Channel not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: colors.primary, marginTop: 16 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={commonStyles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18, marginLeft: 16 }]}>
          {channel.name}
        </Text>
        
        {/* Debug button */}
        <TouchableOpacity 
          onPress={() => debugRealtime.testMessageSending(id!)}
          style={{ marginLeft: 'auto', padding: 8 }}
        >
          <Icon name="bug-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        
        {/* Storage test button */}
        <TouchableOpacity 
          onPress={async () => {
            try {
              console.log('Testing storage bucket...');
              const testBlob = new Blob(['test'], { type: 'text/plain' });
              const { data, error } = await supabase.storage
                .from('files')
                .upload(`test_${Date.now()}.txt`, testBlob);
              
              if (error) {
                console.error('Storage test failed:', error);
                Alert.alert('Storage Test', `Failed: ${error.message}`);
              } else {
                console.log('Storage test successful:', data);
                Alert.alert('Storage Test', 'Success! Storage is working.');
              }
            } catch (error) {
              console.error('Storage test exception:', error);
              Alert.alert('Storage Test', `Exception: ${error.message}`);
            }
          }}
          style={{ padding: 8 }}
        >
          <Icon name="cloud-upload-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={commonStyles.flex1}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <View style={[commonStyles.center, { marginTop: 40 }]}>
            <Text style={commonStyles.textSecondary}>Loading messages...</Text>
          </View>
        )}

        {!loading && messages.length === 0 && (
          <View style={[commonStyles.center, { marginTop: 60 }]}>
            <Icon name="chatbubble-outline" size={64} color={colors.textSecondary} />
            <Text style={[commonStyles.textSecondary, { marginTop: 16, textAlign: 'center' }]}>
              No messages yet
            </Text>
            <Text style={[commonStyles.textSecondary, { marginTop: 8, textAlign: 'center', fontSize: 14 }]}>
              Start the conversation!
            </Text>
          </View>
        )}

        {messages.map(renderMessage)}
      </ScrollView>

      {/* Input Area */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 16,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <TextInput
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            style={{ maxHeight: 100 }}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FilePicker
            onFileSelected={handleFileSelected}
            style={{ marginRight: 8 }}
          />

          <VoiceRecorder
            onRecordingComplete={handleVoiceRecordingComplete}
            style={{
              marginRight: 8,
            }}
          />

          <TouchableOpacity
            onPress={sendMessage}
            disabled={!newMessage.trim() || sending}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: newMessage.trim() ? colors.primary : colors.cardBackground,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon 
              name="send" 
              size={20} 
              color={newMessage.trim() ? 'white' : colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
