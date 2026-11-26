import { create } from 'zustand';
import { UserProfile, AuthTokens } from '../types';
import { storage } from '../utils/storage';

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  accessToken: string | null;
  isLoading: boolean;
  loginSuccess: (tokens: AuthTokens, user: UserProfile) => Promise<void>;
  updateUser: (user: UserProfile) => void;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true, // Default to demo/active session for seamless local testing
  user: {
    user_id: 'usr_demo_01',
    name: 'Fahmi Dani',
    email: 'fahmi.dani@forecastfx.com',
    role: 'PRO_TRADER',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  },
  accessToken: 'demo_token_valid',
  isLoading: false,

  loginSuccess: async (tokens, user) => {
    await storage.saveAuthTokens(tokens.access_token, tokens.refresh_token);
    await storage.setUserData(user);
    set({
      isAuthenticated: true,
      user,
      accessToken: tokens.access_token,
      isLoading: false,
    });
  },

  updateUser: (user) => set({ user }),

  logout: async () => {
    await storage.clearAuthTokens();
    set({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      isLoading: false,
    });
  },

  restoreSession: async () => {
    set({ isLoading: true });
    try {
      const token = await storage.getAccessToken();
      const user = await storage.getUserData<UserProfile>();
      if (token && user) {
        set({ isAuthenticated: true, user, accessToken: token, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },
}));

