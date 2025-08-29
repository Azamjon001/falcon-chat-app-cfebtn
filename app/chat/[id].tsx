
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import TextInput from '../../components/TextInput';
import Icon from '../../components/Icon';
import ImagePickerButton from '../../components/ImagePicker';
import VoiceRecorder from '../../components/VoiceRecorder';
import { Message, Channel } from '../../types/User';
import { supabaseService } from '../../services/supabaseService';
import * as DocumentPicker from 'expo-document-picker';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (id) {
      loadChannelData();
      loadMessages();
    }
  }, [id]);

  const loadChannelData = async () => {
    console.log('Loading channel data for:', id);
    try {
      const channels = await supabaseService.getChannels();
      const foundChannel = channels.find(c => c.id === id);
      setChannel(foundChannel || null);
    } catch (error) {
      console.error('Error loading channel data:', error);
    }
  };

  const loadMessages = async () => {
    if (!id) return;
    
    console.log('Loading messages for channel:', id);
    setLoading(true);
    
    try {
      const messageList = await supabaseService.getMessages(id);
      setMessages(messageList);
      console.log('Messages loaded:', messageList.length);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !id || sending) return;

    const messageContent = newMessage.trim();
    setNewMessage('');
    setSending(true);

    try {
      const message = await supabaseService.sendMessage(id, messageContent, 'text');
      if (message) {
        setMessages(prev => [...prev, message]);
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleVoiceRecordingComplete = async (uri: string, duration: number) => {
    if (!id) return;

    console.log('Voice recording completed:', { uri, duration });
    setSending(true);

    try {
      const message = await supabaseService.sendMessage(id, 'Voice message', 'voice', {
        fileUri: uri,
        duration,
        mimeType: 'audio/m4a'
      });
      
      if (message) {
        setMessages(prev => [...prev, message]);
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending voice message:', error);
      Alert.alert('Error', 'Failed to send voice message');
    } finally {
      setSending(false);
    }
  };

  const handleImageSelected = async (uri: string) => {
    if (!id) return;

    console.log('Image selected:', uri);
    setSending(true);

    try {
      const message = await supabaseService.sendMessage(id, 'Image', 'image', {
        fileUri: uri,
        mimeType: 'image/jpeg'
      });
      
      if (message) {
        setMessages(prev => [...prev, message]);
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending image:', error);
      Alert.alert('Error', 'Failed to send image');
    } finally {
      setSending(false);
    }
  };

  const handleFileShare = async () => {
    if (!id) return;

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        console.log('File selected:', file);
        setSending(true);

        const message = await supabaseService.sendMessage(id, file.name, 'file', {
          fileUri: file.uri,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.mimeType || 'application/octet-stream'
        });
        
        if (message) {
          setMessages(prev => [...prev, message]);
          scrollToBottom();
        }
      }
    } catch (error) {
      console.error('Error sharing file:', error);
      Alert.alert('Error', 'Failed to share file');
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
          },
          isOwnMessage ? { borderBottomRightRadius: 4 } : { borderBottomLeftRadius: 4 }
        ]}
      >
        {message.type === 'text' && (
          <Text style={{ color: isOwnMessage ? 'white' : colors.text }}>
            {message.content}
          </Text>
        )}

        {message.type === 'voice' && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon 
              name="play-circle-outline" 
              size={24} 
              color={isOwnMessage ? 'white' : colors.primary} 
            />
            <Text style={{ 
              color: isOwnMessage ? 'white' : colors.text, 
              marginLeft: 8 
            }}>
              Voice message ({message.duration}s)
            </Text>
          </View>
        )}

        {message.type === 'image' && message.fileUri && (
          <View>
            <Image 
              source={{ uri: message.fileUri }} 
              style={{ width: 200, height: 150, borderRadius: 8 }}
              resizeMode="cover"
            />
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          </View>
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
          <ImagePickerButton
            onImageSelected={handleImageSelected}
            icon="camera-outline"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.cardBackground,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}
          />

          <TouchableOpacity
            onPress={handleFileShare}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.cardBackground,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}
          >
            <Icon name="attach-outline" size={20} color={colors.text} />
          </TouchableOpacity>

          <VoiceRecorder
            onRecordingComplete={handleVoiceRecordingComplete}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.cardBackground,
              alignItems: 'center',
              justifyContent: 'center',
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
