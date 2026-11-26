import { BiasDirection, ImpactLevel } from './common.types';

export interface IntermarketOverview {
  dxy_trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  oil_impact: string;
  gold_reaction_expected: string;
}

export interface LatestPrediction {
  event_id: string;
  event_name: string;
  country: string;
  impact: ImpactLevel;
  release_timestamp: string;
  countdown_seconds: number;
  bias: BiasDirection;
  recommended_action: string;
  confidence_score: number;
  z_score_deviation: number;
  summary_reasoning: string;
  intermarket_overview: IntermarketOverview;
}

export interface LeadingIndicatorItem {
  name: string;
  weight: number;
  previous: number;
  actual: number;
  deviation_score: number;
  sentiment_impact: 'HAWKISH' | 'DOVISH' | 'NEUTRAL';
}

export interface LeadingIndicatorsData {
  parent_event: string;
  indicators: LeadingIndicatorItem[];
}

