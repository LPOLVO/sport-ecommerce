import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Order, WheelSpin } from '../types/product';

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  orders: Order[];
  wishlist: string[];
  spins: WheelSpin[];
  login: (email: string, password: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  addOrder: (order: Order) => void;
  addRewardPoints: (points: number) => void;
  recordSpin: (spin: WheelSpin) => void;
  getLastSpinDate: () => string | null;
}

const DEMO_USER: User = {
  id: 'user-1',
  email: 'demo@sports-hub.com',
  name: 'John Athlete',
  phone: '+1 (555) 123-4567',
  avatar: 'https://i.pravatar.cc/150?img=1',
  rewardPoints: 450,
  tier: 'silver',
  wishlist: ['2', '4', '8'],
  joinedDate: '2025-06-15',
  spinsRemaining: 1,
  lastSpinDate: undefined,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      orders: [],
      wishlist: [],
      spins: [],

      login: (email: string, password: string) => {
        // Simple demo login - any email/password works
        const user: User = {
          ...DEMO_USER,
          email,
          id: `user-${Date.now()}`,
          joinedDate: new Date().toISOString().split('T')[0],
        };

        set({
          user,
          isAuthenticated: true,
          wishlist: user.wishlist,
        });
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          orders: [],
          wishlist: [],
        }),

      updateProfile: (updates: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      addToWishlist: (productId: string) =>
        set((state) => {
          if (state.user && !state.wishlist.includes(productId)) {
            return {
              wishlist: [...state.wishlist, productId],
              user: { ...state.user, wishlist: [...state.user.wishlist, productId] },
            };
          }
          return state;
        }),

      removeFromWishlist: (productId: string) =>
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== productId),
          user: state.user
            ? { ...state.user, wishlist: state.user.wishlist.filter((id) => id !== productId) }
            : null,
        })),

      addOrder: (order: Order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),

      addRewardPoints: (points: number) =>
        set((state) => {
          if (!state.user) return state;

          const newPoints = state.user.rewardPoints + points;
          let tier = state.user.tier;

          // Determine tier based on points
          if (newPoints >= 1000) tier = 'platinum';
          else if (newPoints >= 500) tier = 'gold';
          else if (newPoints >= 250) tier = 'silver';
          else tier = 'bronze';

          return {
            user: {
              ...state.user,
              rewardPoints: newPoints,
              tier,
            },
          };
        }),

      recordSpin: (spin: WheelSpin) =>
        set((state) => ({
          spins: [spin, ...state.spins],
          user: state.user
            ? {
                ...state.user,
                spinsRemaining: 0,
                lastSpinDate: new Date().toISOString().split('T')[0],
              }
            : null,
        })),

      getLastSpinDate: () => {
        const state = get();
        return state.user?.lastSpinDate || null;
      },
    }),
    {
      name: 'user-store',
      version: 1,
    }
  )
);
