import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';

export const AssetVolatilityProjections: React.FC = () => {
  return (
    <View style={styles.volatilityCard}>
      <View style={styles.volatilityHeader}>
        <Text style={styles.volatilityTitle}>Asset Volatility Projections</Text>
        <Text style={styles.volatilityTime}>T-MINUS 135M</Text>
      </View>

      <View style={styles.volatilityGrid}>
        <View style={styles.volatilityItem}>
          <View style={styles.volatilityItemHeader}>
            <Text style={styles.volatilitySymbol}>DXY (Dollar Index)</Text>
            <TrendingUp size={16} color={COLORS.sentimentBullish} />
          </View>
          <Text style={[styles.volatilityPrice, { color: COLORS.sentimentBullish }]}>
            104.82
          </Text>
          <Text style={[styles.volatilityDelta, { color: COLORS.sentimentBullish }]}>
            +0.48% Implied Delta
          </Text>
        </View>

        <View style={styles.volatilityItem}>
          <View style={styles.volatilityItemHeader}>
            <Text style={styles.volatilitySymbol}>XAU/USD (Gold)</Text>
            <TrendingDown size={16} color={COLORS.sentimentBearish} />
          </View>
          <Text style={[styles.volatilityPrice, { color: COLORS.sentimentBearish }]}>
            $2,318.40
          </Text>
          <Text style={[styles.volatilityDelta, { color: COLORS.sentimentBearish }]}>
            -1.15% Implied Drag
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  volatilityCard: {
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  volatilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  volatilityTitle: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  volatilityTime: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  volatilityGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  volatilityItem: {
    flex: 1,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  volatilityItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  volatilitySymbol: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  volatilityPrice: {
    fontFamily: FONTS.mono,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  volatilityDelta: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
  },
});

