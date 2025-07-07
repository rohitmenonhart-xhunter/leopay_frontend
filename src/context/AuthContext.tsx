import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import config from '../config';

// API URL
const API_URL = `${config.apiUrl}/auth`;

// Configure axios defaults for CORS
axios.defaults.withCredentials = false; // Change to false since we're not using cookies
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Create axios instance with proper configuration
const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds
});

// Types
interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  dashboardAccess: boolean;
  trainingProgress: number;
  videosWatched: number[];
  quizPassed: boolean;
  meetingScheduled: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  hasDashboardAccess: () => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create context
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          console.log('Loading user with token');
          const res = await axiosInstance.get('/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (res.data && res.data.success) {
            console.log('User loaded successfully:', res.data.user);
            setUser(res.data.user);
            setIsAuthenticated(true);
          } else {
            console.error('Invalid user data format:', res.data);
            throw new Error('Invalid user data format');
          }
        } catch (err: any) {
          console.error('Error loading user:', err);
          
          // Handle network errors specifically
          if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
            setError('Cannot connect to server. Please check if the server is running.');
          } else {
            setError('Session expired. Please login again.');
          }
          
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        console.log('No token found, user not authenticated');
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Set token in axios headers
  const setAuthToken = (token: string) => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  };

  // Check if user has dashboard access
  const hasDashboardAccess = () => {
    return user?.dashboardAccess === true;
  };

  // Register user
  const register = async (name: string, email: string, password: string, phone?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axiosInstance.post('/auth/register', { name, email, password, phone });
      
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      
      // Set dashboardAccess to false for new users
      const userData = {
        ...res.data.user,
        dashboardAccess: false
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      setError(null);
    } catch (err: any) {
      console.error('Registration error:', err);
      
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Cannot connect to server. Please check if the server is running.');
      } else {
        setError(err.response?.data?.message || 'Registration failed');
      }
      
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Login attempt with:', { email });
      
      // Use the axios instance without withCredentials
      const res = await axiosInstance.post('/auth/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Login response:', res.data);
      
      if (res.data.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        setError(null);
        
        // Set auth token in axios defaults
        setAuthToken(res.data.token);
        
        console.log('Login successful, user:', res.data.user);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle network errors specifically
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Cannot connect to server. Please check your internet connection and try again.');
      } else {
        const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
        setError(errorMessage);
      }
      
      setIsAuthenticated(false);
      
      // Clear any existing token on login failure
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearError,
        hasDashboardAccess
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 