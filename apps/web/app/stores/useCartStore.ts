import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
    id: string;
    productId: string;
    quantity: number;
    productName: string;
    unitPrice: number;
    url?: string;
    totalPrice: number;
    stock: number;
  };

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }
          return {
            items: [...state.items, item],
          };
        }),
      updateItem: (productId:string, quantity:number) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i,
          ),
        })),  
      removeItem: (productId:string) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "guest-cart",
    },
  ),
);
