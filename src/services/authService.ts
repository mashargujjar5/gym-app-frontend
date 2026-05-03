import api, { setToken } from './api';

export const authService = {
  // Signup
  signup: async (userData: any) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Login
  login: async (credentials: any) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success && response.data.token) {
        setToken(response.data.token);
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Verify OTP
  verifyOTP: async (email: string, otp: string, type: 'email-verification' | 'forget-password') => {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp, type });
      if (response.data.success && response.data.token) {
        setToken(response.data.token);
      }
      return response.data;
    } catch (error: any) {
      console.error('Verify OTP error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Resend OTP
  resendOTP: async (email: string, type: 'email-verification' | 'forget-password') => {
    try {
      const response = await api.post('/auth/resend-otp', { email, type });
      return response.data;
    } catch (error: any) {
      console.error('Resend OTP error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Forgot Password
  forgotPassword: async (email: string) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      console.error('Forgot password error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Reset Password
  resetPassword: async (data: any) => {
    try {
      const response = await api.put('/auth/reset-password', data);
      return response.data;
    } catch (error: any) {
      console.error('Reset password error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Logout
  logout: () => {
    setToken(null);
  }
};
