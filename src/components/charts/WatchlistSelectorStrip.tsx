import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { MarketSymbol, TickerSummaryItem } from '../../types';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';

interface WatchlistSelectorStripProps {
  symbols: MarketSymbol[];
  activeSymbol: MarketSymbol;
  tickers: Record<MarketSymbol, TickerSummaryItem>;
  onSelectSymbol: (symbol: MarketSymbol) => void;
}

export const WatchlistSelectorStrip: React.FC<WatchlistSelectorStripProps> = ({
  symbols,
  activeSymbol,
  tickers,
  onSelectSymbol,
}) => {
  const colors = useThemeColors();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.watchlistScroll}
    >
      {symbols.map((sym) => {
        const isSelected = activeSymbol === sym;
        const t = tickers[sym];
        const pctColor = isSelected
          ? colors.textInverse
          : t?.direction === 'UP'
            ? colors.sentimentBullish
            : colors.sentimentBearish;

        return (
          <Pressable
            key={sym}
            style={({ pressed }) => [
              styles.watchlistChip,
              isSelected
                ? {
                    backgroundColor: colors.accentNavy,
                    borderColor: colors.accentNavy,
                  }
                : {
                    backgroundColor: colors.surfaceCard,
                    borderColor: colors.borderSubtle,
                  },
              pressed && { opacity: 0.84 },
            ]}
            onPress={() => onSelectSymbol(sym)}
            accessibilityRole="button"
            accessibilityLabel={`Select ${sym} chart`}
            accessibilityState={{ selected: isSelected }}
          >
            <Text
              style={[
                styles.watchlistChipText,
                { color: isSelected ? colors.textInverse : colors.textPrimary },
              ]}
            >
              {sym}
            </Text>
            {t && (
              <Text style={[styles.watchlistChipPrice, { color: pctColor }]}>
                {t.change_percentage >= 0 ? '+' : ''}
                {t.change_percentage.toFixed(2)}%
              </Text>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  watchlistScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  watchlistChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    minHeight: 44,
    borderRadius: 4,
    gap: 7,
    borderWidth: 1,
  },
  watchlistChipText: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: '700',
  },
  watchlistChipPrice: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    ...TABULAR_NUMS,
  },
});
