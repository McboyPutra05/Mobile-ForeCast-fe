import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Info } from 'lucide-react-native';
import { Badge } from '../common/Badge';
import { EditorialDivider } from '../common/EditorialDivider';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { LeadingIndicatorItem } from '../../types';

interface LeadingIndicatorsClusterProps {
  indicators: LeadingIndicatorItem[];
  zScoreDeviation: number;
  onInfoPress: () => void;
}

export const LeadingIndicatorsCluster: React.FC<LeadingIndicatorsClusterProps> = ({
  indicators,
  zScoreDeviation,
  onInfoPress,
}) => {
  const colors = useThemeColors();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={[styles.sectionKicker, { color: colors.textMuted }]}>
            LEADING INDICATORS BREAKDOWN
          </Text>
          <Text style={[styles.sectionSub, { color: colors.textSecondary }]}>
            {indicators.length} weighted macro inputs
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.infoBtn, pressed && { opacity: 0.7 }]}
          onPress={onInfoPress}
          accessibilityRole="button"
          accessibilityLabel="Inspect leading indicator weighting formula"
        >
          <Info size={18} color={colors.textSecondary} />
        </Pressable>
      </View>

      <EditorialDivider />

      <View>
        {indicators.map((item, idx) => {
          const isHawkish = item.sentiment_impact.toUpperCase().includes('HAWKISH');
          const isLast = idx === indicators.length - 1;

          return (
            <View key={`${item.name}-${idx}`}>
              <View style={styles.row}>
                <View style={styles.rowLeft}>
                  <Text style={[styles.indicatorName, { color: colors.textPrimary }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.indicatorMeta, { color: colors.textSecondary }]}>
                    Weight: {Math.round(item.weight * 100)}% • Z-Dev: +{item.deviation_score.toFixed(2)}σ
                  </Text>
                </View>

                <View style={styles.rowRight}>
                  <Text style={[styles.actualVal, { color: colors.textPrimary }]}>
                    {item.actual}{' '}
                    <Text style={[styles.prevVal, { color: colors.textMuted }]}>
                      (Prev {item.previous})
                    </Text>
                  </Text>
                  <Badge
                    label={item.sentiment_impact}
                    variant={isHawkish ? 'bullish' : 'bearish'}
                    size="sm"
                  />
                </View>
              </View>
              {!isLast && <EditorialDivider dashed />}
            </View>
          );
        })}
      </View>

      <View
        style={[
          styles.zScoreBar,
          {
            backgroundColor: colors.surfaceCard,
            borderColor: colors.borderSubtle,
          },
        ]}
      >
        <View style={styles.zScoreLeft}>
          <Text style={[styles.zScoreLabel, { color: colors.textSecondary }]}>
            Aggregate Z-Score
          </Text>
          <Text style={[styles.zScoreValue, { color: colors.sentimentBullish }]}>
            +{zScoreDeviation.toFixed(2)} σ
          </Text>
        </View>
        <Badge label="High Inflation Pressure" variant="warning" size="sm" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionKicker: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.0,
  },
  sectionSub: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    marginTop: 2,
  },
  infoBtn: {
    width: 44,
    height: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    gap: 12,
  },
  rowLeft: {
    flex: 1,
    gap: 3,
  },
  indicatorName: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '600',
  },
  indicatorMeta: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    ...TABULAR_NUMS,
  },
  rowRight: {
    alignItems: 'flex-end',
    gap: 5,
  },
  actualVal: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    fontWeight: '700',
    ...TABULAR_NUMS,
  },
  prevVal: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '400',
  },
  zScoreBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 4,
  },
  zScoreLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  zScoreLabel: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
  },
  zScoreValue: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    fontWeight: '700',
    ...TABULAR_NUMS,
  },
});
