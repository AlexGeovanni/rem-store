"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { userQueryKeys } from "@/app/lib/queryKeys";

export type UserJWT = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: UserJWT | null;

  isAuthenticated: boolean;

  clearUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  clearUser: () => undefined,
});

type Props = {
  user: UserJWT | null;
  children: React.ReactNode;
};

export function AuthProvider({ user, children }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<UserJWT | null>(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    const handleAuthExpired = () => {
      setCurrentUser(null);
      queryClient.removeQueries({ queryKey: userQueryKeys.all });
      queryClient.removeQueries({ queryKey: ["cart"] });
      router.refresh();
    };

    window.addEventListener("auth:expired", handleAuthExpired);
    return () => window.removeEventListener("auth:expired", handleAuthExpired);
  }, [queryClient, router]);

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
