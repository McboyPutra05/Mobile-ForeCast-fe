import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ArrowUpRight, ArrowDownRight, ArrowRight, MessageSquare } from 'lucide-react-native';
import { CountdownTimer } from '../common/CountdownTimer';
import { EditorialDivider } from '../common/EditorialDivider';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { LatestPrediction } from '../../types';

interface HeroPredictionCardProps {
  prediction: LatestPrediction;
  cached?: boolean;
  cacheTtlSeconds?: number;
  onAskAiPress: () => void;
}

export const HeroPredictionCard: React.FC<HeroPredictionCardProps> = ({
  prediction,
  cached = true,
  cacheTtlSeconds = 120,
  onAskAiPress,
}) => {
  const colors = useThemeColors();
  const isGoodForUsd = prediction.bias === 'GOOD FOR USD';
  const isNeutral = prediction.bias === 'NEUTRAL';
  const sentimentColor = isNeutral
    ? colors.textPrimary
    : isGoodForUsd
      ? colors.sentimentBullish
      : colors.sentimentBearish;

  const executionNote = prediction.recommended_action
    ? prediction.recommended_action
    : isGoodForUsd
      ? 'SELL XAUUSD / BUY USD PAIRS'
      : 'BUY XAUUSD / SELL USD PAIRS';

  return (
    <View
      style={[
        styles.heroBlock,
        {
          borderLeftColor: sentimentColor,
        },
      ]}
    >
      <View style={styles.topMetaRow}>
        <Text style={[styles.kickerText, { color: colors.textMuted }]}>
          {prediction.country} • {prediction.impact} IMPACT FORECAST
        </Text>
        <CountdownTimer initialSeconds={prediction.countdown_seconds} compact />
      </View>

      <Text style={[styles.eventTitle, { color: colors.textPrimary }]}>
        {prediction.event_name}
      </Text>

      <View style={styles.biasRow}>
        <Text style={[styles.biasHeadline, { color: sentimentColor }]}>
          {prediction.bias}
        </Text>
        {isGoodForUsd ? (
          <ArrowUpRight size={24} color={sentimentColor} strokeWidth={2.2} />
        ) : (
          <ArrowDownRight size={24} color={sentimentColor} strokeWidth={2.2} />
        )}
      </View>

      <Text style={[styles.executionLine, { color: colors.textSecondary }]}>
        Desk Positioning:{' '}
        <Text style={[styles.executionValue, { color: sentimentColor }]}>{executionNote}</Text>
      </Text>

      <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
        {prediction.summary_reasoning}
      </Text>

      <View
        style={[
          styles.telemetryStrip,
          {
            backgroundColor: colors.surfaceCard,
            borderColor: colors.borderSubtle,
          },
        ]}
      >
        <View style={styles.telemetryCell}>
          <Text style={[styles.telemetryLabel, { color: colors.textMuted }]}>CONFIDENCE</Text>
          <Text style={[styles.telemetryVal, { color: sentimentColor }]}>
            {prediction.confidence_score}%
          </Text>
        </View>

        <View style={[styles.cellDivider, { backgroundColor: colors.borderSubtle }]} />

        <View style={styles.telemetryCell}>
          <Text style={[styles.telemetryLabel, { color: colors.textMuted }]}>VECTORS</Text>
          <Text style={[styles.telemetryVal, { color: colors.textPrimary }]}>140 Q-Models</Text>
        </View>

        <View style={[styles.cellDivider, { backgroundColor: colors.borderSubtle }]} />

        <View style={styles.telemetryCell}>
          <Text style={[styles.telemetryLabel, { color: colors.textMuted }]}>CACHE STATUS</Text>
          <Text style={[styles.telemetryVal, { color: colors.textPrimary }]}>
            {cached ? `REDIS (${cacheTtlSeconds}ms)` : 'LIVE ENGINE'}
          </Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.askAiLink,
          {
            backgroundColor: colors.surfaceCard,
            borderColor: colors.borderSubtle,
          },
          pressed && { opacity: 0.8 },
        ]}
        onPress={onAskAiPress}
        accessibilityRole="button"
        accessibilityLabel={`Ask AI Macro Analyst about ${prediction.event_name}`}
      >
        <View style={styles.askAiLeft}>
          <MessageSquare size={15} color={colors.textPrimary} strokeWidth={1.8} />
          <Text style={[styles.askAiText, { color: colors.textPrimary }]} numberOfLines={2}>
            Ask AI Macro Analyst: Why is USD {isGoodForUsd ? 'bullish' : 'bearish'} ahead of CPI?
          </Text>
        </View>
        <ArrowRight size={16} color={colors.textPrimary} strokeWidth={1.8} />
      </Pressable>

      <EditorialDivider spacingVertical={4} />
    </View>
  );
};

const styles = StyleSheet.create({
  heroBlock: {
    borderLeftWidth: 3,
    paddingLeft: 14,
    gap: 10,
  },
  topMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
  kickerText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  eventTitle: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  biasRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  biasHeadline: {
    fontFamily: FONTS.serif,
    fontSize: 27,
    lineHeight: 33,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  executionLine: {
    fontFamily: FONTS.sans,
    fontSize: 12,
  },
  executionValue: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: '700',
  },
  summaryText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 21,
  },
  telemetryStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 2,
  },
  telemetryCell: {
    flex: 1,
    gap: 2,
  },
  telemetryLabel: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  telemetryVal: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
    ...TABULAR_NUMS,
  },
  cellDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 8,
  },
  askAiLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 11,
    minHeight: 46,
    gap: 10,
  },
  askAiLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    flex: 1,
  },
  askAiText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
});
