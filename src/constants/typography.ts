/**
 * ForeCastFX Mobile: Editorial Typography Tokens & Scales
 * Serif (Georgia/serif) + Clean Sans-Serif (Inter) + Technical Monospace (JetBrains Mono)
 */

import { TextStyle, Platform } from 'react-native';

export const FONTS = {
  serif: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'Georgia, serif',
  }) as string,
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

export const TABULAR_NUMS: TextStyle = {
  fontVariant: ['tabular-nums'],
};

export const TYPOGRAPHY: Record<string, TextStyle> = {
  displayHero: {
    fontFamily: FONTS.serif,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  titleEditorial: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  titleHeader: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  bodyProse: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
  },
  bodyLabel: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  captionTracked: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 1.0,
  },
  monoData: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    ...TABULAR_NUMS,
  },
  monoStatLg: {
    fontFamily: FONTS.mono,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    ...TABULAR_NUMS,
  },
  monoStatMd: {
    fontFamily: FONTS.mono,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    ...TABULAR_NUMS,
  },
  monoStatSm: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    ...TABULAR_NUMS,
  },
  monoStatXs: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    ...TABULAR_NUMS,
  },
};
