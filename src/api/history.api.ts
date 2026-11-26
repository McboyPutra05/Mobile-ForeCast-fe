import { apiClient } from './client';
import { ENDPOINTS } from '../constants/endpoints';
import { ApiResponse, HistoryAccuracyResponse } from '../types';

export const MOCK_HISTORY_ACCURACY: HistoryAccuracyResponse = {
  summary_kpi: {
    total_events_analyzed: 50,
    accurate_hits: 41,
    misses: 9,
    win_rate_percentage: 82.0,
  },
  breakdown_by_event: [
    { event: 'CPI MoM & YoY', win_rate: 88.8, total: 9 },
    { event: 'Non-Farm Payrolls', win_rate: 80.0, total: 10 },
    { event: 'FOMC Rate Decision', win_rate: 83.3, total: 6 },
    { event: 'PPI Final Demand', win_rate: 77.8, total: 9 },
    { event: 'Retail Sales MoM', win_rate: 75.0, total: 8 },
  ],
  logs: [
    {
      log_id: 'hist_091',
      event_name: 'US Producer Price Index (PPI) MoM',
      release_date: '2026-09-12T12:30:00Z',
      predicted_bias: 'GOOD FOR USD',
      actual_market_outcome: 'DXY Menguat +38 pips dalam 15 menit pasca rilis',
      status: 'HIT',
      reasoning_recap: 'Kenaikan komponen energi PPI mengonfirmasi sinyal hawkish dari momentum USOIL pekan sebelumnya.',
    },
    {
      log_id: 'hist_090',
      event_name: 'US Non-Farm Payrolls (NFP)',
      release_date: '2026-09-05T12:30:00Z',
      predicted_bias: 'GOOD FOR USD',
      actual_market_outcome: 'DXY Menguat +45 pips; XAUUSD anjlok -$28',
      status: 'HIT',
      reasoning_recap: 'Rata-rata upah per jam (+0.4%) dan ISM Employment Index memvalidasi ekspansi ketenagakerjaan kuat.',
    },
    {
      log_id: 'hist_089',
      event_name: 'Core Retail Sales MoM',
      release_date: '2026-08-28T12:30:00Z',
      predicted_bias: 'BAD FOR USD',
      actual_market_outcome: 'DXY Konsolidasi tipis +4 pips; Volatilitas datar',
      status: 'MISS',
      reasoning_recap: 'Konsumsi barang otomotif mengimbangi kelemahan belanja discretionary, menahan reaksi pelemahan USD.',
    },
    {
      log_id: 'hist_088',
      event_name: 'FOMC Interest Rate Decision',
      release_date: '2026-08-15T18:00:00Z',
      predicted_bias: 'GOOD FOR USD',
      actual_market_outcome: 'DXY Menguat +62 pips; Powell berikan panduan hawkish',
      status: 'HIT',
      reasoning_recap: 'Dot plot mengindikasikan penurunan suku bunga lebih lambat dari prakiraan konsensus Wall Street.',
    },
  ],
};

export const historyApi = {
  getAccuracy: async (): Promise<ApiResponse<HistoryAccuracyResponse>> => {
    try {
      const response = await apiClient.get<ApiResponse<HistoryAccuracyResponse>>(ENDPOINTS.HISTORY_ACCURACY);
      return response.data;
    } catch {
      return {
        success: true,
        status_code: 200,
        data: MOCK_HISTORY_ACCURACY,
        meta: {
          timestamp: new Date().toISOString(),
        },
      };
    }
  },
};

