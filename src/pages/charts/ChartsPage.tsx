import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { Layers, ExternalLink } from 'lucide-react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { TopAppBar } from '../../components/common/TopAppBar';
import { BottomSheetWrapper } from '../../components/common/BottomSheetWrapper';
import {
  WatchlistSelectorStrip,
  ActiveInstrumentCard,
  TradingViewWebView,
  MacroDivergenceMatrix,
} from '../../components/charts';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { MarketSymbol, Timeframe } from '../../types';
import { useMarketStore } from '../../store/useMarketStore';
import { MOCK_CANDLES } from '../../api/chart.api';

const WATCHLIST_SYMBOLS: MarketSymbol[] = ['DXY', 'USOIL', 'XAUUSD', 'USDIDR'];
const TIMEFRAMES: Timeframe[] = ['15m', '1h', '4h', '1d'];

export const ChartsPage = ({ navigation }: any) => {
  const activeSymbol = useMarketStore((s) => s.activeSymbol);
  const setActiveSymbol = useMarketStore((s) => s.setActiveSymbol);
  const tickers = useMarketStore((s) => s.tickers);

  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('1h');
  const [isTvInterstitialOpen, setIsTvInterstitialOpen] = useState(false);
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
      <TopAppBar
        title="Intermarket Charts"
        onNotificationPress={() => navigation.navigate('Notification')}
        onProfilePress={() => navigation.navigate('Settings')}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Modular Feature 1: Horizontal Watchlist Selector Strip */}
        <WatchlistSelectorStrip
          symbols={WATCHLIST_SYMBOLS}
          activeSymbol={activeSymbol}
          tickers={tickers}
          onSelectSymbol={setActiveSymbol}
        />

        {/* Modular Feature 2: Active Instrument Card */}
        <ActiveInstrumentCard ticker={currentTicker} />

        {/* Modular Feature 3: Candlestick Chart Engine with Timeframe Bar */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <View style={styles.ohlcRow}>
              <Text style={styles.ohlcValActive}>O: 104.12</Text>
              <Text style={styles.ohlcVal}>H: 104.62</Text>
              <Text style={styles.ohlcVal}>L: 103.98</Text>
              <Text style={styles.ohlcValActive}>C: 104.45</Text>
            </View>
            <View style={styles.indicatorCount}>
              <Layers size={13} color={COLORS.textSecondary} />
              <Text style={styles.indicatorCountText}>Indicators (3)</Text>
            </View>
          </View>

          <TradingViewWebView
            symbol={activeSymbol}
            candles={MOCK_CANDLES}
            height={250}
            onOpenTradingViewApp={() => setIsTvInterstitialOpen(true)}
          />

          <View style={styles.timeframeBar}>
            <View style={styles.timeframeGroup}>
              {TIMEFRAMES.map((tf) => (
                <Pressable
                  key={tf}
                  style={[styles.tfButton, activeTimeframe === tf && styles.tfButtonActive]}
                  onPress={() => setActiveTimeframe(tf)}
                >
                  <Text
                    style={[
                      styles.tfButtonText,
                      activeTimeframe === tf && styles.tfButtonTextActive,
                    ]}
                  >
                    {tf}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Modular Feature 4: Macro Divergence Matrix */}
        <MacroDivergenceMatrix symbols={WATCHLIST_SYMBOLS} tickers={tickers} />
      </ScrollView>

      {/* Safety Interstitial Modal: TradingView External Launch (Section 4.B.2) */}
      <BottomSheetWrapper
        visible={isTvInterstitialOpen}
        onClose={() => setIsTvInterstitialOpen(false)}
        title="Buka di TradingView?"
        subtitle={`Instrumen: ${activeSymbol} (${currentTicker?.name || 'Live Market'})`}
      >
        <View style={styles.sheetBody}>
          <Text style={styles.sheetMessage}>
            Anda akan dialihkan ke aplikasi eksternal TradingView untuk inspeksi indikator kustom dan analisis multi-timeframe penuh.
          </Text>

          <View style={styles.sheetActions}>
            <Pressable
              style={({ pressed }) => [styles.actionButtonPrimary, pressed && { opacity: 0.85 }]}
              onPress={handleLaunchTradingView}
              accessibilityRole="button"
              accessibilityLabel="Buka TradingView App"
            >
              <ExternalLink size={16} color={COLORS.textInverse} />
              <Text style={styles.actionButtonPrimaryText}>Buka TradingView App</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.actionButtonSecondary, pressed && { opacity: 0.7 }]}
              onPress={() => setIsTvInterstitialOpen(false)}
              accessibilityRole="button"
              accessibilityLabel="Tetap di ForeCastFX"
            >
              <Text style={styles.actionButtonSecondaryText}>Tetap di ForeCastFX</Text>
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
    backgroundColor: COLORS.bgApp,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  chartContainer: {
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 16,
    overflow: 'hidden',
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.surfaceElevated,
  },
  ohlcRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ohlcVal: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  ohlcValActive: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.sentimentBullish,
  },
  indicatorCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  indicatorCountText: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  timeframeBar: {
    padding: 8,
    backgroundColor: COLORS.surfaceCard,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
  },
  timeframeGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  tfButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 36,
    borderRadius: 6,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: 'center',
  },
  tfButtonActive: {
    backgroundColor: COLORS.sentimentBullishSubtle,
    borderWidth: 1,
    borderColor: COLORS.sentimentBullishBorder,
  },
  tfButtonText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tfButtonTextActive: {
    color: COLORS.sentimentBullish,
  },
  sheetBody: {
    paddingVertical: 8,
    gap: 16,
  },
  sheetMessage: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.textSecondary,
  },
  sheetActions: {
    gap: 10,
    marginTop: 8,
  },
  actionButtonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.sentimentBullish,
    borderRadius: 12,
    paddingVertical: 14,
    minHeight: 48,
  },
  actionButtonPrimaryText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  actionButtonSecondary: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 12,
    minHeight: 44,
  },
  actionButtonSecondaryText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});


