'use client';

import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id && i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    });
  },
  removeItem: (id, size) => {
    set((state) => ({
      items: state.items.filter((i) => !(i.id === id && i.size === size)),
    }));
  },
  updateQuantity: (id, size, quantity) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
