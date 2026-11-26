import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { CalendarEvent } from '../../types';
import { formatWIBTime } from '../../utils/date';

interface CalendarEventRowCardProps {
  item: CalendarEvent;
  onPress?: () => void;
}

export const CalendarEventRowCard: React.FC<CalendarEventRowCardProps> = ({ item, onPress }) => {
  const isGoodForUsd = item.predicted_bias === 'GOOD FOR USD';
  const isHighImpact = item.impact === 'HIGH';
  const isMediumImpact = item.impact === 'MEDIUM';

  return (
    <Pressable
      style={({ pressed }) => [styles.eventRowCard, pressed && { opacity: 0.85 }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${item.event_name}, ${item.country}`}
    >
      {/* Top Meta: Time + Country Badge + Impact Pill + Predicted Bias */}
      <View style={styles.rowTop}>
        <View style={styles.topLeft}>
          <Text style={styles.eventTime}>{formatWIBTime(item.release_time)}</Text>
          <View style={styles.countryBadge}>
            <Text style={styles.countryText}>{item.country}</Text>
          </View>
        </View>

        <View style={styles.topRight}>
          {item.has_prediction && item.predicted_bias && (
            <View
              style={[
                styles.biasPill,
                {
                  backgroundColor: isGoodForUsd
                    ? COLORS.sentimentBullishSubtle
                    : COLORS.sentimentBearishSubtle,
                  borderColor: isGoodForUsd
                    ? COLORS.sentimentBullishBorder
                    : COLORS.sentimentBearishBorder,
                },
              ]}
            >
              <Text
                style={[
                  styles.biasText,
                  { color: isGoodForUsd ? COLORS.sentimentBullish : COLORS.sentimentBearish },
                ]}
              >
                {item.predicted_bias}
              </Text>
            </View>
          )}

          <View
            style={[
              styles.impactPill,
              isHighImpact && styles.impactPillHigh,
              isMediumImpact && styles.impactPillMedium,
              !isHighImpact && !isMediumImpact && styles.impactPillLow,
            ]}
          >
            <Text
              style={[
                styles.impactText,
                isHighImpact && styles.impactTextHigh,
                isMediumImpact && styles.impactTextMedium,
                !isHighImpact && !isMediumImpact && styles.impactTextLow,
              ]}
            >
              {item.impact}
            </Text>
          </View>
        </View>
      </View>

      {/* Event Title */}
      <Text style={styles.eventName} numberOfLines={2}>
        {item.event_name}
      </Text>

      {/* 3-Column Previous | Forecast | Actual Metrics Grid */}
      <View style={styles.metricGrid}>
        <View style={styles.metricColLeft}>
          <Text style={styles.metricLabel}>PREVIOUS</Text>
          <Text style={styles.metricVal}>{item.previous || '-'}</Text>
        </View>
        <View style={styles.metricColCenter}>
          <Text style={styles.metricLabel}>FORECAST</Text>
          <Text style={[styles.metricVal, styles.metricValForecast]}>
            {item.forecast || '-'}
          </Text>
        </View>
        <View style={styles.metricColRight}>
          <Text style={styles.metricLabel}>ACTUAL</Text>
          {item.actual ? (
            <Text style={[styles.metricVal, styles.metricValActual]}>{item.actual}</Text>
          ) : (
            <View style={styles.pendingRow}>
              <View style={styles.pendingDot} />
              <Text style={styles.pendingText}>Pending</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  eventRowCard: {
    backgroundColor: '#151A23',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventTime: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: -0.2,
  },
  countryBadge: {
    backgroundColor: '#232A34',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  countryText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  biasPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
  },
  biasText: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  impactPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
  },
  impactPillHigh: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.35)',
  },
  impactPillMedium: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  impactPillLow: {
    backgroundColor: '#232A34',
    borderColor: 'transparent',
  },
  impactText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  impactTextHigh: {
    color: '#EF4444',
  },
  impactTextMedium: {
    color: '#F59E0B',
  },
  impactTextLow: {
    color: COLORS.textSecondary,
  },
  eventName: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    lineHeight: 19,
  },
  metricGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.07)',
    paddingTop: 8,
    marginTop: 2,
  },
  metricColLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  metricColCenter: {
    flex: 1,
    alignItems: 'center',
  },
  metricColRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  metricLabel: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '500',
    color: COLORS.textMuted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  metricVal: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  metricValForecast: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  metricValActual: {
    color: COLORS.sentimentBullish,
    fontWeight: '700',
  },
  pendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  pendingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFB95F',
  },
  pendingText: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFB95F',
  },
});
