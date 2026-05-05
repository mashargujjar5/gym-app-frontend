import api from './api';

export const athleteService = {
  // Get athlete profile
  getProfile: async () => {
    try {
      const response = await api.get('/v1/profile');
      return response.data;
    } catch (error: any) {
      console.error('Get profile error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Update athlete profile (including photo)
  updateProfile: async (formData: FormData) => {
    try {
      const response = await api.put('/v1/profile', formData, {
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

  // Get athlete dashboard summary
  getDashboard: async () => {
    try {
      const response = await api.get('/v1/athlete/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Get dashboard error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Get today's workout
  getTodayWorkout: async () => {
    try {
      const response = await api.get('/v1/athlete/dashboard/today-workout');
      return response.data;
    } catch (error: any) {
      console.error('Get today workout error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  }
};
