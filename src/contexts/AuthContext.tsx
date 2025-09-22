import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  selectedSkill?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  setSelectedSkill: (skill: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      name: 'Sarah Chen',
      email,
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      name,
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const setSelectedSkill = (skill: string) => {
    if (user) {
      setUser({ ...user, selectedSkill: skill });
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    setSelectedSkill,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};