import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosService from '../services/axiosInstance';
import { configureAxios } from '../services/axiosInstance';
interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a successful login
      const response = await axiosService.post('/auth/login', { email, password });
      
      console.log(response.data);
      configureAxios(response.data.access_token);
      let _user = response.data.user;
      _user.access_token = response.data.access_token;
      _user.refresh_token = response.data.refresh_token;
      setUser(_user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(_user));
      navigate('/feed');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // Mock forgot password function
  const forgotPassword = async (email: string) => {
    // In a real app, this would send a reset email
    console.log(`Reset password email sent to ${email}`);
    return Promise.resolve();
  };

  // Mock reset password function
  const resetPassword = async (token: string, password: string) => {
    // In a real app, this would verify the token and update the password
    console.log(`Password reset with token ${token}`);
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      forgotPassword, 
      resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}