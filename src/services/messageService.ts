import api from './api';

export const messageService = {
  // Get all conversations for the current user
  getConversations: async () => {
    try {
      const response = await api.get('/v1/messages/conversations');
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  // Get messages with a specific user
  getMessages: async (userId: string) => {
    try {
      const response = await api.get(`/v1/messages/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Send a message
  sendMessage: async (receiverId: string, content: string) => {
    try {
      const response = await api.post('/v1/messages', { receiverId, content });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Broadcast message (Coach only)
  broadcastMessage: async (content: string) => {
    try {
      const response = await api.post('/v1/messages/broadcast', { content });
      return response.data;
    } catch (error) {
      console.error('Error broadcasting message:', error);
      throw error;
    }
  },

  // Delete message
  deleteMessage: async (messageId: string, deleteForEveryone: boolean = false) => {
    try {
      const response = await api.delete(`/v1/messages/${messageId}`, {
        data: { deleteForEveryone }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }
};
