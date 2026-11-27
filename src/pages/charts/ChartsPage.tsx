import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, ArrowRight } from 'lucide-react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { TopAppBar } from '../../components/common/TopAppBar';
import { BottomSheetWrapper } from '../../components/common/BottomSheetWrapper';
import {
  WatchlistSelectorStrip,
  ActiveInstrumentCard,
  TradingViewWebView,
  MacroDivergenceMatrix,
} from '../../components/charts';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { MarketSymbol, Timeframe } from '../../types';
import { useMarketStore } from '../../store/useMarketStore';
import { useUIStore, useThemeColors } from '../../store/useUIStore';
import { chartApi, MOCK_CANDLES } from '../../api/chart.api';

const WATCHLIST_SYMBOLS: MarketSymbol[] = ['DXY', 'USOIL', 'XAUUSD', 'USDIDR'];
const TIMEFRAMES: Timeframe[] = ['15m', '1h', '4h', '1d'];

export const ChartsPage = () => {
  const colors = useThemeColors();
  const activeSymbol = useMarketStore((s) => s.activeSymbol);
  const setActiveSymbol = useMarketStore((s) => s.setActiveSymbol);
  const tickers = useMarketStore((s) => s.tickers);
  const defaultTimeframe = useUIStore((s) => s.defaultTimeframe);

  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>(defaultTimeframe);
  const [isTvInterstitialOpen, setIsTvInterstitialOpen] = useState(false);

  useEffect(() => {
    setActiveTimeframe(defaultTimeframe);
  }, [defaultTimeframe]);

  const { data: ohlcRes, isLoading: isChartLoading } = useQuery({
    queryKey: ['charts', 'ohlc', activeSymbol, activeTimeframe],
    queryFn: () => chartApi.getOHLC(activeSymbol, activeTimeframe),
    staleTime: 15000,
  });

  const candles = ohlcRes?.data?.candles || MOCK_CANDLES;
  const lastCandle = candles[candles.length - 1] || MOCK_CANDLES[MOCK_CANDLES.length - 1];
  const currentTicker = tickers[activeSymbol];

  const handleLaunchTradingView = async () => {
    setIsTvInterstitialOpen(false);
    let tvSymbol: string = activeSymbol;
    if (activeSymbol === 'DXY') tvSymbol = 'INDEX:DXY';
    if (activeSymbol === 'USOIL') tvSymbol = 'TVC:USOIL';
    if (activeSymbol === 'XAUUSD') tvSymbol = 'OANDA:XAUUSD';
    if (activeSymbol === 'USDIDR') tvSymbol = 'FX_IDC:USDIDR';

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

  return (
    <SafeScreenWrapper edges={['top']}>
      <TopAppBar title="Intermarket Charts" />

      <ScrollView
        style={[styles.container, { backgroundColor: colors.bgApp }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <WatchlistSelectorStrip
          symbols={WATCHLIST_SYMBOLS}
          activeSymbol={activeSymbol}
          tickers={tickers}
          onSelectSymbol={setActiveSymbol}
        />

        <ActiveInstrumentCard ticker={currentTicker} />

        <View
          style={[
            styles.chartContainer,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.borderSubtle,
            },
          ]}
        >
          <View
            style={[
              styles.chartHeader,
              {
                backgroundColor: colors.surfaceCard,
              },
            ]}
          >
            <View style={styles.ohlcRow}>
              <Text style={[styles.ohlcVal, { color: colors.textSecondary }]}>
                O {lastCandle.open.toFixed(2)}
              </Text>
              <Text style={[styles.ohlcVal, { color: colors.textSecondary }]}>
                H {lastCandle.high.toFixed(2)}
              </Text>
              <Text style={[styles.ohlcVal, { color: colors.textSecondary }]}>
                L {lastCandle.low.toFixed(2)}
              </Text>
              <Text style={[styles.ohlcValActive, { color: colors.sentimentBullish }]}>
                C {lastCandle.close.toFixed(2)}
              </Text>
            </View>
            {isChartLoading && <ActivityIndicator size="small" color={colors.accentNavy} />}
          </View>

          <TradingViewWebView
            symbol={activeSymbol}
            candles={candles}
            height={250}
            onOpenTradingViewApp={() => setIsTvInterstitialOpen(true)}
          />

          <View style={styles.timeframeBar}>
            {TIMEFRAMES.map((tf) => {
              const isSelected = activeTimeframe === tf;
              return (
                <Pressable
                  key={tf}
                  style={[
                    styles.tfButton,
                    isSelected
                      ? {
                          backgroundColor: colors.accentNavy,
                          borderColor: colors.accentNavy,
                        }
                      : {
                          backgroundColor: colors.bgApp,
                          borderColor: colors.borderSubtle,
                        },
                  ]}
                  onPress={() => setActiveTimeframe(tf)}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${tf} timeframe`}
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text
                    style={[
                      styles.tfButtonText,
                      { color: isSelected ? colors.textInverse : colors.textSecondary },
                    ]}
                  >
                    {tf.toUpperCase()}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.tvLaunchRow,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.borderSubtle,
            },
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => setIsTvInterstitialOpen(true)}
          accessibilityRole="button"
          accessibilityLabel={`Open full ${activeSymbol} chart in TradingView App`}
        >
          <View style={styles.tvLaunchLeft}>
            <Text style={[styles.tvLaunchTitle, { color: colors.textPrimary }]}>
              Open full chart in TradingView App
            </Text>
            <Text style={[styles.tvLaunchSub, { color: colors.textSecondary }]}>
              Multi-indicator Pine scripts for {activeSymbol}
            </Text>
          </View>
          <ArrowRight size={17} color={colors.textPrimary} />
        </Pressable>

        <MacroDivergenceMatrix symbols={WATCHLIST_SYMBOLS} tickers={tickers} />
      </ScrollView>

      <BottomSheetWrapper
        visible={isTvInterstitialOpen}
        onClose={() => setIsTvInterstitialOpen(false)}
        title="Open in TradingView?"
        subtitle={`Instrument: ${activeSymbol} (${currentTicker?.name || 'Live Market'})`}
      >
        <View style={styles.sheetBody}>
          <Text style={[styles.sheetMessage, { color: colors.textSecondary }]}>
            You will be redirected to the TradingView application or web chart for full indicator inspection and multi-timeframe analysis.
          </Text>

          <View style={styles.sheetActions}>
            <Pressable
              style={({ pressed }) => [
                styles.actionButtonPrimary,
                { backgroundColor: colors.accentNavy },
                pressed && { opacity: 0.88 },
              ]}
              onPress={handleLaunchTradingView}
              accessibilityRole="button"
              accessibilityLabel="Launch TradingView App"
            >
              <ExternalLink size={16} color={colors.textInverse} />
              <Text style={[styles.actionButtonPrimaryText, { color: colors.textInverse }]}>
                Launch TradingView
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.actionButtonSecondary,
                { borderColor: colors.borderSubtle },
                pressed && { opacity: 0.75 },
              ]}
              onPress={() => setIsTvInterstitialOpen(false)}
              accessibilityRole="button"
              accessibilityLabel="Stay in ForeCastFX"
            >
              <Text style={[styles.actionButtonSecondaryText, { color: colors.textSecondary }]}>
                Stay in ForeCastFX
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetWrapper>
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 96,
    gap: 16,
  },
  chartContainer: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  ohlcRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  ohlcVal: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    ...TABULAR_NUMS,
  },
  ohlcValActive: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
    ...TABULAR_NUMS,
  },
  timeframeBar: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  tfButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tfButtonText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  tvLaunchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 54,
    gap: 10,
  },
  tvLaunchLeft: {
    flex: 1,
  },
  tvLaunchTitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '600',
  },
  tvLaunchSub: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    marginTop: 2,
  },
  sheetBody: {
    paddingVertical: 4,
    gap: 16,
  },
  sheetMessage: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 20,
  },
  sheetActions: {
    gap: 10,
  },
  actionButtonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 4,
    minHeight: 48,
  },
  actionButtonPrimaryText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
  },
  actionButtonSecondary: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    minHeight: 44,
  },
  actionButtonSecondaryText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
  },
});
