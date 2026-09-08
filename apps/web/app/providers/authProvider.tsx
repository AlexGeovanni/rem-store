"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;

  isAuthenticated: boolean;

  clearUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  clearUser: () => undefined,
});

type Props = {
  user: User | null;
  children: React.ReactNode;
};

export function AuthProvider({ user, children }: Props) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    const handleAuthExpired = () => {
      setCurrentUser(null);
      router.refresh();
    };

    window.addEventListener("auth:expired", handleAuthExpired);
    return () => window.removeEventListener("auth:expired", handleAuthExpired);
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isAuthenticated: !!currentUser,
        clearUser: () => setCurrentUser(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
