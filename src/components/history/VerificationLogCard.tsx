import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { Badge } from '../common/Badge';
import { EditorialDivider } from '../common/EditorialDivider';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { HistoryLogItem } from '../../types';
import { formatWIBDate } from '../../utils/date';

interface VerificationLogCardProps {
  item: HistoryLogItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const VerificationLogCard: React.FC<VerificationLogCardProps> = ({
  item,
  isExpanded,
  onToggleExpand,
}) => {
  const colors = useThemeColors();
  const isHit = item.status === 'HIT';

  return (
    <View
      style={[
        styles.logCard,
        {
          backgroundColor: colors.surfaceCard,
          borderColor: colors.borderSubtle,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.titleBlock}>
          <Text style={[styles.logDate, { color: colors.textMuted }]}>
            {formatWIBDate(item.release_date)}
          </Text>
          <Text style={[styles.logEventName, { color: colors.textPrimary }]}>
            {item.event_name}
          </Text>
        </View>
        <Badge label={isHit ? 'HIT' : 'MISS'} variant={isHit ? 'bullish' : 'bearish'} size="sm" />
      </View>

      <EditorialDivider />

      <View style={styles.comparisonBlock}>
        <View style={styles.compRow}>
          <Text style={[styles.compLabel, { color: colors.textMuted }]}>PREDICTED BIAS</Text>
          <Text
            style={[
              styles.compBias,
              {
                color:
                  item.predicted_bias === 'GOOD FOR USD'
                    ? colors.sentimentBullish
                    : colors.sentimentBearish,
              },
            ]}
          >
            {item.predicted_bias}
          </Text>
        </View>

        <View style={styles.compRow}>
          <Text style={[styles.compLabel, { color: colors.textMuted }]}>MARKET REACTION</Text>
          <Text style={[styles.compOutcome, { color: colors.textPrimary }]}>
            {item.actual_market_outcome}
          </Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.accordionBtn,
          { borderTopColor: colors.borderSubtle },
          pressed && { opacity: 0.75 },
        ]}
        onPress={onToggleExpand}
        accessibilityRole="button"
        accessibilityLabel={`Review AI pre-release reasoning for ${item.event_name}`}
        accessibilityState={{ expanded: isExpanded }}
      >
        <Text style={[styles.accordionLabel, { color: colors.textPrimary }]}>
          Review AI Pre-Release Reasoning
        </Text>
        {isExpanded ? (
          <ChevronUp size={16} color={colors.textSecondary} />
        ) : (
          <ChevronDown size={16} color={colors.textSecondary} />
        )}
      </Pressable>

      {isExpanded && (
        <View
          style={[
            styles.accordionBody,
            {
              backgroundColor: colors.bgApp,
              borderColor: colors.borderSubtle,
            },
          ]}
        >
          <Text style={[styles.reasoningText, { color: colors.textSecondary }]}>
            {item.reasoning_recap}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logCard: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 14,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
  logDate: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    ...TABULAR_NUMS,
  },
  logEventName: {
    fontFamily: FONTS.serif,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
  },
  comparisonBlock: {
    gap: 8,
  },
  compRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  compLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  compBias: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  compOutcome: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    lineHeight: 18,
  },
  accordionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 10,
    minHeight: 44,
  },
  accordionLabel: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
  },
  accordionBody: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
  },
  reasoningText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 20,
  },
});
