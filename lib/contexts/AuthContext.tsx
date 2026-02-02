"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { login as apiLogin, logout as apiLogout, verifyAuth } from "@/lib/api/blogService";

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      verifyAuthToken(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyAuthToken = async (authToken: string) => {
    try {
      const response = await verifyAuth();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        setToken(authToken);
      } else {
        handleLogout();
      }
    } catch (error) {
      // Silently handle auth verification failure for public pages
      console.log("Auth verification failed - user not authenticated");
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await apiLogin(username, password);

      if (response.success && response.data) {
        const { token: newToken, user: newUser } = response.data;
        localStorage.setItem("authToken", newToken);
        setToken(newToken);
        setUser(newUser);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    apiLogout();
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  };

  const checkAuth = async () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      await verifyAuthToken(storedToken);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login: handleLogin,
    logout: handleLogout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
