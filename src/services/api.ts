import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For Android emulator, use 10.0.2.2. For iOS or real device, use your machine's IP (e.g., 10.166.212.82).
// For web browser on the same machine, 'localhost' is best.
const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let authToken: string | null = null;

export const setToken = (token: string | null) => {
  authToken = token;
};

// Request interceptor to add the auth token
api.interceptors.request.use(
  async (config) => {
    // Try to get token from variable or storage if not present
    if (!authToken) {
      authToken = await AsyncStorage.getItem('accessToken');
    }
    
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Try to get a new access token
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        if (response.data.success) {
          const { token, refreshToken: newRefreshToken } = response.data;
          
          // Update storage and state
          await AsyncStorage.setItem('accessToken', token);
          await AsyncStorage.setItem('refreshToken', newRefreshToken);
          setToken(token);

          // Update original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear storage and redirect to login (via auth context usually)
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('user');
        setToken(null);
        // We can't easily redirect from here without a navigator reference, 
        // but the AuthContext state change will trigger a re-render/redirect.
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

