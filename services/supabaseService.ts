
import { supabase } from '../app/integrations/supabase/client';
import { User, Channel, Message } from '../types/User';

export interface DatabaseUser {
  id: string;
  username: string;
  name: string;
  password: string;
  photo_url?: string;
  wallpaper_url?: string;
  online: boolean;
  last_seen: string;
  created_at: string;
}

export interface DatabaseChannel {
  id: string;
  name: string;
  handle?: string;
  description?: string;
  created_by?: string;
  created_at: string;
  background_image_url?: string;
}

export interface DatabaseMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  type: string;
  text?: string;
  attachment_url?: string;
  file_name?: string;
  mime_type?: string;
  duration_sec?: number;
  created_at: string;
}

class SupabaseService {
  private currentUser: User | null = null;

  // User methods
  async createUser(name: string, username: string, password: string): Promise<User> {
    console.log('Creating user in Supabase:', { name, username });
    
    const formattedUsername = username.startsWith('@') ? username : `@${username}`;
    
    // Double-check username uniqueness before creating
    const isUnique = await this.isUsernameUnique(formattedUsername);
    if (!isUnique) {
      console.log('Username already exists during creation:', formattedUsername);
      throw new Error('Username already exists');
    }
    
    const { data, error } = await supabase
      .from('app_users')
      .insert({
        username: formattedUsername,
        name: name.trim(),
        password, // In production, this should be hashed
        online: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('Username already exists');
      }
      throw new Error(`Failed to create user: ${error.message}`);
    }

    const user: User = {
      id: data.id,
      name: data.name,
      username: data.username,
      password: data.password,
      avatar: data.photo_url || undefined,
      backgroundImage: data.wallpaper_url || undefined,
      createdAt: new Date(data.created_at)
    };

    console.log('User created successfully:', user.username);
    return user;
  }

  async isUsernameUnique(username: string): Promise<boolean> {
    const formattedUsername = username.startsWith('@') ? username : `@${username}`;
    
    console.log('Checking username uniqueness:', formattedUsername);
    
    try {
      // Use exact match with case-insensitive comparison
      const { data, error } = await supabase
        .from('app_users')
        .select('id, username')
        .eq('username', formattedUsername)
        .limit(1);

      if (error) {
        console.error('Error checking username uniqueness:', error);
        // If there's an error, assume it's not unique to be safe
        return false;
      }

      const isUnique = !data || data.length === 0;
      console.log('Username unique check result:', formattedUsername, 'is unique:', isUnique);
      
      if (!isUnique && data && data.length > 0) {
        console.log('Existing username found:', data[0].username);
      }
      
      return isUnique;
    } catch (error) {
      console.error('Exception during username check:', error);
      return false;
    }
  }

  async loginUser(username: string, password: string): Promise<User | null> {
    console.log('Attempting login:', username);
    
    const formattedUsername = username.startsWith('@') ? username : `@${username}`;
    
    try {
      const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('username', formattedUsername)
        .eq('password', password)
        .single();

      if (error || !data) {
        console.log('Login failed:', error?.message || 'User not found');
        return null;
      }

      const user: User = {
        id: data.id,
        name: data.name,
        username: data.username,
        password: data.password,
        avatar: data.photo_url || undefined,
        backgroundImage: data.wallpaper_url || undefined,
        createdAt: new Date(data.created_at)
      };

      this.currentUser = user;
      
      // Update user online status
      await supabase
        .from('app_users')
        .update({ online: true, last_seen: new Date().toISOString() })
        .eq('id', user.id);

      console.log('Login successful:', user.username);
      return user;
    } catch (error) {
      console.error('Exception during login:', error);
      return null;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  async logoutUser(): Promise<void> {
    if (this.currentUser) {
      try {
        // Update user offline status
        await supabase
          .from('app_users')
          .update({ online: false, last_seen: new Date().toISOString() })
          .eq('id', this.currentUser.id);
      } catch (error) {
        console.error('Error updating offline status:', error);
      }
    }
    
    console.log('User logged out');
    this.currentUser = null;
  }

  async updateUserProfile(updates: Partial<Pick<User, 'name' | 'avatar' | 'backgroundImage'>>): Promise<boolean> {
    if (!this.currentUser) return false;
    
    console.log('Updating user profile:', updates);
    
    try {
      const dbUpdates: any = {};
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.avatar) dbUpdates.photo_url = updates.avatar;
      if (updates.backgroundImage) dbUpdates.wallpaper_url = updates.backgroundImage;

      const { error } = await supabase
        .from('app_users')
        .update(dbUpdates)
        .eq('id', this.currentUser.id);

      if (error) {
        console.error('Error updating profile:', error);
        return false;
      }

      // Update local current user
      this.currentUser = { ...this.currentUser, ...updates };
      console.log('Profile updated successfully');
      return true;
    } catch (error) {
      console.error('Exception updating profile:', error);
      return false;
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    console.log('Searching users:', query);
    
    try {
      const formattedQuery = query.startsWith('@') ? query : `@${query}`;
      
      const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .or(`username.ilike.%${formattedQuery}%,name.ilike.%${query}%`)
        .limit(20);

      if (error) {
        console.error('Error searching users:', error);
        return [];
      }

      const users: User[] = data.map(dbUser => ({
        id: dbUser.id,
        name: dbUser.name,
        username: dbUser.username,
        password: dbUser.password,
        avatar: dbUser.photo_url || undefined,
        backgroundImage: dbUser.wallpaper_url || undefined,
        createdAt: new Date(dbUser.created_at)
      }));

      console.log('Search results:', users.length, 'users found');
      return users;
    } catch (error) {
      console.error('Exception during search:', error);
      return [];
    }
  }

  async getUserById(id: string): Promise<User | undefined> {
    try {
      const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        return undefined;
      }

      return {
        id: data.id,
        name: data.name,
        username: data.username,
        password: data.password,
        avatar: data.photo_url || undefined,
        backgroundImage: data.wallpaper_url || undefined,
        createdAt: new Date(data.created_at)
      };
    } catch (error) {
      console.error('Exception getting user by ID:', error);
      return undefined;
    }
  }

  // Direct messaging methods
  async createDirectChat(otherUserId: string): Promise<string | null> {
    if (!this.currentUser) return null;
    
    console.log('Creating direct chat with user:', otherUserId);
    
    try {
      // Check if direct chat already exists
      const { data: existingChat } = await supabase
        .from('direct_chats')
        .select('id')
        .or(`and(user1_id.eq.${this.currentUser.id},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${this.currentUser.id})`)
        .single();

      if (existingChat) {
        console.log('Direct chat already exists:', existingChat.id);
        return existingChat.id;
      }

      // Create new direct chat
      const { data, error } = await supabase
        .from('direct_chats')
        .insert({
          user1_id: this.currentUser.id,
          user2_id: otherUserId
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating direct chat:', error);
        return null;
      }

      console.log('Direct chat created:', data.id);
      return data.id;
    } catch (error) {
      console.error('Exception creating direct chat:', error);
      return null;
    }
  }

  async getDirectChats(): Promise<Channel[]> {
    if (!this.currentUser) return [];
    
    try {
      const { data, error } = await supabase
        .from('direct_chats')
        .select('*')
        .or(`user1_id.eq.${this.currentUser.id},user2_id.eq.${this.currentUser.id}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching direct chats:', error);
        return [];
      }

      const channels: Channel[] = [];
      for (const chat of data) {
        const otherUserId = chat.user1_id === this.currentUser.id ? chat.user2_id : chat.user1_id;
        const otherUser = await this.getUserById(otherUserId);
        
        if (otherUser) {
          channels.push({
            id: chat.id,
            name: otherUser.name,
            description: `Direct message with ${otherUser.username}`,
            createdBy: chat.user1_id,
            members: [chat.user1_id, chat.user2_id],
            createdAt: new Date(chat.created_at)
          });
        }
      }

      return channels;
    } catch (error) {
      console.error('Exception getting direct chats:', error);
      return [];
    }
  }

  // Channel methods
  async createChannel(name: string, description?: string): Promise<Channel | null> {
    if (!this.currentUser) return null;
    
    console.log('Creating channel:', name);
    
    try {
      const { data, error } = await supabase
        .from('channels')
        .insert({
          name,
          description,
          created_by: this.currentUser.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating channel:', error);
        return null;
      }

      // Add creator as member
      await supabase
        .from('channel_members')
        .insert({
          channel_id: data.id,
          user_id: this.currentUser.id
        });

      const channel: Channel = {
        id: data.id,
        name: data.name,
        description: data.description || undefined,
        createdBy: data.created_by || this.currentUser.id,
        members: [this.currentUser.id],
        createdAt: new Date(data.created_at)
      };

      return channel;
    } catch (error) {
      console.error('Exception creating channel:', error);
      return null;
    }
  }

  async getChannels(): Promise<Channel[]> {
    if (!this.currentUser) return [];
    
    try {
      // Get both regular channels and direct chats
      const regularChannels = await this.getRegularChannels();
      const directChats = await this.getDirectChats();
      
      return [...regularChannels, ...directChats];
    } catch (error) {
      console.error('Exception getting channels:', error);
      return [];
    }
  }

  private async getRegularChannels(): Promise<Channel[]> {
    if (!this.currentUser) return [];
    
    try {
      const { data, error } = await supabase
        .from('channel_members')
        .select(`
          channel_id,
          channels (
            id,
            name,
            description,
            created_by,
            created_at
          )
        `)
        .eq('user_id', this.currentUser.id);

      if (error) {
        console.error('Error fetching regular channels:', error);
        return [];
      }

      const channels: Channel[] = [];
      for (const item of data) {
        if (item.channels) {
          // Get all members for this channel
          const { data: membersData } = await supabase
            .from('channel_members')
            .select('user_id')
            .eq('channel_id', item.channels.id);

          const members = membersData?.map(m => m.user_id) || [];

          channels.push({
            id: item.channels.id,
            name: item.channels.name,
            description: item.channels.description || undefined,
            createdBy: item.channels.created_by || '',
            members,
            createdAt: new Date(item.channels.created_at)
          });
        }
      }

      return channels;
    } catch (error) {
      console.error('Exception getting regular channels:', error);
      return [];
    }
  }

  async joinChannel(channelId: string): Promise<boolean> {
    if (!this.currentUser) return false;
    
    try {
      const { error } = await supabase
        .from('channel_members')
        .insert({
          channel_id: channelId,
          user_id: this.currentUser.id
        });

      if (error) {
        console.error('Error joining channel:', error);
        return false;
      }

      console.log('Joined channel:', channelId);
      return true;
    } catch (error) {
      console.error('Exception joining channel:', error);
      return false;
    }
  }

  // Message methods
  async sendMessage(
    channelId: string, 
    content: string, 
    type: 'text' | 'voice' | 'file' | 'image' = 'text',
    options?: {
      fileName?: string;
      fileSize?: number;
      duration?: number;
      fileUri?: string;
      mimeType?: string;
    }
  ): Promise<Message | null> {
    if (!this.currentUser) {
      console.error('No current user for sending message');
      return null;
    }
    
    console.log('Sending message:', { channelId, content, type, options });
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          chat_id: channelId,
          sender_id: this.currentUser.id,
          type,
          text: content,
          attachment_url: options?.fileUri,
          file_name: options?.fileName,
          mime_type: options?.mimeType,
          duration_sec: options?.duration
        })
        .select()
        .single();

      if (error) {
        console.error('Error sending message:', error);
        return null;
      }

      const message: Message = {
        id: data.id,
        channelId: data.chat_id,
        userId: data.sender_id,
        content: data.text || '',
        type: data.type as 'text' | 'voice' | 'file' | 'image',
        timestamp: new Date(data.created_at),
        fileName: data.file_name || undefined,
        duration: data.duration_sec || undefined,
        fileUri: data.attachment_url || undefined,
        mimeType: data.mime_type || undefined
      };

      console.log('Message sent successfully:', message.id);
      return message;
    } catch (error) {
      console.error('Exception sending message:', error);
      return null;
    }
  }

  async getMessages(channelId: string): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', channelId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }

      const messages: Message[] = data.map(dbMessage => ({
        id: dbMessage.id,
        channelId: dbMessage.chat_id,
        userId: dbMessage.sender_id,
        content: dbMessage.text || '',
        type: dbMessage.type as 'text' | 'voice' | 'file' | 'image',
        timestamp: new Date(dbMessage.created_at),
        fileName: dbMessage.file_name || undefined,
        duration: dbMessage.duration_sec || undefined,
        fileUri: dbMessage.attachment_url || undefined,
        mimeType: dbMessage.mime_type || undefined
      }));

      return messages;
    } catch (error) {
      console.error('Exception fetching messages:', error);
      return [];
    }
  }

  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
    try {
      const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all users:', error);
        return [];
      }

      const users: User[] = data.map(dbUser => ({
        id: dbUser.id,
        name: dbUser.name,
        username: dbUser.username,
        password: dbUser.password,
        avatar: dbUser.photo_url || undefined,
        backgroundImage: dbUser.wallpaper_url || undefined,
        createdAt: new Date(dbUser.created_at)
      }));

      console.log('All users in database:', users.map(u => u.username));
      return users;
    } catch (error) {
      console.error('Exception fetching all users:', error);
      return [];
    }
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('direct_chats').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}

export const supabaseService = new SupabaseService();
