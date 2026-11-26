import { apiClient } from './client';
import { ENDPOINTS } from '../constants/endpoints';
import { ApiResponse, CalendarEvent, CalendarFilterParams } from '../types';

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'evt_cpi_202609',
    event_name: 'Consumer Price Index (CPI) MoM',
    country: 'USD',
    release_time: '2026-09-28T12:30:00Z',
    impact: 'HIGH',
    previous: '0.2%',
    forecast: '0.3%',
    actual: null,
    has_prediction: true,
    predicted_bias: 'GOOD FOR USD',
  },
  {
    id: 'evt_core_cpi_202609',
    event_name: 'Core CPI YoY',
    country: 'USD',
    release_time: '2026-09-28T12:30:00Z',
    impact: 'HIGH',
    previous: '3.2%',
    forecast: '3.2%',
    actual: null,
    has_prediction: true,
    predicted_bias: 'GOOD FOR USD',
  },
  {
    id: 'evt_unemp_claims',
    event_name: 'Initial Jobless Claims',
    country: 'USD',
    release_time: '2026-09-29T12:30:00Z',
    impact: 'MEDIUM',
    previous: '219K',
    forecast: '224K',
    actual: null,
    has_prediction: false,
  },
  {
    id: 'evt_nfp_202610',
    event_name: 'Non-Farm Payrolls (NFP)',
    country: 'USD',
    release_time: '2026-10-02T12:30:00Z',
    impact: 'HIGH',
    previous: '142K',
    forecast: '150K',
    actual: null,
    has_prediction: true,
    predicted_bias: 'GOOD FOR USD',
  },
  {
    id: 'evt_fomc_rate',
    event_name: 'Fed Interest Rate Decision',
    country: 'USD',
    release_time: '2026-10-15T18:00:00Z',
    impact: 'HIGH',
    previous: '5.25%',
    forecast: '5.00%',
    actual: null,
    has_prediction: true,
    predicted_bias: 'BAD FOR USD',
  },
];

export const calendarApi = {
  getEvents: async (params?: CalendarFilterParams): Promise<ApiResponse<CalendarEvent[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<CalendarEvent[]>>(ENDPOINTS.CALENDAR, { params });
      return response.data;
    } catch {
      return {
        success: true,
        status_code: 200,
        data: MOCK_CALENDAR_EVENTS,
        meta: {
          total_items: MOCK_CALENDAR_EVENTS.length,
          timestamp: new Date().toISOString(),
        },
      };
    }
  },
};

