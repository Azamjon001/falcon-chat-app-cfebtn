
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
  private messageSubscriptions: Map<string, any> = new Map();

  // User methods
  async createUser(name: string, username: string, password: string): Promise<User> {
    console.log('Creating user:', { name, username });
    
    const formattedUsername = username.startsWith('@') ? username : `@${username}`;
    
    try {
      const { data, error } = await supabase
        .from('app_users')
        .insert({
          username: formattedUsername,
          name: name.trim(),
          password,
          online: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user:', error);
        if (error.code === '23505') {
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
    } catch (error: any) {
      console.error('Exception creating user:', error);
      throw error;
    }
  }

  async isUsernameUnique(username: string): Promise<boolean> {
    const formattedUsername = username.startsWith('@') ? username : `@${username}`;
    
    try {
      const { data, error } = await supabase
        .from('app_users')
        .select('id')
        .eq('username', formattedUsername)
        .limit(1);

      if (error) {
        console.error('Error checking username:', error);
        return false;
      }

      return !data || data.length === 0;
    } catch (error) {
      console.error('Exception checking username:', error);
      return false;
    }
  }

  async loginUser(username: string, password: string): Promise<User | null> {
    console.log('Login attempt:', username);
    
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
    console.log('User logged out');
    // Clean up subscriptions
    this.messageSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.messageSubscriptions.clear();
    this.currentUser = null;
  }

  async updateUserProfile(updates: Partial<Pick<User, 'name' | 'avatar' | 'backgroundImage'>>): Promise<boolean> {
    if (!this.currentUser) return false;
    
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

      this.currentUser = { ...this.currentUser, ...updates };
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

  async getUserByUsername(username: string): Promise<User | undefined> {
    const formattedUsername = username.startsWith('@') ? username : `@${username}`;
    
    try {
      const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('username', formattedUsername)
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
      console.error('Exception getting user by username:', error);
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
      const { error: memberError } = await supabase
        .from('channel_members')
        .insert({
          channel_id: data.id,
          user_id: this.currentUser.id
        });

      if (memberError) {
        console.error('Error adding creator as member:', memberError);
        // Don't fail the channel creation, just log the error
      }

      const channel: Channel = {
        id: data.id,
        name: data.name,
        description: data.description || undefined,
        createdBy: data.created_by || this.currentUser.id,
        members: [this.currentUser.id],
        createdAt: new Date(data.created_at)
      };

      console.log('Channel created successfully:', channel.id);
      return channel;
    } catch (error) {
      console.error('Exception creating channel:', error);
      return null;
    }
  }

  async addUserToChannel(channelId: string, username: string): Promise<boolean> {
    if (!this.currentUser) return false;
    
    console.log('Adding user to channel:', { channelId, username });
    
    try {
      // Find user by username
      const user = await this.getUserByUsername(username);
      if (!user) {
        console.error('User not found:', username);
        return false;
      }

      // Check if user is already a member
      const { data: existingMember } = await supabase
        .from('channel_members')
        .select('id')
        .eq('channel_id', channelId)
        .eq('user_id', user.id)
        .single();

      if (existingMember) {
        console.log('User is already a member of this channel');
        return true;
      }

      // Add user to channel
      const { error } = await supabase
        .from('channel_members')
        .insert({
          channel_id: channelId,
          user_id: user.id
        });

      if (error) {
        console.error('Error adding user to channel:', error);
        return false;
      }

      console.log('User added to channel successfully');
      return true;
    } catch (error) {
      console.error('Exception adding user to channel:', error);
      return false;
    }
  }

  async getChannels(): Promise<Channel[]> {
    if (!this.currentUser) return [];
    
    try {
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

  // Real-time message subscription - FIXED VERSION
  subscribeToMessages(channelId: string, onMessage: (message: Message) => void): () => void {
    console.log('Setting up real-time subscription for channel:', channelId);
    
    // Clean up existing subscription for this channel
    if (this.messageSubscriptions.has(channelId)) {
      console.log('Cleaning up existing subscription for channel:', channelId);
      this.messageSubscriptions.get(channelId).unsubscribe();
    }

    // Create a unique channel name to avoid conflicts
    const channelName = `messages_${channelId}_${Date.now()}`;
    
    const subscription = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${channelId}`
        },
        (payload) => {
          console.log('Real-time message received:', payload);
          
          if (payload.new) {
            const dbMessage = payload.new as DatabaseMessage;
            
            const message: Message = {
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
            };

            console.log('Processed message for callback:', message);
            onMessage(message);
          }
        }
      )
      .subscribe((status) => {
        console.log('Real-time subscription status for channel', channelId, ':', status);
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to real-time updates for channel:', channelId);
        } else if (status === 'CHANNEL_ERROR') {
          console.error('Real-time subscription error for channel:', channelId);
        }
      });

    this.messageSubscriptions.set(channelId, subscription);

    // Return unsubscribe function
    return () => {
      console.log('Unsubscribing from real-time updates for channel:', channelId);
      subscription.unsubscribe();
      this.messageSubscriptions.delete(channelId);
    };
  }

  // Improved file upload methods with better error handling
  async uploadFile(fileUri: string, fileName: string, mimeType?: string): Promise<string | null> {
    try {
      console.log('=== UPLOADING FILE TO SUPABASE STORAGE ===');
      console.log('File URI:', fileUri);
      console.log('File name:', fileName);
      console.log('MIME type:', mimeType);

      // Validate file URI
      if (!fileUri) {
        console.error('No file URI provided');
        return null;
      }

      // Create a unique file name to avoid conflicts
      const timestamp = Date.now();
      const uniqueFileName = `${timestamp}_${fileName}`;
      const filePath = `uploads/${uniqueFileName}`;

      // Read the file as blob with better error handling
      let response;
      try {
        response = await fetch(fileUri);
        if (!response.ok) {
          console.error('Failed to fetch file:', response.status, response.statusText);
          return null;
        }
      } catch (fetchError) {
        console.error('Error fetching file:', fetchError);
        return null;
      }
      
      const blob = await response.blob();
      console.log('File blob created - Size:', blob.size, 'bytes, Type:', blob.type);

      if (blob.size === 0) {
        console.error('File is empty, cannot upload');
        return null;
      }

      // Determine content type
      const contentType = mimeType || blob.type || 'application/octet-stream';
      console.log('Using content type:', contentType);

      // Upload to Supabase Storage with retry logic
      let uploadAttempts = 0;
      const maxAttempts = 3;
      
      while (uploadAttempts < maxAttempts) {
        try {
          console.log(`Upload attempt ${uploadAttempts + 1}/${maxAttempts}`);
          
          const { data, error } = await supabase.storage
            .from('files')
            .upload(filePath, blob, {
              contentType,
              upsert: false
            });

          if (error) {
            console.error(`Upload attempt ${uploadAttempts + 1} failed:`, error);
            
            if (error.message.includes('Bucket not found')) {
              console.error('Storage bucket "files" not found');
              return null;
            }
            
            if (uploadAttempts === maxAttempts - 1) {
              console.error('All upload attempts failed');
              return null;
            }
            
            uploadAttempts++;
            await new Promise(resolve => setTimeout(resolve, 1000 * uploadAttempts)); // Exponential backoff
            continue;
          }

          console.log('File uploaded successfully:', data.path);

          // Get the public URL
          const { data: publicUrlData } = supabase.storage
            .from('files')
            .getPublicUrl(data.path);

          console.log('Public URL generated:', publicUrlData.publicUrl);
          
          // Verify the uploaded file is accessible
          try {
            const verifyResponse = await fetch(publicUrlData.publicUrl);
            if (verifyResponse.ok) {
              console.log('Upload verification successful');
              return publicUrlData.publicUrl;
            } else {
              console.warn('Upload verification failed, but returning URL anyway');
              return publicUrlData.publicUrl;
            }
          } catch (verifyError) {
            console.warn('Could not verify upload, but returning URL anyway:', verifyError);
            return publicUrlData.publicUrl;
          }
        } catch (uploadError) {
          console.error(`Upload attempt ${uploadAttempts + 1} exception:`, uploadError);
          uploadAttempts++;
          
          if (uploadAttempts >= maxAttempts) {
            console.error('All upload attempts failed with exceptions');
            return null;
          }
          
          await new Promise(resolve => setTimeout(resolve, 1000 * uploadAttempts));
        }
      }

      return null;
    } catch (error) {
      console.error('Exception in uploadFile:', error);
      return null;
    }
  }

  // Message methods with improved voice message handling
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
    
    console.log('=== SENDING MESSAGE ===');
    console.log('Channel ID:', channelId);
    console.log('Content:', content);
    console.log('Type:', type);
    console.log('Options:', options);
    
    try {
      let attachmentUrl = options?.fileUri;

      // Upload file to storage if it's a local file URI
      if (options?.fileUri && (type === 'voice' || type === 'file' || type === 'image')) {
        console.log('=== UPLOADING FILE BEFORE SENDING MESSAGE ===');
        
        let fileName = options.fileName || `${type}_${Date.now()}`;
        if (type === 'voice' && !fileName.includes('.')) {
          fileName += '.m4a';
        }

        // For voice messages, ensure we have a proper MIME type
        let mimeType = options.mimeType;
        if (type === 'voice' && !mimeType) {
          mimeType = 'audio/m4a';
        }

        const uploadedUrl = await this.uploadFile(options.fileUri, fileName, mimeType);
        if (uploadedUrl) {
          attachmentUrl = uploadedUrl;
          console.log('✅ File uploaded successfully to cloud storage:', uploadedUrl);
        } else {
          console.error('❌ Failed to upload file to cloud storage');
          
          // For voice messages, we should not proceed with local URI as it will become unavailable
          if (type === 'voice') {
            console.error('Voice message upload failed, cannot proceed with local URI');
            throw new Error('Failed to upload voice message to cloud storage');
          }
          
          // For other file types, we can try to proceed with original URI as fallback
          console.warn('Using original URI as fallback (may not work long-term)');
          attachmentUrl = options.fileUri;
        }
      }

      const messageData: any = {
        chat_id: channelId,
        sender_id: this.currentUser.id,
        type,
        text: content
      };

      // Add optional fields if provided
      if (attachmentUrl) messageData.attachment_url = attachmentUrl;
      if (options?.fileName) messageData.file_name = options.fileName;
      if (options?.mimeType) messageData.mime_type = options.mimeType;
      if (options?.duration) messageData.duration_sec = options.duration;

      console.log('Message data to insert:', messageData);

      const { data, error } = await supabase
        .from('messages')
        .insert(messageData)
        .select()
        .single();

      if (error) {
        console.error('Error inserting message into database:', error);
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

      console.log('✅ Message sent successfully:', message.id);
      return message;
    } catch (error) {
      console.error('Exception sending message:', error);
      return null;
    }
  }

  async getMessages(channelId: string): Promise<Message[]> {
    console.log('Fetching messages for channel:', channelId);
    
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

      console.log('Raw messages from database:', data);

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

      console.log('Processed messages:', messages);
      return messages;
    } catch (error) {
      console.error('Exception fetching messages:', error);
      return [];
    }
  }

  // Debug methods
  async getAllUsers(): Promise<User[]> {
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

      return users;
    } catch (error) {
      console.error('Exception fetching all users:', error);
      return [];
    }
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
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
