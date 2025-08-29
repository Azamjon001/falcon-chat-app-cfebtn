
export interface User {
  id: string;
  name: string;
  username: string; // includes @ symbol
  password: string;
  avatar?: string;
  backgroundImage?: string;
  createdAt: Date;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  members: string[];
  createdAt: Date;
}

export interface Message {
  id: string;
  channelId: string;
  userId: string;
  content: string;
  type: 'text' | 'voice' | 'file' | 'image';
  timestamp: Date;
  fileName?: string;
  fileSize?: number;
  duration?: number; // for voice messages in seconds
  fileUri?: string; // for files and images
  mimeType?: string;
}
