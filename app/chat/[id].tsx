
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import TextInput from '../../components/TextInput';
import Icon from '../../components/Icon';
import { storage } from '../../data/storage';
import { Message, Channel } from '../../types/User';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
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
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleVoiceMessage = () => {
    Alert.alert(
      'Voice Message',
      'Voice messaging feature will be implemented in a future update.',
      [{ text: 'OK' }]
    );
  };

  const handleFileShare = () => {
    Alert.alert(
      'File Sharing',
      'File sharing feature will be implemented in a future update.',
      [{ text: 'OK' }]
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
        <TouchableOpacity onPress={handleFileShare}>
          <Icon name="attach-outline" size={24} color={colors.primary} />
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

        <TouchableOpacity onPress={handleVoiceMessage}>
          <Icon name="mic-outline" size={24} color={colors.primary} />
        </TouchableOpacity>

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
