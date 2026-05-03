import axios from 'axios';

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
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
