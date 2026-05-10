import { create } from "zustand";
export type FavoriteState = {
  favorite: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}
export const useFavoriteStore = create<FavoriteState>((set) => ({
  favorite: [],
  addFavorite: (id) => set((state) => ({ favorite: [...state.favorite, id] })),
  removeFavorite: (id) => set((state) => ({ favorite: state.favorite.filter((p) => p !== id) })),
}));