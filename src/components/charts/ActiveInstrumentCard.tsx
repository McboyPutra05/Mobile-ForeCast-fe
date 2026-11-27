import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { TickerSummaryItem } from '../../types';
import { formatPrice } from '../../utils/currency';

interface ActiveInstrumentCardProps {
  ticker: TickerSummaryItem;
}

export const ActiveInstrumentCard: React.FC<ActiveInstrumentCardProps> = ({ ticker }) => {
  const colors = useThemeColors();
  const isUp = ticker.direction === 'UP';
  const deltaColor = isUp ? colors.sentimentBullish : colors.sentimentBearish;
  const deltaBg = isUp ? colors.sentimentBullishSubtle : colors.sentimentBearishSubtle;
  const deltaBorder = isUp ? colors.sentimentBullishBorder : colors.sentimentBearishBorder;

  return (
    <View
      style={[
        styles.overviewCard,
        {
          backgroundColor: colors.surfaceCard,
          borderColor: colors.borderSubtle,
        },
      ]}
    >
      <View style={styles.overviewHeader}>
        <Text style={[styles.overviewTitle, { color: colors.textPrimary }]} numberOfLines={1}>
          {ticker.symbol}: {ticker.name}
        </Text>
        <Text style={[styles.feedText, { color: colors.textMuted }]}>SPOT REAL-TIME</Text>
      </View>

      <View style={styles.priceRow}>
        <View style={styles.priceLeft}>
          <Text style={[styles.priceValue, { color: colors.textPrimary }]}>
            {formatPrice(ticker.current_price, ticker.symbol)}
          </Text>
          <View
            style={[
              styles.deltaPill,
              {
                backgroundColor: deltaBg,
                borderColor: deltaBorder,
              },
            ]}
          >
            {isUp ? (
              <TrendingUp size={13} color={deltaColor} />
            ) : (
              <TrendingDown size={13} color={deltaColor} />
            )}
            <Text style={[styles.deltaText, { color: deltaColor }]}>
              {isUp ? '+' : ''}
              {ticker.change_point.toFixed(2)} ({isUp ? '+' : ''}
              {ticker.change_percentage.toFixed(2)}%)
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.metaRow, { borderTopColor: colors.borderSubtle }]}>
        <View style={styles.metaItem}>
          <Text style={[styles.metaLabel, { color: colors.textMuted }]}>SESSION RANGE</Text>
          <Text style={[styles.metaVal, { color: colors.textPrimary }]}>
            {ticker.session_low} to {ticker.session_high}
          </Text>
        </View>
        <View style={[styles.metaItem, { alignItems: 'flex-end' }]}>
          <Text style={[styles.metaLabel, { color: colors.textMuted }]}>SENSITIVITY DRIVER</Text>
          <Text style={[styles.metaVal, { color: colors.alertWarning }]}>
            {ticker.sensitivity_tag}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overviewCard: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 14,
    gap: 10,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  overviewTitle: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  feedText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  priceValue: {
    fontFamily: FONTS.mono,
    fontSize: 28,
    fontWeight: '700',
    ...TABULAR_NUMS,
  },
  deltaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    gap: 5,
  },
  deltaText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    ...TABULAR_NUMS,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    gap: 12,
  },
  metaItem: {
    flex: 1,
    gap: 2,
  },
  metaLabel: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  metaVal: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    ...TABULAR_NUMS,
  },
});
