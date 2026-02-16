import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/Movie';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Replace with actual API calls to your backend
const API_URL = import.meta.env.VITE_API_URL || 'https://movies-app-final.onrender.com/api';
//const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:5000/api';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const newUser: User = {
          id: data._id,
          email: data.email,
          name: data.name,
          token: data.token
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsLoading(false);
        return true;
      } else {
        const error = await response.json();
        console.error('Login error:', error.message);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const newUser: User = {
          id: data._id,
          email: data.email,
          name: data.name,
          token: data.token
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsLoading(false);
        return true;
      } else {
        const error = await response.json();
        console.error('Signup error:', error.message);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};