import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { setToken } from '../services/api';

interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: 'coach' | 'athlete';
  isProfileComplete: boolean;
  profilePhoto?: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (userData: any, token: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const storedUser = await AsyncStorage.getItem('user');

      if (accessToken && storedUser) {
        setToken(accessToken);
        setUser(JSON.parse(storedUser));
        
        // Optionally verify token by calling /me
        try {
          const response = await api.get('/auth/me');
          if (response.data.success) {
            setUser(response.data.data);
            await AsyncStorage.setItem('user', JSON.stringify(response.data.data));
          }
        } catch (error) {
          console.error('Check auth failed, might need refresh', error);
          // Interceptor will handle refresh if token is expired
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData: any, accessToken: string, refreshToken: string) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      
      setToken(accessToken);
      setUser(userData);
    } catch (error) {
      console.error('Error during login storage:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('user');
      
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
