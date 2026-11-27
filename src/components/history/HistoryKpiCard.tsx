import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { AccuracyBreakdown, AccuracyKPI } from '../../types';

interface HistoryKpiCardProps {
  summaryKpi: AccuracyKPI;
  breakdownByEvent: AccuracyBreakdown[];
}

export const HistoryKpiCard: React.FC<HistoryKpiCardProps> = ({
  summaryKpi,
  breakdownByEvent,
}) => {
  const colors = useThemeColors();

  return (
    <View style={styles.wrapper}>
      <View style={styles.kpiGrid}>
        <View
          style={[
            styles.kpiBlock,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.borderSubtle,
            },
          ]}
        >
          <Text style={[styles.kpiLabel, { color: colors.textMuted }]}>EVALUATED EVENTS</Text>
          <Text style={[styles.kpiTotal, { color: colors.textPrimary }]}>
            {summaryKpi.total_events_analyzed}
          </Text>
          <Text style={[styles.kpiSub, { color: colors.textSecondary }]}>
            <Text style={{ color: colors.sentimentBullish, fontWeight: '700' }}>
              {summaryKpi.accurate_hits} Hits
            </Text>{' '}
            / {summaryKpi.misses} Misses
          </Text>
        </View>

        <View
          style={[
            styles.kpiBlock,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.borderSubtle,
            },
          ]}
        >
          <Text style={[styles.kpiLabel, { color: colors.textMuted }]}>OVERALL WIN RATE</Text>
          <Text style={[styles.kpiWinRate, { color: colors.sentimentBullish }]}>
            {summaryKpi.win_rate_percentage.toFixed(1)}%
          </Text>
          <Text style={[styles.kpiSub, { color: colors.textSecondary }]}>
            15m DXY post-release audit
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.breakdownRow,
          {
            borderTopColor: colors.borderSubtle,
            borderBottomColor: colors.borderSubtle,
          },
        ]}
      >
        {breakdownByEvent.slice(0, 3).map((item, idx) => (
          <View key={`${item.event}-${idx}`} style={styles.breakdownItem}>
            <Text style={[styles.breakdownName, { color: colors.textSecondary }]} numberOfLines={1}>
              {item.event}
            </Text>
            <Text style={[styles.breakdownRate, { color: colors.sentimentBullish }]}>
              {item.win_rate}% ({item.total})
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  kpiBlock: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    padding: 14,
    gap: 3,
  },
  kpiLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  kpiWinRate: {
    fontFamily: FONTS.serif,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    marginTop: 2,
    ...TABULAR_NUMS,
  },
  kpiTotal: {
    fontFamily: FONTS.mono,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    marginTop: 2,
    ...TABULAR_NUMS,
  },
  kpiSub: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    marginTop: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
    gap: 8,
  },
  breakdownItem: {
    flex: 1,
    gap: 2,
  },
  breakdownName: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '500',
  },
  breakdownRate: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: '700',
    ...TABULAR_NUMS,
  },
});
