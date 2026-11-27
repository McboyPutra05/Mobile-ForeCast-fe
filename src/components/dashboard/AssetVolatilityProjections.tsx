import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { useMarketStore } from '../../store/useMarketStore';
import { formatPrice } from '../../utils/currency';

export const AssetVolatilityProjections: React.FC = () => {
  const colors = useThemeColors();
  const tickers = useMarketStore((s) => s.tickers);
  const dxy = tickers.DXY;
  const xau = tickers.XAUUSD;

  const isDxyUp = dxy.direction === 'UP';
  const isXauUp = xau.direction === 'UP';

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionKicker, { color: colors.textMuted }]}>
          INTERMARKET VOLATILITY
        </Text>
        <Text style={[styles.deskTag, { color: colors.textSecondary }]}>LIVE SPOT DESK</Text>
      </View>

      <View style={styles.grid}>
        <View
          style={[
            styles.assetBox,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.borderSubtle,
            },
          ]}
        >
          <View style={styles.assetHeader}>
            <Text style={[styles.assetSymbol, { color: colors.textSecondary }]}>
              DXY (Dollar Index)
            </Text>
            {isDxyUp ? (
              <TrendingUp size={15} color={colors.sentimentBullish} />
            ) : (
              <TrendingDown size={15} color={colors.sentimentBearish} />
            )}
          </View>
          <Text style={[styles.assetPrice, { color: colors.textPrimary }]}>
            {formatPrice(dxy.current_price, 'DXY')}
          </Text>
          <Text
            style={[
              styles.assetDelta,
              { color: isDxyUp ? colors.sentimentBullish : colors.sentimentBearish },
            ]}
          >
            {isDxyUp ? '+' : ''}
            {dxy.change_percentage.toFixed(2)}% Session Delta
          </Text>
        </View>

        <View
          style={[
            styles.assetBox,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.borderSubtle,
            },
          ]}
        >
          <View style={styles.assetHeader}>
            <Text style={[styles.assetSymbol, { color: colors.textSecondary }]}>
              XAU/USD (Gold)
            </Text>
            {isXauUp ? (
              <TrendingUp size={15} color={colors.sentimentBullish} />
            ) : (
              <TrendingDown size={15} color={colors.sentimentBearish} />
            )}
          </View>
          <Text style={[styles.assetPrice, { color: colors.textPrimary }]}>
            {formatPrice(xau.current_price, 'XAUUSD')}
          </Text>
          <Text
            style={[
              styles.assetDelta,
              { color: isXauUp ? colors.sentimentBullish : colors.sentimentBearish },
            ]}
          >
            {isXauUp ? '+' : ''}
            {xau.change_percentage.toFixed(2)}% Session Delta
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionKicker: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.0,
  },
  deskTag: {
    fontFamily: FONTS.mono,
    fontSize: 10,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  assetBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    gap: 4,
  },
  assetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  assetSymbol: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
    flexShrink: 1,
  },
  assetPrice: {
    fontFamily: FONTS.mono,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 2,
    ...TABULAR_NUMS,
  },
  assetDelta: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    ...TABULAR_NUMS,
  },
});
