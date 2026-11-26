import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Award } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { AccuracyBreakdown, AccuracyKPI } from '../../types';

interface HistoryKpiCardProps {
  summaryKpi: AccuracyKPI;
  breakdownByEvent: AccuracyBreakdown[];
}

export const HistoryKpiCard: React.FC<HistoryKpiCardProps> = ({
  summaryKpi,
  breakdownByEvent,
}) => {
  return (
    <View style={styles.kpiCard}>
      <View style={styles.kpiHeader}>
        <View style={styles.kpiTitleRow}>
          <Award size={18} color={COLORS.sentimentBullish} />
          <Text style={styles.kpiTitle}>Historical Model Performance</Text>
        </View>
        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedText}>Independent Audit</Text>
        </View>
      </View>

      <View style={styles.kpiGrid}>
        <View style={styles.kpiCol}>
          <Text style={styles.kpiLabel}>OVERALL WIN RATE</Text>
          <Text style={styles.kpiWinRate}>{summaryKpi.win_rate_percentage}%</Text>
          <Text style={styles.kpiSub}>Based on 15m DXY post-release</Text>
        </View>

        <View style={styles.kpiCol}>
          <Text style={styles.kpiLabel}>EVALUATED EVENTS</Text>
          <Text style={styles.kpiTotal}>{summaryKpi.total_events_analyzed}</Text>
          <Text style={styles.kpiSub}>
            <Text style={{ color: COLORS.sentimentBullish, fontWeight: '700' }}>
              {summaryKpi.accurate_hits} Hits
            </Text>{' '}
            / {summaryKpi.misses} Miss
          </Text>
        </View>
      </View>

      {/* Breakdown Per Event Type Pills */}
      <View style={styles.breakdownRow}>
        {breakdownByEvent.slice(0, 3).map((item, idx) => (
          <View key={idx} style={styles.breakdownItem}>
            <Text style={styles.breakdownName}>{item.event}</Text>
            <Text style={styles.breakdownRate}>{item.win_rate}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  kpiCard: {
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kpiTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  kpiTitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  verifiedBadge: {
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  verifiedText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.sentimentBullish,
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  kpiCol: {
    flex: 1,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 12,
    padding: 12,
    gap: 2,
  },
  kpiLabel: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  kpiWinRate: {
    fontFamily: FONTS.sans,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    color: COLORS.sentimentBullish,
    marginTop: 2,
    letterSpacing: -0.5,
  },
  kpiTotal: {
    fontFamily: FONTS.mono,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  kpiSub: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
    paddingTop: 10,
  },
  breakdownItem: {
    flex: 1,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  breakdownName: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  breakdownRate: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.sentimentBullish,
    marginTop: 2,
  },
});

