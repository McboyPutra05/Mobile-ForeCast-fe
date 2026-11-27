import { useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { WS_BASE_URL } from '../constants/endpoints';
import { useAuthStore } from '../store/useAuthStore';
import { useMarketStore } from '../store/useMarketStore';
import { useUIStore } from '../store/useUIStore';
import { WebSocketAlertMessage, WebSocketTickerMessage } from '../types';

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  const { accessToken, isAuthenticated } = useAuthStore();
  const { updateTicker, setLiveConnected } = useMarketStore();
  const { showToast } = useUIStore();

  const connect = useCallback(() => {
    if (!isAuthenticated || !accessToken) return;

    // Avoid multiple sockets
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    try {
      const url = `${WS_BASE_URL}?token=${encodeURIComponent(accessToken)}`;
      const socket = new WebSocket(url);
      wsRef.current = socket;

      socket.onopen = () => {
        setLiveConnected(true);
        reconnectAttemptsRef.current = 0;
        // Subscribe to primary tickers
        socket.send(
          JSON.stringify({
            action: 'SUBSCRIBE',
            symbols: ['DXY', 'USOIL', 'XAUUSD', 'USDIDR'],
          })
        );
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'TICKER_UPDATE') {
            const tickerMsg = data as WebSocketTickerMessage;
            updateTicker({
              symbol: tickerMsg.symbol,
              current_price: tickerMsg.price,
              change_point: tickerMsg.change_point,
              change_percentage: tickerMsg.change_percentage,
              direction: tickerMsg.change_point >= 0 ? 'UP' : 'DOWN',
            });
          } else if (data.type === 'EVENT_RELEASE_ALERT') {
            const alertMsg = data as WebSocketAlertMessage;
            showToast({
              type: 'warning',
              title: `Rilis Data: ${alertMsg.event_name}`,
              message: `Aktual: ${alertMsg.actual_value} (Konsensus: ${alertMsg.forecast_value}) | Bias: ${alertMsg.instant_bias}`,
              duration: 7000,
            });
          }
        } catch {
          // invalid json payload
        }
      };

      socket.onerror = () => {
        setLiveConnected(false);
      };

      socket.onclose = () => {
        setLiveConnected(false);
        wsRef.current = null;

        // Exponential backoff reconnect if app is in active state
        if (appStateRef.current === 'active') {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
          reconnectAttemptsRef.current += 1;
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        }
      };
    } catch {
      setLiveConnected(false);
    }
  }, [isAuthenticated, accessToken, updateTicker, setLiveConnected, showToast]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setLiveConnected(false);
  }, [setLiveConnected]);

  // AppState lifecycle handling (disconnect in background to save battery/cellular data)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        connect();
      } else if (nextAppState.match(/inactive|background/)) {
        disconnect();
      }
      appStateRef.current = nextAppState;
    });

    connect();

    return () => {
      subscription.remove();
      disconnect();
    };
  }, [connect, disconnect]);

  return { isConnected: wsRef.current?.readyState === WebSocket.OPEN };
}

