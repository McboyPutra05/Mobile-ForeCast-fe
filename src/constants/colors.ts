/**
 * ForeCastFX Mobile: Editorial Financial Minimalist Color Tokens
 * Aligned with UI-Style-Guide.md (Warm Ivory Light default + Dark Ink mode)
 */

export type ThemeMode = 'light' | 'dark';

export interface ThemePalette {
  mode: ThemeMode;
  bgApp: string;
  surfaceCard: string;
  surfaceElevated: string;
  surfaceSecondary: string;
  borderSubtle: string;
  borderDashed: string;
  borderActive: string;
  borderStrong: string;
  sentimentBullish: string;
  sentimentBullishSubtle: string;
  sentimentBullishBorder: string;
  sentimentBearish: string;
  sentimentBearishSubtle: string;
  sentimentBearishBorder: string;
  alertWarning: string;
  alertWarningSubtle: string;
  alertWarningBorder: string;
  accentNavy: string;
  accentNavySubtle: string;
  accentNavyBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  scrim: string;
}

export const LIGHT_COLORS: ThemePalette = {
  mode: 'light',
  bgApp: '#FAF6F0',
  surfaceCard: '#F2EBE1',
  surfaceElevated: '#EAE0D2',
  surfaceSecondary: '#E5DCCB',

  borderSubtle: '#D6CFC2',
  borderDashed: '#C8C0B4',
  borderActive: '#A89F91',
  borderStrong: '#1C1917',

  sentimentBullish: '#2D6A4F',
  sentimentBullishSubtle: 'rgba(45, 106, 79, 0.10)',
  sentimentBullishBorder: 'rgba(45, 106, 79, 0.35)',

  sentimentBearish: '#7F1D1D',
  sentimentBearishSubtle: 'rgba(127, 29, 29, 0.10)',
  sentimentBearishBorder: 'rgba(127, 29, 29, 0.35)',

  alertWarning: '#9A4506', // Darkened ochre passing >=4.5:1 on Warm Sand & Warm Ivory
  alertWarningSubtle: 'rgba(180, 83, 9, 0.10)',
  alertWarningBorder: 'rgba(180, 83, 9, 0.35)',

  accentNavy: '#1E293B',
  accentNavySubtle: 'rgba(30, 41, 59, 0.08)',
  accentNavyBorder: 'rgba(30, 41, 59, 0.28)',

  textPrimary: '#1C1917',
  textSecondary: '#57534E',
  textMuted: '#635D57', // >=4.5:1 WCAG AA contrast on both #FAF6F0 and #F2EBE1
  textInverse: '#FAF6F0',
  scrim: 'rgba(28, 25, 23, 0.42)',
};

export const DARK_COLORS: ThemePalette = {
  mode: 'dark',
  bgApp: '#121110',
  surfaceCard: '#1C1A18',
  surfaceElevated: '#25221F',
  surfaceSecondary: '#2C2824',

  borderSubtle: '#2E2B27',
  borderDashed: '#3B3732',
  borderActive: '#575148',
  borderStrong: '#F5F2EB',

  sentimentBullish: '#52B788',
  sentimentBullishSubtle: 'rgba(82, 183, 136, 0.14)',
  sentimentBullishBorder: 'rgba(82, 183, 136, 0.38)',

  sentimentBearish: '#E06C65',
  sentimentBearishSubtle: 'rgba(224, 108, 101, 0.14)',
  sentimentBearishBorder: 'rgba(224, 108, 101, 0.38)',

  alertWarning: '#E09F3E',
  alertWarningSubtle: 'rgba(224, 159, 62, 0.14)',
  alertWarningBorder: 'rgba(224, 159, 62, 0.38)',

  accentNavy: '#2B3B52',
  accentNavySubtle: 'rgba(245, 242, 235, 0.08)',
  accentNavyBorder: 'rgba(245, 242, 235, 0.24)',

  textPrimary: '#F5F2EB',
  textSecondary: '#B8B0A4',
  textMuted: '#9A9185', // >=4.5:1 WCAG AA contrast on #121110 and #1C1A18
  textInverse: '#FAF6F0',
  scrim: 'rgba(0, 0, 0, 0.65)',
};

export function getThemeColors(mode: ThemeMode): ThemePalette {
  return mode === 'dark' ? DARK_COLORS : LIGHT_COLORS;
}

// Default export alias kept for non-hook static imports
export const COLORS = LIGHT_COLORS;
export type ColorToken = keyof ThemePalette;
