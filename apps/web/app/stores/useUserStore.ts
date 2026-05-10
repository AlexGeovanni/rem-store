import { create } from "zustand";

export const useUserStore = create<UserState>((set)=>{
    return {
        user: null,
        isloading: true,
        setUser: (user: any) => set({ user, isloading: false }),
    }
})

export interface UserState {
    user: any | null;
    isloading: boolean;
    setUser: (user: any) => void;
}