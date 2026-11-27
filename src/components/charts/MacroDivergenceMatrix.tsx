import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from '../common/Badge';
import { EditorialDivider } from '../common/EditorialDivider';
import { MarketSymbol, TickerSummaryItem } from '../../types';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { formatPrice } from '../../utils/currency';

interface MacroDivergenceMatrixProps {
  symbols: MarketSymbol[];
  tickers: Record<MarketSymbol, TickerSummaryItem>;
}

export const MacroDivergenceMatrix: React.FC<MacroDivergenceMatrixProps> = ({
  symbols,
  tickers,
}) => {
  const colors = useThemeColors();

  return (
    <View style={styles.matrixSection}>
      <View style={styles.matrixHeader}>
        <Text style={[styles.matrixTitle, { color: colors.textMuted }]}>
          INTERMARKET DIVERGENCE MATRIX
        </Text>
        <Text style={[styles.matrixSync, { color: colors.textSecondary }]}>LIVE STREAM</Text>
      </View>

      <EditorialDivider />

      <View>
        {symbols.map((sym, idx) => {
          const t = tickers[sym];
          if (!t) return null;
          const isSymUp = t.direction === 'UP';
          const isLast = idx === symbols.length - 1;

          return (
            <View key={sym}>
              <View style={styles.matrixRow}>
                <View style={styles.matrixRowLeft}>
                  <View
                    style={[
                      styles.matrixIcon,
                      {
                        backgroundColor: colors.surfaceCard,
                        borderColor: colors.borderSubtle,
                      },
                    ]}
                  >
                    <Text style={[styles.matrixIconText, { color: colors.textPrimary }]}>
                      {sym.substring(0, 3)}
                    </Text>
                  </View>
                  <View style={styles.nameBlock}>
                    <Text style={[styles.matrixSymName, { color: colors.textPrimary }]}>{sym}</Text>
                    <Text style={[styles.matrixSub, { color: colors.textSecondary }]} numberOfLines={1}>
                      {t.name}
                    </Text>
                  </View>
                </View>

                <View style={styles.matrixRowRight}>
                  <View style={styles.matrixPriceCluster}>
                    <Text style={[styles.matrixPrice, { color: colors.textPrimary }]}>
                      {formatPrice(t.current_price, sym)}
                    </Text>
                    <Text
                      style={[
                        styles.matrixPct,
                        {
                          color: isSymUp ? colors.sentimentBullish : colors.sentimentBearish,
                        },
                      ]}
                    >
                      {isSymUp ? '+' : ''}
                      {t.change_percentage.toFixed(2)}%
                    </Text>
                  </View>
                  <Badge
                    label={isSymUp ? 'BULLISH' : 'BEARISH'}
                    variant={isSymUp ? 'bullish' : 'bearish'}
                    size="sm"
                  />
                </View>
              </View>
              {!isLast && <EditorialDivider dashed />}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  matrixSection: {
    gap: 8,
  },
  matrixHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  matrixTitle: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.0,
  },
  matrixSync: {
    fontFamily: FONTS.mono,
    fontSize: 10,
  },
  matrixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    gap: 12,
  },
  matrixRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  matrixIcon: {
    width: 38,
    height: 38,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matrixIconText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  nameBlock: {
    flex: 1,
  },
  matrixSymName: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
  },
  matrixSub: {
    fontFamily: FONTS.sans,
    fontSize: 12,
  },
  matrixRowRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  matrixPriceCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  matrixPrice: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    fontWeight: '700',
    ...TABULAR_NUMS,
  },
  matrixPct: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    ...TABULAR_NUMS,
  },
});
