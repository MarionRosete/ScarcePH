import { CheckToken } from '@/api';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoginAPI } from '@/api';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole?: 'admin' | 'user';
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    async function checkAuth() {
        try {
            await CheckToken();
            setIsAuthenticated(true);
        } catch {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }
   
    checkAuth();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    try {
        const response = await LoginAPI(data.email, data.password);
        localStorage.setItem("token", response.access_token);
        toast.success("Login successful");
         setIsAuthenticated(true);
    } catch (error) {
        toast.error(
            error instanceof Error ? error.message : "Login failed"
        );
    }
   
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  console.log("AuthProvider - isAuthenticated:", isAuthenticated, "isLoading:", isLoading);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};