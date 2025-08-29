
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { supabaseService } from '../../services/supabaseService';
import { router } from 'expo-router';
import PromptModal from '../../components/PromptModal';
import AddUserModal from '../../components/AddUserModal';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import { Channel } from '../../types/User';

export default function ChannelsScreen() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

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
    if (!channelName.trim()) return;
    
    console.log('Creating channel:', channelName);
    
    try {
      const channel = await supabaseService.createChannel(channelName.trim());
      if (channel) {
        setChannels(prev => [channel, ...prev]);
        console.log('Channel created successfully');
        Alert.alert('Success', `Channel "${channelName}" has been created!`);
      } else {
        Alert.alert('Error', 'Failed to create channel. Please try again.');
      }
    } catch (error) {
      console.error('Error creating channel:', error);
      Alert.alert('Error', 'Failed to create channel. Please try again.');
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

  const handleChannelLongPress = (channel: Channel) => {
    if (isDirectMessage(channel)) return; // Don't show options for direct messages
    
    const currentUser = supabaseService.getCurrentUser();
    if (!currentUser) return;

    // Only show add user option if user is the creator or member
    if (channel.createdBy === currentUser.id || channel.members.includes(currentUser.id)) {
      Alert.alert(
        'Channel Options',
        `What would you like to do with "${channel.name}"?`,
        [
          {
            text: 'Add User',
            onPress: () => {
              setSelectedChannel(channel);
              setShowAddUserModal(true);
            }
          },
          {
            text: 'Cancel',
            style: 'cancel'
          }
        ]
      );
    }
  };

  const handleAddUserModalClose = () => {
    setShowAddUserModal(false);
    setSelectedChannel(null);
  };

  const handleUserAdded = () => {
    // Reload channels to get updated member count
    loadChannels();
  };

  const isDirectMessage = (channel: Channel) => {
    return channel.description?.includes('Direct message with') || false;
  };

  const regularChannels = channels.filter(c => !isDirectMessage(c));
  const directMessages = channels.filter(c => isDirectMessage(c));

  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.content, { paddingTop: 60 }]}>
        <View style={commonStyles.row}>
          <Text style={commonStyles.title}>Channels</Text>
          <Button
            title="Create"
            onPress={handleCreateChannel}
            style={{ paddingHorizontal: 16, paddingVertical: 8 }}
          />
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
                Create your first channel or search for users to start messaging
              </Text>
            </View>
          )}

          {/* Regular Channels */}
          {regularChannels.length > 0 && (
            <>
              <Text style={[commonStyles.text, { fontWeight: '600', marginTop: 16, marginBottom: 8 }]}>
                Channels
              </Text>
              {regularChannels.map((channel) => (
                <TouchableOpacity
                  key={channel.id}
                  style={commonStyles.card}
                  onPress={() => handleChannelPress(channel)}
                  onLongPress={() => handleChannelLongPress(channel)}
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
                      <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                        {channel.members.length} member{channel.members.length !== 1 ? 's' : ''}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
                      <Text style={[commonStyles.textSecondary, { fontSize: 10, marginTop: 2 }]}>
                        Hold to add users
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* Direct Messages */}
          {directMessages.length > 0 && (
            <>
              <Text style={[commonStyles.text, { fontWeight: '600', marginTop: 24, marginBottom: 8 }]}>
                Direct Messages
              </Text>
              {directMessages.map((channel) => (
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
                      backgroundColor: colors.secondary || colors.cardBackground,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 16 }}>
                        {channel.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={commonStyles.flex1}>
                      <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                        {channel.name}
                      </Text>
                      <Text style={commonStyles.textSecondary}>
                        Direct message
                      </Text>
                    </View>
                    <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
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

      {selectedChannel && (
        <AddUserModal
          visible={showAddUserModal}
          channelId={selectedChannel.id}
          channelName={selectedChannel.name}
          onClose={handleAddUserModalClose}
          onUserAdded={handleUserAdded}
        />
      )}
    </View>
  );
}
