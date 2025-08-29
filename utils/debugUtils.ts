
import { supabaseService } from '../services/supabaseService';

export const debugRealtime = {
  async testMessageSending(channelId: string) {
    console.log('=== DEBUG: Testing message sending ===');
    
    const currentUser = supabaseService.getCurrentUser();
    if (!currentUser) {
      console.log('No current user found');
      return;
    }
    
    console.log('Current user:', currentUser.username);
    console.log('Channel ID:', channelId);
    
    // Send a test message
    const testMessage = `Test message at ${new Date().toLocaleTimeString()}`;
    const result = await supabaseService.sendMessage(channelId, testMessage, 'text');
    
    if (result) {
      console.log('Test message sent successfully:', result);
    } else {
      console.log('Failed to send test message');
    }
    
    return result;
  },

  async testImageMessage(channelId: string, imageUri: string) {
    console.log('=== DEBUG: Testing image message ===');
    console.log('Image URI:', imageUri);
    console.log('Channel ID:', channelId);
    
    const result = await supabaseService.sendMessage(channelId, 'Test Image', 'image', {
      fileUri: imageUri,
      fileName: 'test-image.jpg',
      mimeType: 'image/jpeg'
    });
    
    if (result) {
      console.log('Test image message sent successfully:', result);
    } else {
      console.log('Failed to send test image message');
    }
    
    return result;
  },

  logMessageData(message: any) {
    console.log('=== DEBUG: Message Data ===');
    console.log('ID:', message.id);
    console.log('Type:', message.type);
    console.log('Content:', message.content);
    console.log('File URI:', message.fileUri);
    console.log('File Name:', message.fileName);
    console.log('MIME Type:', message.mimeType);
    console.log('Timestamp:', message.timestamp);
    console.log('========================');
  }
};
