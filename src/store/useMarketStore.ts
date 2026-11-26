import { create } from 'zustand';
import { MarketSymbol, TickerSummaryItem } from '../types';

interface MarketState {
  activeSymbol: MarketSymbol;
  tickers: Record<MarketSymbol, TickerSummaryItem>;
  isLiveConnected: boolean;
  setActiveSymbol: (symbol: MarketSymbol) => void;
  updateTicker: (item: Partial<TickerSummaryItem> & { symbol: MarketSymbol }) => void;
  setTickers: (list: TickerSummaryItem[]) => void;
  setLiveConnected: (connected: boolean) => void;
}

const INITIAL_TICKERS: Record<MarketSymbol, TickerSummaryItem> = {
  DXY: {
    symbol: 'DXY',
    name: 'US Dollar Index',
    current_price: 104.45,
    change_point: 0.33,
    change_percentage: 0.32,
    direction: 'UP',
    session_low: 103.98,
    session_high: 104.62,
    sensitivity_tag: '+0.84 High Beta',
  },
  USOIL: {
    symbol: 'USOIL',
    name: 'WTI Crude Oil',
    current_price: 77.10,
    change_point: 1.45,
    change_percentage: 1.91,
    direction: 'UP',
    session_low: 75.80,
    session_high: 77.50,
    sensitivity_tag: 'Headline Inflation Driver',
  },
  XAUUSD: {
    symbol: 'XAUUSD',
    name: 'Gold (Ounce)',
    current_price: 2684.20,
    change_point: -12.40,
    change_percentage: -0.46,
    direction: 'DOWN',
    session_low: 2678.00,
    session_high: 2699.50,
    sensitivity_tag: 'Negative Dollar Correlation',
  },
  USDIDR: {
    symbol: 'USDIDR',
    name: 'USD to Rupiah',
    current_price: 15850.00,
    change_point: 45.00,
    change_percentage: 0.28,
    direction: 'UP',
    session_low: 15800.00,
    session_high: 15890.00,
    sensitivity_tag: 'Emerging Market Beta',
  },
};

export const useMarketStore = create<MarketState>((set) => ({
  activeSymbol: 'DXY',
  tickers: INITIAL_TICKERS,
  isLiveConnected: true,

  setActiveSymbol: (symbol) => set({ activeSymbol: symbol }),

  updateTicker: (item) =>
    set((state) => ({
      tickers: {
        ...state.tickers,
        [item.symbol]: {
          ...state.tickers[item.symbol],
          ...item,
        },
      },
    })),

  setTickers: (list) =>
    set((state) => {
      const next = { ...state.tickers };
      list.forEach((t) => {
        next[t.symbol] = { ...next[t.symbol], ...t };
      });
      return { tickers: next };
    }),

  setLiveConnected: (connected) => set({ isLiveConnected: connected }),
}));

