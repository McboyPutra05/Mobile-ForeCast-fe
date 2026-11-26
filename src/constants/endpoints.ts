/**
 * ForeCastFX Mobile — API Endpoints Contract
 * Sesuai API-Contract.md
 */

export const BASE_URL = 'http://localhost:8000/api/v1';
export const WS_BASE_URL = 'ws://localhost:8000/api/v1/ws/market';

export const ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_REFRESH: '/auth/refresh',
  AUTH_ME: '/auth/me',

  // Predictions (Tab 1 Dashboard)
  PREDICTIONS_LATEST: '/predictions/latest',
  PREDICTIONS_LEADING_INDICATORS: (eventId: string) => `/predictions/${eventId}/leading-indicators`,

  // Charts (Tab 2)
  CHARTS_OHLC: '/charts/ohlc',
  CHARTS_TICKER_SUMMARY: '/charts/ticker-summary',

  // Calendar (Tab 3)
  CALENDAR: '/calendar',

  // News (Tab 4)
  NEWS: '/news',
  ARTICLE_DETAIL: (id: string) => `/news/${id}`,

  // History & Accuracy (Tab 5)
  HISTORY_ACCURACY: '/history/accuracy',

  // Chatbot
  CHATBOT_QUERY: '/chatbot/query',
} as const;

