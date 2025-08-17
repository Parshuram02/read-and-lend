import React, { createContext, useContext, useState } from 'react';

export type User = {
  id: string;
  role: 'admin' | 'user';
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (role: 'admin' | 'user', name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: 'admin' | 'user', name: string) => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      role,
      name,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};