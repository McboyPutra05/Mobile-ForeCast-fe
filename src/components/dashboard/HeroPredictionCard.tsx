import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Activity, ArrowUpRight, ArrowDownRight, Clock, ChevronRight, Bot } from 'lucide-react-native';
import { CountdownTimer } from '../common/CountdownTimer';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { LatestPrediction } from '../../types';

interface HeroPredictionCardProps {
  prediction: LatestPrediction;
  onAskAiPress: () => void;
}

export const HeroPredictionCard: React.FC<HeroPredictionCardProps> = ({
  prediction,
  onAskAiPress,
}) => {
  const isGoodForUsd = prediction.bias === 'GOOD FOR USD';
  const sentimentColor = isGoodForUsd ? COLORS.sentimentBullish : COLORS.sentimentBearish;
  const sentimentSubtle = isGoodForUsd ? COLORS.sentimentBullishSubtle : COLORS.sentimentBearishSubtle;
  const sentimentBorder = isGoodForUsd ? COLORS.sentimentBullishBorder : COLORS.sentimentBearishBorder;
  const executionTradeNote = isGoodForUsd
    ? 'SELL XAUUSD / BUY USD PAIRS'
    : 'BUY XAUUSD / SELL USD PAIRS';

  return (
    <View style={[styles.heroCard, { borderColor: sentimentBorder }]}>
      {/* Header Row: Event Target + Live Countdown Pill */}
      <View style={styles.heroHeader}>
        <View style={styles.eventInfo}>
          <Activity size={15} color={sentimentColor} />
          <Text
            style={styles.eventName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {prediction.event_name}
          </Text>
        </View>
        <CountdownTimer initialSeconds={prediction.countdown_seconds} />
      </View>

      {/* Directional Bias Callout */}
      <View style={styles.biasRow}>
        <View style={styles.biasContent}>
          <Text style={styles.biasLabel}>QUANTITATIVE BIAS</Text>
          <Text style={[styles.biasHeading, { color: sentimentColor }]}>
            {prediction.bias}
          </Text>
          <View style={styles.tradeNoteContainer}>
            <Text style={styles.tradeNoteLabel}>TRADE EXECUTION:</Text>
            <Text style={[styles.tradeNoteValue, { color: sentimentColor }]}>
              {executionTradeNote}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.biasIconContainer,
            { backgroundColor: sentimentSubtle, borderColor: sentimentBorder },
          ]}
        >
          {isGoodForUsd ? (
            <ArrowUpRight size={26} color={sentimentColor} />
          ) : (
            <ArrowDownRight size={26} color={sentimentColor} />
          )}
        </View>
      </View>

      {/* Confidence Gauge */}
      <View style={styles.confidenceSection}>
        <View style={styles.confidenceRow}>
          <Text style={styles.confidenceLabel}>Model Confidence</Text>
          <Text style={[styles.confidenceValue, { color: sentimentColor }]}>
            {prediction.confidence_score}% High Conviction
          </Text>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${prediction.confidence_score}%`, backgroundColor: sentimentColor },
            ]}
          />
        </View>
        <View style={styles.confidenceFooter}>
          <Text style={styles.confidenceSub}>Synthesized from 140 Macro Vectors</Text>
          <Text style={[styles.confidenceSub, { color: COLORS.textSecondary }]}>
            Z-Score: +{prediction.z_score_deviation}σ
          </Text>
        </View>
      </View>

      {/* Footer Telemetry Metadata */}
      <View style={styles.heroFooter}>
        <View style={styles.redisBadge}>
          <View style={[styles.statusDot, { backgroundColor: sentimentColor }]} />
          <Text style={styles.redisText}>Redis Cached (120ms)</Text>
        </View>
        <View style={styles.sessionTime}>
          <Clock size={12} color={COLORS.textSecondary} />
          <Text style={styles.sessionTimeText}>Tomorrow, 19:30 WIB</Text>
        </View>
      </View>

      {/* Contextual Ask AI Copilot Button */}
      <Pressable
        style={({ pressed }) => [styles.askAiButton, pressed && { opacity: 0.85 }]}
        onPress={onAskAiPress}
        accessibilityRole="button"
        accessibilityLabel="Ask AI Copilot regarding CPI"
      >
        <View style={styles.askAiLeft}>
          <Bot size={16} color={COLORS.textPrimary} />
          <Text style={styles.askAiText}>Ask Copilot: CPI Inflation Impact Analysis</Text>
        </View>
        <ChevronRight size={16} color={COLORS.textSecondary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    marginRight: 6,
  },
  eventName: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    flexShrink: 1,
  },
  biasRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  biasContent: {
    flex: 1,
  },
  biasLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.8,
  },
  biasHeading: {
    fontFamily: FONTS.sans,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 2,
    letterSpacing: -0.3,
  },
  tradeNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  tradeNoteLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.4,
  },
  tradeNoteValue: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  biasIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  confidenceSection: {
    gap: 6,
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  confidenceLabel: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  confidenceValue: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  confidenceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  confidenceSub: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
  },
  redisBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  redisText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  sessionTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sessionTimeText: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  askAiButton: {
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  askAiLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  askAiText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});


