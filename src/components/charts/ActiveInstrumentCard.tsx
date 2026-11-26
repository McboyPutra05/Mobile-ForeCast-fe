import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { TickerSummaryItem } from '../../types';
import { formatPrice } from '../../utils/currency';

interface ActiveInstrumentCardProps {
  ticker: TickerSummaryItem;
}

export const ActiveInstrumentCard: React.FC<ActiveInstrumentCardProps> = ({ ticker }) => {
  const isUp = ticker.direction === 'UP';

  return (
    <View style={styles.overviewCard}>
      <View style={styles.overviewHeader}>
        <Text style={styles.overviewTitle}>
          {ticker.symbol} — {ticker.name}
        </Text>
        <View style={styles.feedBadge}>
          <View style={styles.feedPulseDot} />
          <Text style={styles.feedText}>Real-Time Feed</Text>
        </View>
      </View>

      <View style={styles.priceRow}>
        <View style={styles.priceLeft}>
          <Text style={styles.priceValue}>{formatPrice(ticker.current_price, ticker.symbol)}</Text>
          <View
            style={[
              styles.deltaPill,
              {
                backgroundColor: isUp ? COLORS.sentimentBullishSubtle : COLORS.sentimentBearishSubtle,
                borderColor: isUp ? COLORS.sentimentBullishBorder : COLORS.sentimentBearishBorder,
              },
            ]}
          >
            {isUp ? (
              <TrendingUp size={14} color={COLORS.sentimentBullish} />
            ) : (
              <TrendingDown size={14} color={COLORS.sentimentBearish} />
            )}
            <Text
              style={[
                styles.deltaText,
                { color: isUp ? COLORS.sentimentBullish : COLORS.sentimentBearish },
              ]}
            >
              {isUp ? '+' : ''}
              {ticker.change_point.toFixed(2)} ({isUp ? '+' : ''}
              {ticker.change_percentage.toFixed(2)}%)
            </Text>
          </View>
        </View>

        <View style={styles.sessionRange}>
          <Text style={styles.rangeLabel}>Session Range</Text>
          <Text style={styles.rangeValue}>
            {ticker.session_low} - {ticker.session_high}
          </Text>
        </View>
      </View>

      {/* CPI Sensitivity Tag */}
      <View style={styles.sensitivityBanner}>
        <View style={styles.sensitivityLeft}>
          <Zap size={14} color={COLORS.alertWarning} />
          <Text style={styles.sensitivityLabel}>Macro Sensitivity Driver</Text>
        </View>
        <View style={styles.sensitivityPill}>
          <Text style={styles.sensitivityPillText}>{ticker.sensitivity_tag}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overviewCard: {
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  overviewTitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  feedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },
  feedPulseDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.sentimentBullish,
  },
  feedText: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.sentimentBullish,
    textTransform: 'uppercase',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  priceLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  priceValue: {
    fontFamily: FONTS.mono,
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  deltaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    gap: 4,
  },
  deltaText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
  },
  sessionRange: {
    alignItems: 'flex-end',
  },
  rangeLabel: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  rangeValue: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  sensitivityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceSecondary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sensitivityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sensitivityLabel: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  sensitivityPill: {
    backgroundColor: COLORS.alertWarningSubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sensitivityPillText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.alertWarning,
    textTransform: 'uppercase',
  },
});

