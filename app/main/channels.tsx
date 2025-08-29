
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import PromptModal from '../../components/PromptModal';
import { storage } from '../../data/storage';
import { Channel } from '../../types/User';

export default function ChannelsScreen() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadChannels();
  }, []);

  const loadChannels = () => {
    console.log('Loading channels');
    setLoading(true);
    try {
      const userChannels = storage.getChannels();
      setChannels(userChannels);
      console.log('Loaded channels:', userChannels.length);
    } catch (error) {
      console.error('Error loading channels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChannel = () => {
    console.log('Opening create channel modal');
    setShowCreateModal(true);
  };

  const handleCreateChannelConfirm = (channelName: string) => {
    console.log('Creating channel with name:', channelName);
    setShowCreateModal(false);
    
    if (channelName && channelName.trim()) {
      const channel = storage.createChannel(channelName.trim());
      if (channel) {
        console.log('Channel created:', channel.name);
        loadChannels();
      }
    }
  };

  const handleCreateChannelCancel = () => {
    console.log('Create channel cancelled');
    setShowCreateModal(false);
  };

  const handleChannelPress = (channel: Channel) => {
    console.log('Opening channel:', channel.name);
    router.push(`/chat/${channel.id}`);
  };

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <Text style={commonStyles.text}>Loading channels...</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.content, { paddingTop: 60 }]}>
        <View style={commonStyles.spaceBetween}>
          <Text style={commonStyles.title}>Channels</Text>
          <TouchableOpacity onPress={handleCreateChannel}>
            <Icon name="add-circle-outline" size={28} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={commonStyles.flex1} showsVerticalScrollIndicator={false}>
          {channels.length === 0 ? (
            <View style={[commonStyles.center, { marginTop: 60 }]}>
              <Icon name="chatbubbles-outline" size={64} color={colors.textSecondary} />
              <Text style={[commonStyles.textSecondary, { marginTop: 16, textAlign: 'center' }]}>
                No channels yet.{'\n'}Create your first channel to get started!
              </Text>
              <Button
                text="Create Channel"
                onPress={handleCreateChannel}
                style={{ marginTop: 20, backgroundColor: colors.primary }}
              />
            </View>
          ) : (
            channels.map((channel) => (
              <TouchableOpacity
                key={channel.id}
                style={commonStyles.card}
                onPress={() => handleChannelPress(channel)}
                activeOpacity={0.7}
              >
                <View style={commonStyles.row}>
                  <Icon name="chatbubbles" size={24} color={colors.primary} />
                  <View style={commonStyles.flex1}>
                    <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                      {channel.name}
                    </Text>
                    {channel.description && (
                      <Text style={commonStyles.textSecondary}>
                        {channel.description}
                      </Text>
                    )}
                    <Text style={[commonStyles.textSecondary, { fontSize: 12, marginTop: 4 }]}>
                      {channel.members.length} member{channel.members.length !== 1 ? 's' : ''}
                    </Text>
                  </View>
                  <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>

      <PromptModal
        visible={showCreateModal}
        title="Create Channel"
        message="Enter channel name:"
        placeholder="Channel name"
        confirmText="Create"
        cancelText="Cancel"
        onConfirm={handleCreateChannelConfirm}
        onCancel={handleCreateChannelCancel}
      />
    </View>
  );
}
