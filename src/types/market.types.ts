import { MarketSymbol, Timeframe } from './common.types';

export interface CandleData {
  time: number; // Unix timestamp in seconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface OHLCResponse {
  symbol: MarketSymbol;
  timeframe: Timeframe;
  candles: CandleData[];
}

export interface TickerSummaryItem {
  symbol: MarketSymbol;
  name?: string;
  current_price: number;
  change_point: number;
  change_percentage: number;
  direction: 'UP' | 'DOWN' | 'FLAT';
  session_low?: number;
  session_high?: number;
  sensitivity_tag?: string;
}

export interface WebSocketTickerMessage {
  type: 'TICKER_UPDATE';
  symbol: MarketSymbol;
  price: number;
  change_point: number;
  change_percentage: number;
  timestamp: number;
}

export interface WebSocketAlertMessage {
  type: 'EVENT_RELEASE_ALERT';
  event_id: string;
  event_name: string;
  actual_value: string;
  forecast_value: string;
  instant_bias: string;
  timestamp: number;
}

