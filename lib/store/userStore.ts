'use client';

import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  rewardPoints: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (user: Partial<User>) => void;
  addRewardPoints: (points: number) => void;
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateProfile: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
  addRewardPoints: (points) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, rewardPoints: state.user.rewardPoints + points }
        : null,
    })),
}));
