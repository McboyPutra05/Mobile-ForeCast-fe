import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Linking, Pressable, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { ExternalLink } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { CandleData, MarketSymbol } from '../../types';

interface TradingViewWebViewProps {
  symbol: MarketSymbol;
  candles: CandleData[];
  height?: number;
  onOpenTradingViewApp?: () => void;
}

export const TradingViewWebView: React.FC<TradingViewWebViewProps> = ({
  symbol,
  candles,
  height = 240,
  onOpenTradingViewApp,
}) => {
  const webViewRef = useRef<WebView | null>(null);

  // Sync candle updates to WebView via injectJavaScript
  useEffect(() => {
    if (candles && candles.length > 0 && webViewRef.current) {
      const script = `
        if (window.updateCandleData) {
          window.updateCandleData(${JSON.stringify(candles)});
        }
        true;
      `;
      webViewRef.current.injectJavaScript(script);
    }
  }, [candles]);

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.action === 'OPEN_TRADINGVIEW') {
        openTradingViewApp(data.symbol || symbol);
      }
    } catch {
      // ignore
    }
  };

  const openTradingViewApp = async (sym: string) => {
    if (onOpenTradingViewApp) {
      onOpenTradingViewApp();
      return;
    }

    // Mapping symbol to TradingView ticker query
    let tvSymbol = sym;
    if (sym === 'DXY') tvSymbol = 'INDEX:DXY';
    if (sym === 'USOIL') tvSymbol = 'TVC:USOIL';
    if (sym === 'XAUUSD') tvSymbol = 'OANDA:XAUUSD';
    if (sym === 'USDIDR') tvSymbol = 'FX_IDC:USDIDR';

    const deepLinkUrl = `tradingview://chart?symbol=${encodeURIComponent(tvSymbol)}`;
    const webFallbackUrl = `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(tvSymbol)}`;

    try {
      const supported = await Linking.canOpenURL(deepLinkUrl);
      if (supported) {
        await Linking.openURL(deepLinkUrl);
      } else {
        await Linking.openURL(webFallbackUrl);
      }
    } catch {
      await Linking.openURL(webFallbackUrl);
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body, html { width: 100%; height: 100%; background-color: #151A23; overflow: hidden; }
          #chart-container { width: 100%; height: 100%; }
        </style>
        <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
      </head>
      <body>
        <div id="chart-container"></div>
        <script>
          const container = document.getElementById('chart-container');
          const chart = LightweightCharts.createChart(container, {
            layout: {
              background: { color: '#151A23' },
              textColor: '#9CA3AF',
              fontFamily: 'JetBrainsMono, monospace',
              fontSize: 10,
            },
            grid: {
              vertLines: { color: '#1F2937', style: 1 },
              horzLines: { color: '#1F2937', style: 1 },
            },
            crosshair: {
              mode: LightweightCharts.CrosshairMode.Normal,
              vertLine: { color: '#4B5563', width: 1, style: 2 },
              horzLine: { color: '#4B5563', width: 1, style: 2 },
            },
            rightPriceScale: {
              borderColor: '#1F2937',
              scaleMargins: { top: 0.1, bottom: 0.1 },
            },
            timeScale: {
              borderColor: '#1F2937',
              timeVisible: true,
              secondsVisible: false,
            },
          });

          const candleSeries = chart.addCandlestickSeries({
            upColor: '#10B981',
            downColor: '#EF4444',
            borderVisible: false,
            wickUpColor: '#10B981',
            wickDownColor: '#EF4444',
          });

          const initialData = ${JSON.stringify(candles)};
          if (initialData && initialData.length > 0) {
            candleSeries.setData(initialData);
          }

          window.updateCandleData = function(data) {
            if (data && data.length > 0) {
              candleSeries.setData(data);
            }
          };

          window.addEventListener('resize', () => {
            chart.applyOptions({ width: container.clientWidth, height: container.clientHeight });
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={[styles.wrapper, { height }]}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webView}
        scrollEnabled={false}
        bounces={false}
        onMessage={handleMessage}
        javaScriptEnabled
        domStorageEnabled
        androidLayerType="hardware"
      />

      {/* TradingView Nav Button (Square Launch Button per Section 6.B.4 & 4.B.2) */}
      <Pressable
        style={({ pressed }) => [styles.tvSquareButton, pressed && styles.tvSquareButtonPressed]}
        onPress={() => {
          if (onOpenTradingViewApp) {
            onOpenTradingViewApp();
          } else {
            openTradingViewApp(symbol);
          }
        }}
        accessibilityRole="button"
        accessibilityLabel="Launch in TradingView"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <ExternalLink size={18} color={COLORS.sentimentBullish} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: COLORS.surfaceCard,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },
  webView: {
    flex: 1,
    backgroundColor: COLORS.surfaceCard,
  },
  tvSquareButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.borderHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 4,
  },
  tvSquareButtonPressed: {
    opacity: 0.8,
    backgroundColor: COLORS.surfaceSecondary,
  },
});

