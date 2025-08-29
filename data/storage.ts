
import { User, Channel, Message } from '../types/User';

// Simple in-memory storage for demo purposes
class Storage {
  private users: User[] = [];
  private channels: Channel[] = [];
  private messages: Message[] = [];
  private currentUser: User | null = null;

  // User methods
  createUser(name: string, username: string, password: string): User {
    console.log('Creating user:', { name, username });
    const user: User = {
      id: Date.now().toString(),
      name,
      username: username.startsWith('@') ? username : `@${username}`,
      password,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  // Check if username is unique
  isUsernameUnique(username: string): boolean {
    const formattedUsername = username.startsWith('@') ? username : `@${username}`;
    const existingUser = this.users.find(u => u.username.toLowerCase() === formattedUsername.toLowerCase());
    console.log('Checking username uniqueness:', formattedUsername, 'exists:', !!existingUser);
    return !existingUser;
  }

  loginUser(username: string, password: string): User | null {
    console.log('Attempting login:', username);
    const formattedUsername = username.startsWith('@') ? username : `@${username}`;
    const user = this.users.find(u => u.username === formattedUsername && u.password === password);
    if (user) {
      this.currentUser = user;
      console.log('Login successful:', user.username);
    } else {
      console.log('Login failed');
    }
    return user;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logoutUser(): void {
    console.log('User logged out');
    this.currentUser = null;
  }

  // Update user profile
  updateUserProfile(updates: Partial<Pick<User, 'name' | 'avatar' | 'backgroundImage'>>): boolean {
    if (!this.currentUser) return false;
    
    console.log('Updating user profile:', updates);
    const userIndex = this.users.findIndex(u => u.id === this.currentUser!.id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updates };
      this.currentUser = { ...this.currentUser, ...updates };
      console.log('Profile updated successfully');
      return true;
    }
    return false;
  }

  searchUsers(query: string): User[] {
    console.log('Searching users:', query);
    const formattedQuery = query.startsWith('@') ? query : `@${query}`;
    return this.users.filter(user => 
      user.username.toLowerCase().includes(formattedQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  // Channel methods
  createChannel(name: string, description?: string): Channel | null {
    if (!this.currentUser) return null;
    
    console.log('Creating channel:', name);
    const channel: Channel = {
      id: Date.now().toString(),
      name,
      description,
      createdBy: this.currentUser.id,
      members: [this.currentUser.id],
      createdAt: new Date(),
    };
    this.channels.push(channel);
    return channel;
  }

  getChannels(): Channel[] {
    if (!this.currentUser) return [];
    return this.channels.filter(channel => channel.members.includes(this.currentUser!.id));
  }

  joinChannel(channelId: string): boolean {
    if (!this.currentUser) return false;
    
    const channel = this.channels.find(c => c.id === channelId);
    if (channel && !channel.members.includes(this.currentUser.id)) {
      channel.members.push(this.currentUser.id);
      console.log('Joined channel:', channel.name);
      return true;
    }
    return false;
  }

  // Message methods
  sendMessage(
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
  ): Message | null {
    if (!this.currentUser) return null;
    
    console.log('Sending message:', { channelId, content, type, options });
    const message: Message = {
      id: Date.now().toString(),
      channelId,
      userId: this.currentUser.id,
      content,
      type,
      timestamp: new Date(),
      ...options,
    };
    this.messages.push(message);
    return message;
  }

  getMessages(channelId: string): Message[] {
    return this.messages
      .filter(message => message.channelId === channelId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  // Initialize with some demo data
  initializeDemoData(): void {
    console.log('Initializing demo data');
    
    // Create demo users
    this.createUser('John Doe', '@john_doe', 'password123');
    this.createUser('Jane Smith', '@jane_smith', 'password123');
    this.createUser('Bob Wilson', '@bob_wilson', 'password123');
    
    // Create demo channels
    const generalChannel = this.createChannel('General', 'General discussion');
    const randomChannel = this.createChannel('Random', 'Random conversations');
    
    if (generalChannel && randomChannel) {
      // Add some demo messages
      this.sendMessage(generalChannel.id, 'Welcome to Falcon! 🦅', 'text');
      this.sendMessage(generalChannel.id, 'This is a demo message', 'text');
      this.sendMessage(randomChannel.id, 'Hello from the random channel!', 'text');
    }
    
    // Reset current user
    this.currentUser = null;
  }
}

export const storage = new Storage();

// Initialize demo data
storage.initializeDemoData();
