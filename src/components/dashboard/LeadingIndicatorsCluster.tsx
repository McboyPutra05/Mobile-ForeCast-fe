import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Droplet, Factory, Users, TrendingUp, Info } from 'lucide-react-native';
import { Badge } from '../common/Badge';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
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
  const getIndicatorIcon = (name: string, index: number) => {
    const lower = name.toLowerCase();
    if (lower.includes('oil') || lower.includes('crude') || lower.includes('energy')) {
      return <Droplet size={16} color={COLORS.alertWarning} />;
    }
    if (lower.includes('ism') || lower.includes('price') || lower.includes('pmi')) {
      return <Factory size={16} color={COLORS.sentimentBullish} />;
    }
    if (lower.includes('job') || lower.includes('pay') || lower.includes('employment') || lower.includes('adp')) {
      return <Users size={16} color={COLORS.alertInfo} />;
    }
    return <TrendingUp size={16} color={index % 2 === 0 ? COLORS.sentimentBullish : COLORS.alertWarning} />;
  };

  return (
    <View style={styles.indicatorsCluster}>
      <View style={styles.clusterHeader}>
        <View style={styles.clusterTitleRow}>
          <Text style={styles.clusterTitle}>Leading Indicators Cluster</Text>
          <Pressable
            onPress={onInfoPress}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel="View Indicator Details"
          >
            <Info size={16} color={COLORS.textSecondary} />
          </Pressable>
        </View>
        <View style={styles.inputsBadge}>
          <Text style={styles.inputsBadgeText}>{indicators.length} Vectors Synthesized</Text>
        </View>
      </View>

      {/* List of Indicators */}
      {indicators.map((item, idx) => {
        const isHawkish = item.sentiment_impact.toUpperCase().includes('HAWKISH');
        return (
          <View key={idx} style={styles.indicatorCard}>
            <View style={styles.indicatorLeft}>
              <View style={styles.indicatorIconWrapper}>
                {getIndicatorIcon(item.name, idx)}
              </View>
              <View style={styles.indicatorDetails}>
                <Text style={styles.indicatorName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.indicatorWeight}>
                  Weight (w_i): {Math.round(item.weight * 100)}% | Dev: +{item.deviation_score}σ
                </Text>
              </View>
            </View>

            <View style={styles.indicatorRight}>
              <Text style={styles.indicatorDeviation}>
                {item.actual}{' '}
                <Text style={styles.indicatorPrev}>({item.previous})</Text>
              </Text>
              <Badge
                label={item.sentiment_impact}
                variant={isHawkish ? 'bullish' : 'bearish'}
                size="sm"
              />
            </View>
          </View>
        );
      })}

      {/* Aggregate Z-Score Summary Banner */}
      <View style={styles.zScoreBanner}>
        <View style={styles.zScoreLeft}>
          <View style={styles.sigmaBadge}>
            <Text style={styles.sigmaText}>σ</Text>
          </View>
          <Text style={styles.zScoreLabel}>
            Aggregate Z-Score: <Text style={styles.zScoreValue}>+{zScoreDeviation} σ</Text>
          </Text>
        </View>
        <View style={styles.zScoreTag}>
          <Text style={styles.zScoreTagText}>High Inflation Pressure</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorsCluster: {
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  clusterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  clusterTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clusterTitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  inputsBadge: {
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },
  inputsBadgeText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.sentimentBullish,
  },
  indicatorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    padding: 10,
  },
  indicatorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  indicatorIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorDetails: {
    flex: 1,
  },
  indicatorName: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  indicatorWeight: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  indicatorRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  indicatorDeviation: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  indicatorPrev: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '400',
    color: COLORS.textMuted,
  },
  zScoreBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceSecondary,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    padding: 10,
    borderRadius: 10,
    marginTop: 4,
  },
  zScoreLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sigmaBadge: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: COLORS.sentimentBullishSubtle,
    borderWidth: 1,
    borderColor: COLORS.sentimentBullishBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sigmaText: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.sentimentBullish,
  },
  zScoreLabel: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  zScoreValue: {
    fontFamily: FONTS.mono,
    color: COLORS.sentimentBullish,
    fontWeight: '700',
  },
  zScoreTag: {
    backgroundColor: COLORS.alertWarningSubtle,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  zScoreTagText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.alertWarning,
  },
});


