/**
 * ForeCastFX Mobile — Color Palette Tokens
 * Strictly mapped to UI-Style-Guide.md
 */

export const COLORS = {
  // Core Neutral & Canvas Colors
  bgApp: '#0B0E14',         // Deep Canvas (Latar utama aplikasi)
  surfaceCard: '#151A23',   // Card & Container layer pertama
  surfaceElevated: '#1C2331', // Modal Sheet, Popover, Dropdown
  surfaceSecondary: '#222B3D', // Input background, Badge container

  // Border & Divider Tokens
  borderSubtle: '#1F2937',  // Garis pemisah list & kartu standar
  borderActive: '#374151',  // Border saat input difokuskan
  borderHighlight: '#4B5563', // Outline container aktif

  // Sentimen Bullish / Good For USD
  sentimentBullish: '#10B981', // Emerald Green (Primary Action / Good USD)
  sentimentBullishSubtle: 'rgba(16, 185, 129, 0.12)',
  sentimentBullishBorder: 'rgba(16, 185, 129, 0.35)',

  // Sentimen Bearish / Bad For USD
  sentimentBearish: '#EF4444', // Crimson Red (Primary Warning / Bad USD)
  sentimentBearishSubtle: 'rgba(239, 68, 68, 0.12)',
  sentimentBearishBorder: 'rgba(239, 68, 68, 0.35)',

  // Alerts & Highlights
  alertWarning: '#F59E0B',     // Amber Orange (High Alert Mode / Watchlist)
  alertWarningSubtle: 'rgba(245, 158, 11, 0.12)',
  alertInfo: '#3B82F6',        // Cobalt Blue (System Logs / Cache Refresh)
  alertInfoSubtle: 'rgba(59, 130, 246, 0.12)',

  // Typography Colors
  textPrimary: '#F9FAFB',   // Kontras tertinggi untuk angka & sinyal utama
  textSecondary: '#9CA3AF', // Label indikator, konsensus, subtitle
  textMuted: '#6B7280',     // Timestamp, teks footer, disclaimer
  textInverse: '#0B0E14',   // Teks di atas tombol solid cerah
} as const;

export type ColorToken = keyof typeof COLORS;

