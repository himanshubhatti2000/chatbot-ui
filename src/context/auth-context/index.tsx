import React, { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string } | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Utilizing useLocalStorage ensures that our application maintains state persistence even upon page refresh, providing a seamless user experience."
  const [user, setUser] = useLocalStorage<{ email: string } | null>(
    "user",
    null
  );

  // login action
  const login = (email: string) => {
    setUser({ email });
  };

  // logout action
  const logout = () => {
    setUser(null);
  };

  const value = {
    isLoggedIn: !!user,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
