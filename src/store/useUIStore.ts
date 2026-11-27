import { create } from 'zustand';
import { ThemeMode, ThemePalette, getThemeColors } from '../constants/colors';
import { MarketSymbol, Timeframe } from '../types';

export interface ToastConfig {
  id?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface UIState {
  themeMode: ThemeMode;
  defaultTimeframe: Timeframe;
  primaryAsset: MarketSymbol;
  highAlertPush: boolean;
  hapticCues: boolean;
  dynamicCacheTTL: boolean;
  unreadNotificationsCount: number;

  toast: ToastConfig | null;
  isProfileDrawerOpen: boolean;
  isLeadingIndicatorsSheetOpen: boolean;
  selectedEventForModal: string | null;
  isHighAlertMode: boolean;

  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setDefaultTimeframe: (tf: Timeframe) => void;
  setPrimaryAsset: (symbol: MarketSymbol) => void;
  setHighAlertPush: (enabled: boolean) => void;
  setHapticCues: (enabled: boolean) => void;
  setDynamicCacheTTL: (enabled: boolean) => void;
  setUnreadNotificationsCount: (count: number) => void;

  showToast: (config: ToastConfig) => void;
  hideToast: () => void;
  setProfileDrawerOpen: (open: boolean) => void;
  setLeadingIndicatorsSheetOpen: (open: boolean, eventId?: string) => void;
  setHighAlertMode: (isHighAlert: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  themeMode: 'light', // Editorial Ivory Paper default per UI-Style-Guide.md
  defaultTimeframe: '1h',
  primaryAsset: 'XAUUSD',
  highAlertPush: true,
  hapticCues: false,
  dynamicCacheTTL: true,
  unreadNotificationsCount: 2,

  toast: null,
  isProfileDrawerOpen: false,
  isLeadingIndicatorsSheetOpen: false,
  selectedEventForModal: null,
  isHighAlertMode: false,

  setThemeMode: (themeMode) => set({ themeMode }),
  toggleTheme: () =>
    set((state) => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
  setDefaultTimeframe: (defaultTimeframe) => set({ defaultTimeframe }),
  setPrimaryAsset: (primaryAsset) => set({ primaryAsset }),
  setHighAlertPush: (highAlertPush) => set({ highAlertPush }),
  setHapticCues: (hapticCues) => set({ hapticCues }),
  setDynamicCacheTTL: (dynamicCacheTTL) => set({ dynamicCacheTTL }),
  setUnreadNotificationsCount: (unreadNotificationsCount) => set({ unreadNotificationsCount }),

  showToast: (config) => {
    const id = Date.now().toString();
    set({ toast: { ...config, id } });
  },

  hideToast: () => set({ toast: null }),

  setProfileDrawerOpen: (open) => set({ isProfileDrawerOpen: open }),

  setLeadingIndicatorsSheetOpen: (open, eventId) =>
    set({
      isLeadingIndicatorsSheetOpen: open,
      selectedEventForModal: eventId || null,
    }),

  setHighAlertMode: (isHighAlert) => set({ isHighAlertMode: isHighAlert }),
}));

export function useThemeColors(): ThemePalette {
  const themeMode = useUIStore((s) => s.themeMode);
  return getThemeColors(themeMode);
}
