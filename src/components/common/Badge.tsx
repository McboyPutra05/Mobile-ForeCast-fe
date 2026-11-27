import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';

export type BadgeVariant = 'bullish' | 'bearish' | 'warning' | 'navy' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral', size = 'sm' }) => {
  const colors = useThemeColors();

  const palette = (() => {
    switch (variant) {
      case 'bullish':
        return {
          bg: colors.sentimentBullishSubtle,
          border: colors.sentimentBullishBorder,
          text: colors.sentimentBullish,
        };
      case 'bearish':
        return {
          bg: colors.sentimentBearishSubtle,
          border: colors.sentimentBearishBorder,
          text: colors.sentimentBearish,
        };
      case 'warning':
        return {
          bg: colors.alertWarningSubtle,
          border: colors.alertWarningBorder,
          text: colors.alertWarning,
        };
      case 'navy':
        return {
          bg: colors.accentNavySubtle,
          border: colors.accentNavyBorder,
          text: colors.mode === 'dark' ? colors.textPrimary : colors.accentNavy,
        };
      case 'neutral':
      default:
        return {
          bg: colors.surfaceCard,
          border: colors.borderSubtle,
          text: colors.textSecondary,
        };
    }
  })();

  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: palette.bg,
          borderColor: palette.border,
          paddingHorizontal: isSm ? 7 : 9,
          paddingVertical: isSm ? 2.5 : 4,
        },
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          {
            color: palette.text,
            fontSize: isSm ? 10 : 11,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: FONTS.mono,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    ...TABULAR_NUMS,
  },
});
