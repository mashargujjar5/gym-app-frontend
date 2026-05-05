import api from './api';

export const workoutService = {
  // Get athlete weekly workout schedule
  getWeeklySchedule: async (start?: string, end?: string) => {
    try {
      const url = start && end 
        ? `/v1/athlete/workouts/schedule?start=${start}&end=${end}`
        : '/v1/athlete/workouts/schedule';
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Get schedule error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Get workout library (Templates)
  getWorkoutLibrary: async () => {
    try {
      const response = await api.get('/v1/athlete/workouts/library');
      return response.data;
    } catch (error: any) {
      console.error('Get library error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Get workout history (Completed logs)
  getWorkoutHistory: async () => {
    try {
      const response = await api.get('/v1/athlete/workouts/history');
      return response.data;
    } catch (error: any) {
      console.error('Get history error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Get workout details
  getWorkoutDetail: async (id: string) => {
    try {
      const response = await api.get(`/v1/athlete/workouts/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Get workout detail error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Complete a workout and log it
  completeWorkout: async (workoutData: any) => {
    try {
      const response = await api.post('/v1/athlete/workouts/complete', workoutData);
      return response.data;
    } catch (error: any) {
      console.error('Complete workout error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Get dashboard data (today's workout, weekly summary, etc)
  getDashboardData: async () => {
    try {
      const response = await api.get('/v1/athlete/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Get dashboard data error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Start a workout session
  startWorkout: async (id: string) => {
    try {
      const response = await api.post(`/v1/athlete/workouts/${id}/start`);
      return response.data;
    } catch (error: any) {
      console.error('Start workout error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  }
};
