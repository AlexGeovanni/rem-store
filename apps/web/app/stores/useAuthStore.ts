import { create } from "zustand";
// import { User } from "@/utils/types/user-type";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isInitialized: false,
  setUser: (user: any) => set({ user, isInitialized: true }),
  logout: () => set({ user: null, isInitialized: true }),
  setInitialized: (value: boolean) => set({ isInitialized: value }),
}));

export interface AuthState {
  user: any | null;
  isInitialized: boolean;
  setUser: (user: any) => void;
  logout: () => void;
  setInitialized: (value: boolean) => void;
}
