import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Badge } from '../common/Badge';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { CalendarEvent } from '../../types';
import { formatWIBTime } from '../../utils/date';

interface CalendarEventRowCardProps {
  item: CalendarEvent;
  onPress?: () => void;
}

export const CalendarEventRowCard: React.FC<CalendarEventRowCardProps> = ({ item, onPress }) => {
  const colors = useThemeColors();
  const impactVariant =
    item.impact === 'HIGH' ? 'bearish' : item.impact === 'MEDIUM' ? 'warning' : 'neutral';
  const impactLabel =
    item.impact === 'HIGH' ? 'HIGH' : item.impact === 'MEDIUM' ? 'MED' : 'LOW';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        {
          borderBottomColor: colors.borderSubtle,
          backgroundColor: pressed ? colors.surfaceCard : colors.bgApp,
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${item.event_name}, ${item.country}, ${item.impact} impact`}
    >
      <View style={styles.topLine}>
        <View style={styles.metaLeft}>
          <Text style={[styles.timeText, { color: colors.textSecondary }]}>
            {formatWIBTime(item.release_time)}
          </Text>
          <View
            style={[
              styles.countryTag,
              {
                backgroundColor: colors.surfaceCard,
                borderColor: colors.borderSubtle,
              },
            ]}
          >
            <Text style={[styles.countryText, { color: colors.textPrimary }]}>{item.country}</Text>
          </View>
          <Badge label={impactLabel} variant={impactVariant} size="sm" />
        </View>

        {item.has_prediction && (
          <Text style={[styles.forecastTracked, { color: colors.textMuted }]}>MODEL TRACKED</Text>
        )}
      </View>

      <Text style={[styles.eventName, { color: colors.textPrimary }]} numberOfLines={2}>
        {item.event_name}
      </Text>

      <View style={styles.metricGrid}>
        <View style={styles.metricCol}>
          <Text style={[styles.metricLabel, { color: colors.textMuted }]}>PREVIOUS</Text>
          <Text style={[styles.metricVal, { color: colors.textSecondary }]}>
            {item.previous || '-'}
          </Text>
        </View>
        <View style={[styles.metricCol, styles.metricColCenter]}>
          <Text style={[styles.metricLabel, { color: colors.textMuted }]}>FORECAST</Text>
          <Text style={[styles.metricVal, { color: colors.textPrimary, fontWeight: '700' }]}>
            {item.forecast || '-'}
          </Text>
        </View>
        <View style={[styles.metricCol, styles.metricColRight]}>
          <Text style={[styles.metricLabel, { color: colors.textMuted }]}>ACTUAL</Text>
          <Text
            style={[
              styles.metricVal,
              {
                color: item.actual ? colors.sentimentBullish : colors.textMuted,
                fontWeight: item.actual ? '700' : '500',
              },
            ]}
          >
            {item.actual || 'Pending'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    gap: 6,
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    ...TABULAR_NUMS,
  },
  countryTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    borderWidth: 1,
  },
  countryText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
  },
  forecastTracked: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  eventName: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  metricGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  metricCol: {
    flex: 1,
    alignItems: 'flex-start',
  },
  metricColCenter: {
    alignItems: 'center',
  },
  metricColRight: {
    alignItems: 'flex-end',
  },
  metricLabel: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  metricVal: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
    ...TABULAR_NUMS,
  },
});
