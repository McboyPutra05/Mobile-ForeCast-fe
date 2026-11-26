import { apiClient } from './client';
import { ENDPOINTS } from '../constants/endpoints';
import { ApiResponse, MarketSymbol, OHLCResponse, TickerSummaryItem, Timeframe } from '../types';

export const MOCK_TICKERS: TickerSummaryItem[] = [
  {
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
  {
    symbol: 'USOIL',
    name: 'WTI Crude',
    current_price: 77.1,
    change_point: 1.45,
    change_percentage: 1.91,
    direction: 'UP',
    session_low: 75.8,
    session_high: 78.42,
    sensitivity_tag: 'Headline Inflation Driver',
  },
  {
    symbol: 'XAUUSD',
    name: 'Gold (Ounce)',
    current_price: 2684.2,
    change_point: -12.4,
    change_percentage: -0.46,
    direction: 'DOWN',
    session_low: 2678.0,
    session_high: 2699.5,
    sensitivity_tag: 'Negative Dollar Correlation',
  },
  {
    symbol: 'USDIDR',
    name: 'USD to Rupiah',
    current_price: 15850.0,
    change_point: 45.0,
    change_percentage: 0.28,
    direction: 'UP',
    session_low: 15800.0,
    session_high: 15890.0,
    sensitivity_tag: 'Emerging Market Beta',
  },
];

export const MOCK_CANDLES = [
  { time: 1790503200, open: 103.95, high: 104.12, low: 103.88, close: 104.05, volume: 11200 },
  { time: 1790506800, open: 104.05, high: 104.22, low: 103.98, close: 104.18, volume: 13500 },
  { time: 1790510400, open: 104.12, high: 104.35, low: 104.05, close: 104.28, volume: 14200 },
  { time: 1790514000, open: 104.28, high: 104.5, low: 104.2, close: 104.45, volume: 18900 },
  { time: 1790517600, open: 104.45, high: 104.62, low: 104.38, close: 104.58, volume: 22400 },
];

export const chartApi = {
  getOHLC: async (symbol: MarketSymbol, timeframe: Timeframe = '1h'): Promise<ApiResponse<OHLCResponse>> => {
    try {
      const response = await apiClient.get<ApiResponse<OHLCResponse>>(ENDPOINTS.CHARTS_OHLC, {
        params: { symbol, timeframe },
      });
      return response.data;
    } catch {
      return {
        success: true,
        status_code: 200,
        data: {
          symbol,
          timeframe,
          candles: MOCK_CANDLES,
        },
      };
    }
  },

  getTickerSummary: async (): Promise<ApiResponse<TickerSummaryItem[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<TickerSummaryItem[]>>(ENDPOINTS.CHARTS_TICKER_SUMMARY);
      return response.data;
    } catch {
      return {
        success: true,
        status_code: 200,
        data: MOCK_TICKERS,
      };
    }
  },
};

