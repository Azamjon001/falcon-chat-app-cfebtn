
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import TextInput from '../../components/TextInput';
import Icon from '../../components/Icon';
import { supabaseService } from '../../services/supabaseService';
import { User } from '../../types/User';
import { router } from 'expo-router';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    console.log('Searching for users:', query);
    
    try {
      const results = await supabaseService.searchUsers(query.trim());
      setSearchResults(results);
      console.log('Search results:', results.length);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleUserPress = async (user: User) => {
    console.log('User selected:', user.username);
    
    try {
      // Create or get existing direct chat
      const chatId = await supabaseService.createDirectChat(user.id);
      
      if (chatId) {
        console.log('Navigating to direct chat:', chatId);
        router.push(`/chat/${chatId}`);
      } else {
        Alert.alert('Error', 'Failed to create direct message');
      }
    } catch (error) {
      console.error('Error creating direct chat:', error);
      Alert.alert('Error', 'Failed to start conversation');
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.content, { paddingTop: 60 }]}>
        <Text style={commonStyles.title}>Search Users</Text>
        
        <View style={{ position: 'relative' }}>
          <TextInput
            placeholder="Search by username or name..."
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={{
            position: 'absolute',
            right: 12,
            top: 12,
            bottom: 16,
            justifyContent: 'center',
          }}>
            <Icon 
              name="search-outline" 
              size={20} 
              color={colors.textSecondary} 
            />
          </View>
        </View>

        <ScrollView style={commonStyles.flex1} showsVerticalScrollIndicator={false}>
          {searching && (
            <View style={[commonStyles.center, { marginTop: 20 }]}>
              <Text style={commonStyles.textSecondary}>Searching...</Text>
            </View>
          )}

          {!searching && searchQuery.trim().length > 0 && searchResults.length === 0 && (
            <View style={[commonStyles.center, { marginTop: 60 }]}>
              <Icon name="person-outline" size={64} color={colors.textSecondary} />
              <Text style={[commonStyles.textSecondary, { marginTop: 16, textAlign: 'center' }]}>
                No users found for &quot;{searchQuery}&quot;
              </Text>
              <Text style={[commonStyles.textSecondary, { marginTop: 8, textAlign: 'center', fontSize: 14 }]}>
                Try searching for a different username or name
              </Text>
            </View>
          )}

          {searchResults.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={commonStyles.card}
              onPress={() => handleUserPress(user)}
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
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
                    {user.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={commonStyles.flex1}>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {user.name}
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    {user.username}
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Icon name="chatbubble-outline" size={20} color={colors.primary} />
                  <Text style={{ color: colors.primary, fontSize: 12, marginTop: 2 }}>
                    Message
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {searchQuery.trim().length === 0 && (
            <View style={[commonStyles.center, { marginTop: 60 }]}>
              <Icon name="search-outline" size={64} color={colors.textSecondary} />
              <Text style={[commonStyles.textSecondary, { marginTop: 16, textAlign: 'center' }]}>
                Search for users by username or name
              </Text>
              <Text style={[commonStyles.textSecondary, { marginTop: 8, textAlign: 'center', fontSize: 14 }]}>
                Find other Falcon users and start conversations
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
