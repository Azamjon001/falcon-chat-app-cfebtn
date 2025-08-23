
export interface User {
  id: string;
  name: string;
  username: string; // includes @ symbol
  password: string;
  avatar?: string;
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
  type: 'text' | 'voice' | 'file';
  timestamp: Date;
  fileName?: string;
  fileSize?: number;
  duration?: number; // for voice messages
}
