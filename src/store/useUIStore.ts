import { create } from 'zustand';

export interface ToastConfig {
  id?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface UIState {
  toast: ToastConfig | null;
  isProfileDrawerOpen: boolean;
  isLeadingIndicatorsSheetOpen: boolean;
  selectedEventForModal: string | null;
  isHighAlertMode: boolean;

  showToast: (config: ToastConfig) => void;
  hideToast: () => void;
  setProfileDrawerOpen: (open: boolean) => void;
  setLeadingIndicatorsSheetOpen: (open: boolean, eventId?: string) => void;
  setHighAlertMode: (isHighAlert: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  toast: null,
  isProfileDrawerOpen: false,
  isLeadingIndicatorsSheetOpen: false,
  selectedEventForModal: null,
  isHighAlertMode: false,

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

