
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { commonStyles, colors } from '../../styles/commonStyles';
import TextInput from '../../components/TextInput';
import Icon from '../../components/Icon';
import VoiceRecorder from '../../components/VoiceRecorder';
import ImagePickerButton from '../../components/ImagePicker';
import { storage } from '../../data/storage';
import { Message, Channel } from '../../types/User';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (id) {
      loadChannelData();
      loadMessages();
    }
  }, [id]);

  const loadChannelData = () => {
    console.log('Loading channel data for ID:', id);
    const channels = storage.getChannels();
    const foundChannel = channels.find(c => c.id === id);
    setChannel(foundChannel || null);
  };

  const loadMessages = () => {
    if (!id) return;
    
    console.log('Loading messages for channel:', id);
    setLoading(true);
    try {
      const channelMessages = storage.getMessages(id);
      setMessages(channelMessages);
      console.log('Loaded messages:', channelMessages.length);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !id) return;

    console.log('Sending message:', newMessage.trim());
    const message = storage.sendMessage(id, newMessage.trim());
    
    if (message) {
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      scrollToBottom();
    }
  };

  const handleVoiceRecordingComplete = (uri: string, duration: number) => {
    if (!id) return;
    
    console.log('Voice recording complete:', { uri, duration });
    const message = storage.sendMessage(
      id, 
      `Voice message (${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')})`,
      'voice',
      { fileUri: uri, duration, mimeType: 'audio/m4a' }
    );
    
    if (message) {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    }
  };

  const handleImageSelected = (uri: string) => {
    if (!id) return;
    
    console.log('Image selected for sharing:', uri);
    const message = storage.sendMessage(
      id,
      'Photo',
      'image',
      { fileUri: uri, mimeType: 'image/jpeg' }
    );
    
    if (message) {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
      setShowAttachmentOptions(false);
    }
  };

  const handleFileShare = async () => {
    try {
      console.log('Opening document picker');
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0] && id) {
        const file = result.assets[0];
        console.log('File selected:', file);
        
        const message = storage.sendMessage(
          id,
          file.name,
          'file',
          {
            fileUri: file.uri,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.mimeType || 'application/octet-stream'
          }
        );
        
        if (message) {
          setMessages(prev => [...prev, message]);
          scrollToBottom();
          setShowAttachmentOptions(false);
        }
      }
    } catch (error) {
      console.error('Error picking file:', error);
      Alert.alert('Error', 'Failed to select file');
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
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const renderMessage = (message: Message) => {
    const user = storage.getUserById(message.userId);
    const currentUser = storage.getCurrentUser();
    const isOwnMessage = currentUser?.id === message.userId;

    return (
      <View
        key={message.id}
        style={{
          alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
          maxWidth: '80%',
          marginVertical: 4,
        }}
      >
        {!isOwnMessage && (
          <Text style={[commonStyles.textSecondary, { fontSize: 12, marginBottom: 2 }]}>
            {user?.name || 'Unknown User'}
          </Text>
        )}
        <View
          style={{
            backgroundColor: isOwnMessage ? colors.primary : colors.backgroundAlt,
            padding: 12,
            borderRadius: 16,
            borderBottomRightRadius: isOwnMessage ? 4 : 16,
            borderBottomLeftRadius: isOwnMessage ? 16 : 4,
          }}
        >
          {message.type === 'image' && message.fileUri && (
            <Image
              source={{ uri: message.fileUri }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 8,
                marginBottom: 8,
                resizeMode: 'cover',
              }}
            />
          )}
          
          {message.type === 'voice' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Icon 
                name="play-circle-outline" 
                size={24} 
                color={isOwnMessage ? 'white' : colors.primary} 
              />
              <Text style={{
                marginLeft: 8,
                color: isOwnMessage ? 'rgba(255,255,255,0.8)' : colors.textSecondary,
                fontSize: 14,
              }}>
                {message.duration ? `${Math.floor(message.duration / 60)}:${(message.duration % 60).toString().padStart(2, '0')}` : 'Voice message'}
              </Text>
            </View>
          )}
          
          {message.type === 'file' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Icon 
                name="document-outline" 
                size={24} 
                color={isOwnMessage ? 'white' : colors.primary} 
              />
              <View style={{ marginLeft: 8, flex: 1 }}>
                <Text style={{
                  color: isOwnMessage ? 'white' : colors.text,
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                  {message.fileName}
                </Text>
                {message.fileSize && (
                  <Text style={{
                    color: isOwnMessage ? 'rgba(255,255,255,0.7)' : colors.textSecondary,
                    fontSize: 12,
                  }}>
                    {formatFileSize(message.fileSize)}
                  </Text>
                )}
              </View>
            </View>
          )}
          
          <Text
            style={{
              color: isOwnMessage ? 'white' : colors.text,
              fontSize: 16,
            }}
          >
            {message.content}
          </Text>
          <Text
            style={{
              color: isOwnMessage ? 'rgba(255,255,255,0.7)' : colors.textSecondary,
              fontSize: 11,
              marginTop: 4,
              textAlign: 'right',
            }}
          >
            {formatTime(message.timestamp)}
          </Text>
        </View>
      </View>
    );
  };

  if (!channel) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <Text style={commonStyles.text}>Channel not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: colors.primary }}>Go Back</Text>
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
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={commonStyles.flex1}>
          <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18 }]}>
            {channel.name}
          </Text>
          <Text style={commonStyles.textSecondary}>
            {channel.members.length} member{channel.members.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={commonStyles.flex1}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {loading ? (
          <View style={[commonStyles.center, { marginTop: 40 }]}>
            <Text style={commonStyles.textSecondary}>Loading messages...</Text>
          </View>
        ) : messages.length === 0 ? (
          <View style={[commonStyles.center, { marginTop: 40 }]}>
            <Icon name="chatbubble-outline" size={64} color={colors.textSecondary} />
            <Text style={[commonStyles.textSecondary, { marginTop: 16, textAlign: 'center' }]}>
              No messages yet.{'\n'}Start the conversation!
            </Text>
          </View>
        ) : (
          messages.map(renderMessage)
        )}
      </ScrollView>

      {/* Attachment Options */}
      {showAttachmentOptions && (
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: colors.backgroundAlt,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          gap: 12,
        }}>
          <ImagePickerButton
            onImageSelected={handleImageSelected}
            title="Photo"
            icon="image-outline"
            style={{ flex: 1 }}
          />
          <TouchableOpacity
            onPress={handleFileShare}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              backgroundColor: colors.background,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Icon name="document-outline" size={20} color={colors.primary} />
            <Text style={{ 
              marginLeft: 8, 
              color: colors.primary, 
              fontWeight: '500' 
            }}>
              File
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Message Input */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        gap: 12,
      }}>
        <TouchableOpacity 
          onPress={() => setShowAttachmentOptions(!showAttachmentOptions)}
        >
          <Icon 
            name={showAttachmentOptions ? "close" : "attach-outline"} 
            size={24} 
            color={colors.primary} 
          />
        </TouchableOpacity>
        
        <View style={commonStyles.flex1}>
          <TextInput
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            style={{
              marginBottom: 0,
              maxHeight: 100,
              paddingVertical: 8,
            }}
            onSubmitEditing={sendMessage}
          />
        </View>

        <VoiceRecorder
          onRecordingComplete={handleVoiceRecordingComplete}
        />

        <TouchableOpacity 
          onPress={sendMessage}
          disabled={!newMessage.trim()}
          style={{
            opacity: newMessage.trim() ? 1 : 0.5,
          }}
        >
          <Icon name="send" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
