/**
 * Global API response envelope definition
 */

export interface ApiResponse<T> {
  success: boolean;
  status_code: number;
  data: T;
  meta?: {
    cached?: boolean;
    cache_ttl_remaining?: number;
    timestamp?: string;
    total_items?: number;
    current_page?: number;
    total_pages?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      issue: string;
    }>;
  };
}

export type BiasDirection = 'GOOD FOR USD' | 'BAD FOR USD' | 'NEUTRAL';
export type ImpactLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'ALL';
export type PredictionStatus = 'HIT' | 'MISS' | 'PENDING';
export type MarketSymbol = 'DXY' | 'USOIL' | 'XAUUSD' | 'USDIDR';
export type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';

