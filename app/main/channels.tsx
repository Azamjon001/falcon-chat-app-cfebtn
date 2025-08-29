
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import PromptModal from '../../components/PromptModal';
import { Channel } from '../../types/User';
import { supabaseService } from '../../services/supabaseService';

export default function ChannelsScreen() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadChannels();
  }, []);

  const loadChannels = async () => {
    console.log('Loading channels...');
    setLoading(true);
    try {
      const channelList = await supabaseService.getChannels();
      setChannels(channelList);
      console.log('Channels loaded:', channelList.length);
    } catch (error) {
      console.error('Error loading channels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChannel = () => {
    setShowCreateModal(true);
  };

  const handleCreateChannelConfirm = async (channelName: string) => {
    if (!channelName.trim()) {
      return;
    }

    console.log('Creating channel:', channelName);
    
    try {
      const newChannel = await supabaseService.createChannel(channelName.trim());
      if (newChannel) {
        setChannels(prev => [...prev, newChannel]);
        console.log('Channel created successfully:', newChannel.name);
      }
    } catch (error) {
      console.error('Error creating channel:', error);
    }
    
    setShowCreateModal(false);
  };

  const handleCreateChannelCancel = () => {
    setShowCreateModal(false);
  };

  const handleChannelPress = (channel: Channel) => {
    console.log('Opening channel:', channel.name);
    router.push(`/chat/${channel.id}`);
  };

  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.content, { paddingTop: 60 }]}>
        <View style={commonStyles.row}>
          <Text style={commonStyles.title}>Channels</Text>
          <TouchableOpacity
            onPress={handleCreateChannel}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={commonStyles.flex1} showsVerticalScrollIndicator={false}>
          {loading && (
            <View style={[commonStyles.center, { marginTop: 40 }]}>
              <Text style={commonStyles.textSecondary}>Loading channels...</Text>
            </View>
          )}

          {!loading && channels.length === 0 && (
            <View style={[commonStyles.center, { marginTop: 60 }]}>
              <Icon name="chatbubbles-outline" size={64} color={colors.textSecondary} />
              <Text style={[commonStyles.textSecondary, { marginTop: 16, textAlign: 'center' }]}>
                No channels yet
              </Text>
              <Text style={[commonStyles.textSecondary, { marginTop: 8, textAlign: 'center', fontSize: 14 }]}>
                Create your first channel to start chatting
              </Text>
              <Button
                text="Create Channel"
                onPress={handleCreateChannel}
                style={[commonStyles.buttonSecondary, { marginTop: 20 }]}
                textStyle={{ color: colors.primary }}
              />
            </View>
          )}

          {channels.map((channel) => (
            <TouchableOpacity
              key={channel.id}
              style={commonStyles.card}
              onPress={() => handleChannelPress(channel)}
              activeOpacity={0.7}
            >
              <View style={commonStyles.row}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon name="chatbubbles" size={20} color="white" />
                </View>
                <View style={commonStyles.flex1}>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {channel.name}
                  </Text>
                  {channel.description && (
                    <Text style={commonStyles.textSecondary}>
                      {channel.description}
                    </Text>
                  )}
                  <Text style={[commonStyles.textSecondary, { fontSize: 12, marginTop: 2 }]}>
                    {channel.members.length} member{channel.members.length !== 1 ? 's' : ''}
                  </Text>
                </View>
                <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <PromptModal
        visible={showCreateModal}
        title="Create Channel"
        message="Enter a name for your new channel"
        placeholder="Channel name"
        onConfirm={handleCreateChannelConfirm}
        onCancel={handleCreateChannelCancel}
        confirmText="Create"
        cancelText="Cancel"
      />
    </View>
  );
}
