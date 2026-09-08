import { create } from "zustand";
import { persist } from "zustand/middleware";
export type FavoriteState = {
  favorite: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
};
export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set) => ({
      favorite: [],
      addFavorite: (id: string) =>
        set((state) => ({ favorite: [...state.favorite, id] })),
      removeFavorite: (id: string) =>
        set((state) => ({ favorite: state.favorite.filter((p) => p !== id) })),
    }),
    {
      name: "favorite-storage",
    },
  ),
);
