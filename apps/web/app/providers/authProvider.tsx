"use client";

import { createContext, useContext } from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;

  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
});

type Props = {
  user: User | null;
  children: React.ReactNode;
};

export function AuthProvider({ user, children }: Props) {
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
