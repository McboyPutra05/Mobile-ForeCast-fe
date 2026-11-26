import React from 'react';
import { ScrollView, Pressable, Text, View, StyleSheet } from 'react-native';
import { MarketSymbol, TickerSummaryItem } from '../../types';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';

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
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.watchlistScroll}
    >
      {symbols.map((sym) => {
        const isSelected = activeSymbol === sym;
        const t = tickers[sym];
        return (
          <Pressable
            key={sym}
            style={({ pressed }) => [
              styles.watchlistChip,
              isSelected ? styles.watchlistChipActive : styles.watchlistChipInactive,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => onSelectSymbol(sym)}
            accessibilityRole="button"
            accessibilityLabel={`${sym} market selector`}
            accessibilityState={{ selected: isSelected }}
            hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
          >
            {isSelected && <View style={styles.activeDot} />}
            <Text
              style={[
                styles.watchlistChipText,
                isSelected ? styles.watchlistChipTextActive : styles.watchlistChipTextInactive,
              ]}
            >
              {sym}
            </Text>
            {t && (
              <Text
                style={[
                  styles.watchlistChipPrice,
                  {
                    color:
                      t.direction === 'UP'
                        ? COLORS.sentimentBullish
                        : COLORS.sentimentBearish,
                  },
                ]}
              >
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
    paddingVertical: 4,
  },
  watchlistChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    gap: 6,
    borderWidth: 1,
  },
  watchlistChipActive: {
    backgroundColor: COLORS.surfaceElevated,
    borderColor: COLORS.sentimentBullish,
  },
  watchlistChipInactive: {
    backgroundColor: COLORS.surfaceCard,
    borderColor: COLORS.borderSubtle,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.sentimentBullish,
  },
  watchlistChipText: {
    fontFamily: FONTS.mono,
    fontSize: 12,
  },
  watchlistChipTextActive: {
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  watchlistChipTextInactive: {
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  watchlistChipPrice: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
  },
});

