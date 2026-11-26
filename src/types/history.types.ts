import { BiasDirection, PredictionStatus } from './common.types';

export interface AccuracyKPI {
  total_events_analyzed: number;
  accurate_hits: number;
  misses: number;
  win_rate_percentage: number;
}

export interface AccuracyBreakdown {
  event: string;
  win_rate: number;
  total: number;
}

export interface HistoryLogItem {
  log_id: string;
  event_name: string;
  release_date: string;
  predicted_bias: BiasDirection;
  actual_market_outcome: string;
  status: PredictionStatus;
  reasoning_recap: string;
}

export interface HistoryAccuracyResponse {
  summary_kpi: AccuracyKPI;
  breakdown_by_event: AccuracyBreakdown[];
  logs: HistoryLogItem[];
}

