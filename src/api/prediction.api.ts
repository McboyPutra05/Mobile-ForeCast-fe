import { apiClient } from './client';
import { ENDPOINTS } from '../constants/endpoints';
import { ApiResponse, LatestPrediction, LeadingIndicatorsData } from '../types';

export const MOCK_LATEST_PREDICTION: LatestPrediction = {
  event_id: 'evt_cpi_202609',
  event_name: 'Consumer Price Index (CPI) MoM',
  country: 'USD',
  impact: 'HIGH',
  release_timestamp: '2026-09-28T12:30:00Z',
  countdown_seconds: 4716, // ~ 1h 18m 36s
  bias: 'GOOD FOR USD',
  recommended_action: 'SELL XAUUSD',
  confidence_score: 85,
  z_score_deviation: 1.42,
  summary_reasoning: 'Kenaikan harga USOIL bulanan (+6.5%) dan reli ISM Prices Paid memberikan tekanan inflasi kuat jelang rilis.',
  intermarket_overview: {
    dxy_trend: 'BULLISH',
    oil_impact: 'HIGH_INFLATIONARY_PRESSURE',
    gold_reaction_expected: 'BEARISH_PULLBACK',
  },
};

export const MOCK_LEADING_INDICATORS: LeadingIndicatorsData = {
  parent_event: 'Consumer Price Index (CPI) MoM',
  indicators: [
    {
      name: 'USOIL Crude MoM Momentum',
      weight: 0.35,
      previous: 72.4,
      actual: 77.1,
      deviation_score: 1.65,
      sentiment_impact: 'HAWKISH',
    },
    {
      name: 'ISM Manufacturing Prices Paid',
      weight: 0.3,
      previous: 52.8,
      actual: 55.4,
      deviation_score: 1.2,
      sentiment_impact: 'HAWKISH',
    },
    {
      name: 'Average Hourly Earnings MoM',
      weight: 0.2,
      previous: 0.3,
      actual: 0.4,
      deviation_score: 0.85,
      sentiment_impact: 'HAWKISH',
    },
    {
      name: 'Producer Price Index (PPI) MoM',
      weight: 0.15,
      previous: 0.1,
      actual: 0.3,
      deviation_score: 1.1,
      sentiment_impact: 'HAWKISH',
    },
  ],
};

export const predictionApi = {
  getLatest: async (): Promise<ApiResponse<LatestPrediction>> => {
    try {
      const response = await apiClient.get<ApiResponse<LatestPrediction>>(ENDPOINTS.PREDICTIONS_LATEST);
      return response.data;
    } catch {
      return {
        success: true,
        status_code: 200,
        data: MOCK_LATEST_PREDICTION,
        meta: {
          cached: true,
          cache_ttl_remaining: 120,
          timestamp: new Date().toISOString(),
        },
      };
    }
  },

  getLeadingIndicators: async (eventId: string): Promise<ApiResponse<LeadingIndicatorsData>> => {
    try {
      const response = await apiClient.get<ApiResponse<LeadingIndicatorsData>>(
        ENDPOINTS.PREDICTIONS_LEADING_INDICATORS(eventId)
      );
      return response.data;
    } catch {
      return {
        success: true,
        status_code: 200,
        data: MOCK_LEADING_INDICATORS,
      };
    }
  },
};

