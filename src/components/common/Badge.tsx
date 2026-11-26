import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';

export type BadgeVariant = 'bullish' | 'bearish' | 'warning' | 'info' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral', size = 'sm' }) => {
  const getBadgeColors = () => {
    switch (variant) {
      case 'bullish':
        return {
          bg: COLORS.sentimentBullishSubtle,
          border: COLORS.sentimentBullishBorder,
          text: COLORS.sentimentBullish,
        };
      case 'bearish':
        return {
          bg: COLORS.sentimentBearishSubtle,
          border: COLORS.sentimentBearishBorder,
          text: COLORS.sentimentBearish,
        };
      case 'warning':
        return {
          bg: COLORS.alertWarningSubtle,
          border: 'rgba(245, 158, 11, 0.35)',
          text: COLORS.alertWarning,
        };
      case 'info':
        return {
          bg: COLORS.alertInfoSubtle,
          border: 'rgba(59, 130, 246, 0.35)',
          text: COLORS.alertInfo,
        };
      case 'neutral':
      default:
        return {
          bg: COLORS.surfaceSecondary,
          border: COLORS.borderSubtle,
          text: COLORS.textSecondary,
        };
    }
  };

  const colors = getBadgeColors();
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          paddingHorizontal: isSm ? 6 : 8,
          paddingVertical: isSm ? 2 : 4,
        },
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          {
            color: colors.text,
            fontSize: isSm ? 10 : 12,
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
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: FONTS.mono,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

