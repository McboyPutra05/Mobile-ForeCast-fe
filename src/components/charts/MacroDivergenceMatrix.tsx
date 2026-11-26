import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from '../common/Badge';
import { MarketSymbol, TickerSummaryItem } from '../../types';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { formatPrice } from '../../utils/currency';

interface MacroDivergenceMatrixProps {
  symbols: MarketSymbol[];
  tickers: Record<MarketSymbol, TickerSummaryItem>;
}

export const MacroDivergenceMatrix: React.FC<MacroDivergenceMatrixProps> = ({
  symbols,
  tickers,
}) => {
  return (
    <View style={styles.matrixSection}>
      <View style={styles.matrixHeader}>
        <Text style={styles.matrixTitle}>Macro Divergence Matrix</Text>
        <Text style={styles.matrixSync}>Live Polling (3s)</Text>
      </View>

      {symbols.map((sym) => {
        const t = tickers[sym];
        if (!t) return null;
        const isSymUp = t.direction === 'UP';

        return (
          <View key={sym} style={styles.matrixRow}>
            <View style={styles.matrixRowLeft}>
              <View style={styles.matrixIcon}>
                <Text style={styles.matrixIconText}>{sym.substring(0, 3)}</Text>
              </View>
              <View>
                <Text style={styles.matrixSymName}>{sym}</Text>
                <Text style={styles.matrixSub}>{t.name}</Text>
              </View>
            </View>

            <View style={styles.matrixRowRight}>
              <View style={styles.matrixPriceCluster}>
                <Text style={styles.matrixPrice}>{formatPrice(t.current_price, sym)}</Text>
                <Text
                  style={[
                    styles.matrixPct,
                    {
                      color: isSymUp
                        ? COLORS.sentimentBullish
                        : COLORS.sentimentBearish,
                    },
                  ]}
                >
                  {isSymUp ? '+' : ''}
                  {t.change_percentage.toFixed(2)}%
                </Text>
              </View>
              <Badge
                label={isSymUp ? 'BULLISH DRIVER' : 'BEARISH DRIVER'}
                variant={isSymUp ? 'bullish' : 'bearish'}
                size="sm"
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  matrixSection: {
    gap: 10,
  },
  matrixHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  matrixTitle: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  matrixSync: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  matrixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 12,
    padding: 12,
  },
  matrixRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  matrixIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matrixIconText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  matrixSymName: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  matrixSub: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.textSecondary,
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
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  matrixPct: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
  },
});


