/**
 * ForeCastFX Mobile — Typography Tokens & Scales
 * Strictly aligned with UI-Style-Guide.md
 */

import { TextStyle, Platform } from 'react-native';

export const FONTS = {
  sans: Platform.select({
    ios: 'Inter',
    android: 'Inter',
    default: 'System',
  }) as string,
  mono: Platform.select({
    ios: 'JetBrainsMono',
    android: 'JetBrainsMono',
    default: 'monospace',
  }) as string,
} as const;

export const TYPOGRAPHY: Record<string, TextStyle> = {
  displayHero: {
    fontFamily: FONTS.sans,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
  },
  titleLarge: {
    fontFamily: FONTS.sans,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  titleMedium: {
    fontFamily: FONTS.sans,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  bodyRegular: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  bodyMedium: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  caption: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  monoStatLg: {
    fontFamily: FONTS.mono,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '600',
  },
  monoStatMd: {
    fontFamily: FONTS.mono,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
  },
  monoStatSm: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
  },
  monoStatXs: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
};
