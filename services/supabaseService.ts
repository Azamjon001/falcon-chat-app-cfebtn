
import { supabase   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} from '../app/integrations/supabase/client';
import { User, Channel, Message   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} from '../types/User';

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
  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

export interface DatabaseChannel {
  id: string;
  name: string;
  handle?: string;
  description?: string;
  created_by?: string;
  created_at: string;
  background_image_url?: string;
  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

class SupabaseService {
  private currentUser: User | null = null;

  // User methods
  async createUser(name: string, username: string, password: string): Promise<User> {
    console.log('Creating user in Supabase:', { name, username   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
});
    
    const formattedUsername = username.startsWith('@') ? username : `@${username  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}`;
    
    // Double-check username uniqueness before creating
    const isUnique = await this.isUsernameUnique(formattedUsername);
    if (!isUnique) {
      console.log('Username already exists during creation:', formattedUsername);
      throw new Error('Username already exists');
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
    
    const { data, error   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} = await supabase
      .from('app_users')
      .insert({
        username: formattedUsername,
        name: name.trim(),
        password, // In production, this should be hashed
        online: false
        // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
})
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('Username already exists');
        // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
      throw new Error(`Failed to create user: ${error.message  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}`);
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

    const user: User = {
      id: data.id,
      name: data.name,
      username: data.username,
      password: data.password,
      avatar: data.photo_url || undefined,
      backgroundImage: data.wallpaper_url || undefined,
      createdAt: new Date(data.created_at)
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
};

    console.log('User created successfully:', user.username);
    return user;
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

  async isUsernameUnique(username: string): Promise<boolean> {
    const formattedUsername = username.startsWith('@') ? username : `@${username  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}`;
    
    console.log('Checking username uniqueness:', formattedUsername);
    
    // Use exact match with case-insensitive comparison
    const { data, error   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} = await supabase
      .from('app_users')
      .select('id, username')
      .eq('username', formattedUsername)
      .limit(1);

    if (error) {
      console.error('Error checking username uniqueness:', error);
      throw new Error('Failed to check username availability');
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

    const isUnique = !data || data.length === 0;
    console.log('Username unique check result:', formattedUsername, 'is unique:', isUnique);
    
    if (!isUnique && data && data.length > 0) {
      console.log('Existing username found:', data[0].username);
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
    
    return isUnique;
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

  async loginUser(username: string, password: string): Promise<User | null> {
    console.log('Attempting login:', username);
    
    const formattedUsername = username.startsWith('@') ? username : `@${username  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}`;
    
    const { data, error   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} = await supabase
      .from('app_users')
      .select('*')
      .eq('username', formattedUsername)
      .eq('password', password)
      .single();

    if (error || !data) {
      console.log('Login failed:', error?.message || 'User not found');
      return null;
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

    const user: User = {
      id: data.id,
      name: data.name,
      username: data.username,
      password: data.password,
      avatar: data.photo_url || undefined,
      backgroundImage: data.wallpaper_url || undefined,
      createdAt: new Date(data.created_at)
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
};

    this.currentUser = user;
    
    // Update user online status
    await supabase
      .from('app_users')
      .update({ online: true, last_seen: new Date().toISOString()   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
})
      .eq('id', user.id);

    console.log('Login successful:', user.username);
    return user;
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

  getCurrentUser(): User | null {
    return this.currentUser;
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

  async logoutUser(): Promise<void> {
    if (this.currentUser) {
      // Update user offline status
      await supabase
        .from('app_users')
        .update({ online: false, last_seen: new Date().toISOString()   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
})
        .eq('id', this.currentUser.id);
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
    
    console.log('User logged out');
    this.currentUser = null;
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

  async updateUserProfile(updates: Partial<Pick<User, 'name' | 'avatar' | 'backgroundImage'>>): Promise<boolean> {
    if (!this.currentUser) return false;
    
    console.log('Updating user profile:', updates);
    
    const dbUpdates: any = {  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
};
    if (updates.name) dbUpdates.name = updates.name;
    if (updates.avatar) dbUpdates.photo_url = updates.avatar;
    if (updates.backgroundImage) dbUpdates.wallpaper_url = updates.backgroundImage;

    const { error   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} = await supabase
      .from('app_users')
      .update(dbUpdates)
      .eq('id', this.currentUser.id);

    if (error) {
      console.error('Error updating profile:', error);
      return false;
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

    // Update local current user
    this.currentUser = { ...this.currentUser, ...updates   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
};
    console.log('Profile updated successfully');
    return true;
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

  async searchUsers(query: string): Promise<User[]> {
    console.log('Searching users:', query);
    
    const formattedQuery = query.startsWith('@') ? query : `@${query  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}`;
    
    const { data, error   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} = await supabase
      .from('app_users')
      .select('*')
      .or(`username.ilike.%${formattedQuery  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}%,name.ilike.%${query  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}%`)
      .limit(20);

    if (error) {
      console.error('Error searching users:', error);
      return [];
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

    const users: User[] = data.map(dbUser => ({
      id: dbUser.id,
      name: dbUser.name,
      username: dbUser.username,
      password: dbUser.password,
      avatar: dbUser.photo_url || undefined,
      backgroundImage: dbUser.wallpaper_url || undefined,
      createdAt: new Date(dbUser.created_at)
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}));

    console.log('Search results:', users.length, 'users found');
    return users;
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

  async getUserById(id: string): Promise<User | undefined> {
    const { data, error   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} = await supabase
      .from('app_users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return undefined;
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

    return {
      id: data.id,
      name: data.name,
      username: data.username,
      password: data.password,
      avatar: data.photo_url || undefined,
      backgroundImage: data.wallpaper_url || undefined,
      createdAt: new Date(data.created_at)
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
};
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

  // Channel methods
  async createChannel(name: string, description?: string): Promise<Channel | null> {
    if (!this.currentUser) return null;
    
    console.log('Creating channel:', name);
    
    const { data, error   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} = await supabase
      .from('channels')
      .insert({
        name,
        description,
        created_by: this.currentUser.id
        // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
})
      .select()
      .single();

    if (error) {
      console.error('Error creating channel:', error);
      return null;
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

    // Add creator as member
    await supabase
      .from('channel_members')
      .insert({
        channel_id: data.id,
        user_id: this.currentUser.id
        // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
});

    const channel: Channel = {
      id: data.id,
      name: data.name,
      description: data.description || undefined,
      createdBy: data.created_by || this.currentUser.id,
      members: [this.currentUser.id],
      createdAt: new Date(data.created_at)
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
};

    return channel;
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

  async getChannels(): Promise<Channel[]> {
    if (!this.currentUser) return [];
    
    const { data, error   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} = await supabase
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
      console.error('Error fetching channels:', error);
      return [];
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

    const channels: Channel[] = [];
    for (const item of data) {
      if (item.channels) {
        // Get all members for this channel
        const { data: membersData   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} = await supabase
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
          // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
});
        // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

    return channels;
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

  async joinChannel(channelId: string): Promise<boolean> {
    if (!this.currentUser) return false;
    
    const { error   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} = await supabase
      .from('channel_members')
      .insert({
        channel_id: channelId,
        user_id: this.currentUser.id
        // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
});

    if (error) {
      console.error('Error joining channel:', error);
      return false;
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

    console.log('Joined channel:', channelId);
    return true;
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
  ): Promise<Message | null> {
    if (!this.currentUser) return null;
    
    console.log('Sending message:', { channelId, content, type, options   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
});
    
    const { data, error   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} = await supabase
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
        // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
})
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return null;
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
};

    return message;
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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

  async getMessages(channelId: string): Promise<Message[]> {
    const { data, error   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
} = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', channelId)
      .order('created_at', { ascending: true   // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
});

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
      // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('app_users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}));

    return messages;
    // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
  // Debug methods
  async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users for debugging');
    
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
  }

  async clearAllData(): Promise<boolean> {
    console.log('Clearing all data - USE WITH CAUTION');
    
    try {
      // Delete in order due to foreign key constraints
      await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('channel_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
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
