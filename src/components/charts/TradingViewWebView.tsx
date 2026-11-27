import React, { useRef, useEffect, useMemo } from 'react';
import { View, StyleSheet, Linking, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import { ExternalLink } from 'lucide-react-native';
import { useThemeColors } from '../../store/useUIStore';
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
  height = 250,
  onOpenTradingViewApp,
}) => {
  const webViewRef = useRef<WebView | null>(null);
  const colors = useThemeColors();

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
      // Ignore malformed WebView bridge payloads
    }
  };

  const openTradingViewApp = async (sym: string) => {
    if (onOpenTradingViewApp) {
      onOpenTradingViewApp();
      return;
    }

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

  const htmlContent = useMemo(() => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body, html { width: 100%; height: 100%; background-color: ${colors.bgApp}; overflow: hidden; }
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
              background: { color: '${colors.bgApp}' },
              textColor: '${colors.textSecondary}',
              fontFamily: 'JetBrainsMono, monospace',
              fontSize: 10,
            },
            grid: {
              vertLines: { color: '${colors.borderSubtle}', style: 1 },
              horzLines: { color: '${colors.borderSubtle}', style: 1 },
            },
            crosshair: {
              mode: LightweightCharts.CrosshairMode.Normal,
              vertLine: { color: '${colors.borderActive}', width: 1, style: 2 },
              horzLine: { color: '${colors.borderActive}', width: 1, style: 2 },
            },
            rightPriceScale: {
              borderColor: '${colors.borderSubtle}',
              scaleMargins: { top: 0.12, bottom: 0.12 },
            },
            timeScale: {
              borderColor: '${colors.borderSubtle}',
              timeVisible: true,
              secondsVisible: false,
            },
          });

          const candleSeries = chart.addCandlestickSeries({
            upColor: '${colors.sentimentBullish}',
            downColor: '${colors.sentimentBearish}',
            borderVisible: false,
            wickUpColor: '${colors.sentimentBullish}',
            wickDownColor: '${colors.sentimentBearish}',
          });

          const initialData = ${JSON.stringify(candles)};
          if (initialData && initialData.length > 0) {
            candleSeries.setData(initialData);
            chart.timeScale().fitContent();
          }

          window.updateCandleData = function(data) {
            if (data && data.length > 0) {
              candleSeries.setData(data);
              chart.timeScale().fitContent();
            }
          };

          window.addEventListener('resize', () => {
            chart.applyOptions({ width: container.clientWidth, height: container.clientHeight });
          });
        </script>
      </body>
    </html>
  `;
  }, [colors, candles]);

  return (
    <View
      style={[
        styles.wrapper,
        {
          height,
          backgroundColor: colors.bgApp,
          borderColor: colors.borderSubtle,
        },
      ]}
    >
      <WebView
        key={`${colors.mode}-${symbol}`}
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={[styles.webView, { backgroundColor: colors.bgApp }]}
        scrollEnabled={false}
        bounces={false}
        onMessage={handleMessage}
        javaScriptEnabled
        domStorageEnabled
        androidLayerType="hardware"
      />

      <Pressable
        style={({ pressed }) => [
          styles.tvSquareButton,
          {
            backgroundColor: colors.surfaceCard,
            borderColor: colors.borderActive,
          },
          pressed && { opacity: 0.8 },
        ]}
        onPress={() => {
          if (onOpenTradingViewApp) {
            onOpenTradingViewApp();
          } else {
            openTradingViewApp(symbol);
          }
        }}
        accessibilityRole="button"
        accessibilityLabel={`Open ${symbol} full chart in TradingView`}
      >
        <ExternalLink size={18} color={colors.textPrimary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  webView: {
    flex: 1,
  },
  tvSquareButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 44,
    height: 44,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
