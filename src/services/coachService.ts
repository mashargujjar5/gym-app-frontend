import api from './api';

export const coachService = {
  // Get coach profile
  getProfile: async () => {
    try {
      const response = await api.get('/v1/profile');
      return response.data;
    } catch (error: any) {
      console.error('Get profile error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Update coach profile (including photo)
  updateProfile: async (formData: FormData) => {
    try {
      const response = await api.patch('/v1/coach/settings/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Update profile error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Get settings dashboard
  getSettingsDashboard: async () => {
    try {
      const response = await api.get('/v1/coach/settings/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Get settings error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Update notification settings
  updateNotifications: async (settings: any) => {
    try {
      const response = await api.patch('/v1/coach/settings/notifications', settings);
      return response.data;
    } catch (error: any) {
      console.error('Update notifications error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Update privacy settings
  updatePrivacy: async (settings: any) => {
    try {
      const response = await api.patch('/v1/coach/settings/privacy', settings);
      return response.data;
    } catch (error: any) {
      console.error('Update privacy error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Reset password
  resetPassword: async (passwords: any) => {
    try {
      const response = await api.post('/v1/coach/settings/security/reset-password', passwords);
      return response.data;
    } catch (error: any) {
      console.error('Reset password error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Invitations
  getInvites: async () => {
    try {
      const response = await api.get('/v1/coach/invites');
      return response.data;
    } catch (error: any) {
      console.error('Get invites error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  sendInvite: async (email: string) => {
    try {
      const response = await api.post('/v1/coach/invites/send', { email });
      return response.data;
    } catch (error: any) {
      console.error('Send invite error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  resendInvite: async (id: string) => {
    try {
      const response = await api.post(`/v1/coach/invites/${id}/resend`);
      return response.data;
    } catch (error: any) {
      console.error('Resend invite error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  cancelInvite: async (id: string) => {
    try {
      const response = await api.delete(`/v1/coach/invites/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Cancel invite error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Get athletes assigned to coach
  getCoachAthletes: async () => {
    try {
      const response = await api.get('/v1/coach/athletes');
      return response.data;
    } catch (error: any) {
      console.error('Get athletes error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Get client prehab status
  getClientPrehab: async (clientId: string) => {
    try {
      const response = await api.get(`/v1/coach/clients/${clientId}/prehab-status`);
      return response.data;
    } catch (error: any) {
      console.error('Get prehab status error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  }
};
