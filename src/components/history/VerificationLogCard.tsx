import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react-native';
import { Badge } from '../common/Badge';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
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
  const isHit = item.status === 'HIT';

  return (
    <View style={styles.logCard}>
      {/* Header Row: Status icon + Event + Hit/Miss Badge + Accordion chevron */}
      <Pressable
        style={styles.logCardHeader}
        onPress={onToggleExpand}
        accessibilityRole="button"
        accessibilityLabel={`${item.event_name} verification details`}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View style={styles.logHeaderLeft}>
          <View
            style={[
              styles.statusCircle,
              {
                backgroundColor: isHit
                  ? COLORS.sentimentBullishSubtle
                  : COLORS.sentimentBearishSubtle,
                borderColor: isHit
                  ? COLORS.sentimentBullishBorder
                  : COLORS.sentimentBearishBorder,
              },
            ]}
          >
            {isHit ? (
              <CheckCircle2 size={16} color={COLORS.sentimentBullish} />
            ) : (
              <XCircle size={16} color={COLORS.sentimentBearish} />
            )}
          </View>

          <View style={styles.logTitleBlock}>
            <Text style={styles.logEventName}>{item.event_name}</Text>
            <Text style={styles.logDate}>{formatWIBDate(item.release_date)}</Text>
          </View>
        </View>

        <View style={styles.logHeaderRight}>
          <Badge
            label={isHit ? '✓ ACCURATE / HIT' : '✕ MISS'}
            variant={isHit ? 'bullish' : 'bearish'}
            size="sm"
          />
          <View style={styles.chevronWrapper}>
            {isExpanded ? (
              <ChevronUp size={16} color={COLORS.textSecondary} />
            ) : (
              <ChevronDown size={16} color={COLORS.textSecondary} />
            )}
          </View>
        </View>
      </Pressable>

      {/* Comparative Data Matrix (Section 6.E.3) */}
      <View style={styles.comparativeMatrix}>
        <View style={styles.matrixRow}>
          <Text style={styles.matrixRowLabel}>PREDICTED BIAS</Text>
          <Badge
            label={item.predicted_bias}
            variant={item.predicted_bias === 'GOOD FOR USD' ? 'bullish' : 'bearish'}
            size="sm"
          />
        </View>
        <View style={styles.matrixDivider} />
        <View style={styles.matrixRow}>
          <Text style={styles.matrixRowLabel}>MARKET OUTCOME</Text>
          <Text style={styles.outcomeValue} numberOfLines={2}>
            {item.actual_market_outcome}
          </Text>
        </View>
      </View>

      {/* Expandable Accordion: AI Pre-release Reasoning Recap */}
      {isExpanded && (
        <View style={styles.accordionBody}>
          <Text style={styles.reasoningTitle}>AI Pre-Release Reasoning Analysis:</Text>
          <Text style={styles.reasoningText}>{item.reasoning_recap}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logCard: {
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  logCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  logHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  statusCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logTitleBlock: {
    flex: 1,
  },
  logEventName: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  logDate: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  logHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chevronWrapper: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comparativeMatrix: {
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 10,
    padding: 10,
    gap: 8,
  },
  matrixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  matrixDivider: {
    height: 1,
    backgroundColor: COLORS.borderSubtle,
  },
  matrixRowLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  outcomeValue: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'right',
    marginLeft: 8,
  },
  accordionBody: {
    backgroundColor: COLORS.surfaceSecondary,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  reasoningTitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.sentimentBullish,
  },
  reasoningText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});


