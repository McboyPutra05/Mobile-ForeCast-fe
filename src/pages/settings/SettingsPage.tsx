import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import { ArrowLeft, ChevronRight, LogOut } from 'lucide-react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useAuthStore } from '../../store/useAuthStore';
import { useMarketStore } from '../../store/useMarketStore';
import { useUIStore, useThemeColors } from '../../store/useUIStore';
import { queryClient } from '../../api/queryClient';
import { MarketSymbol, Timeframe } from '../../types';

const TIMEFRAME_OPTIONS: Timeframe[] = ['15m', '1h', '4h', '1d'];
const ASSET_OPTIONS: MarketSymbol[] = ['DXY', 'USOIL', 'XAUUSD', 'USDIDR'];

export const SettingsPage = ({ navigation }: any) => {
  const colors = useThemeColors();

  const themeMode = useUIStore((s) => s.themeMode);
  const setThemeMode = useUIStore((s) => s.setThemeMode);
  const defaultTimeframe = useUIStore((s) => s.defaultTimeframe);
  const setDefaultTimeframe = useUIStore((s) => s.setDefaultTimeframe);
  const primaryAsset = useUIStore((s) => s.primaryAsset);
  const setPrimaryAsset = useUIStore((s) => s.setPrimaryAsset);
  const highAlertPush = useUIStore((s) => s.highAlertPush);
  const setHighAlertPush = useUIStore((s) => s.setHighAlertPush);
  const hapticCues = useUIStore((s) => s.hapticCues);
  const setHapticCues = useUIStore((s) => s.setHapticCues);
  const dynamicCacheTTL = useUIStore((s) => s.dynamicCacheTTL);
  const setDynamicCacheTTL = useUIStore((s) => s.setDynamicCacheTTL);
  const showToast = useUIStore((s) => s.showToast);

  const setActiveSymbol = useMarketStore((s) => s.setActiveSymbol);
  const logout = useAuthStore((s) => s.logout);

  const handleSelectAsset = (symbol: MarketSymbol) => {
    setPrimaryAsset(symbol);
    setActiveSymbol(symbol);
  };

  const handleClearCache = () => {
    queryClient.clear();
    showToast({
      type: 'success',
      title: 'Local Cache Cleared',
      message: 'TanStack Query cache and buffered snapshots have been cleared.',
    });
  };

  const handleLogout = async () => {
    await logout();
    showToast({
      type: 'info',
      title: 'Signed Out',
      message: 'Your session has been ended on this device.',
    });
  };

  return (
    <SafeScreenWrapper edges={['top', 'bottom']}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.bgApp,
            borderBottomColor: colors.borderSubtle,
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Back to previous screen"
        >
          <ArrowLeft size={20} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Settings & Preferences
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={[styles.container, { backgroundColor: colors.bgApp }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>
            DISPLAY & TRADING
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surfaceCard,
                borderColor: colors.borderSubtle,
              },
            ]}
          >
            <View style={styles.blockRow}>
              <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>Visual Theme</Text>
              <Text style={[styles.rowSubtitle, { color: colors.textSecondary }]}>
                Editorial Ivory (default) or Dark Ink mode
              </Text>

              <View
                style={[
                  styles.segmentedWrap,
                  {
                    backgroundColor: colors.bgApp,
                    borderColor: colors.borderSubtle,
                  },
                ]}
              >
                <Pressable
                  style={[
                    styles.segmentBtn,
                    themeMode === 'light' && { backgroundColor: colors.accentNavy },
                  ]}
                  onPress={() => setThemeMode('light')}
                  accessibilityRole="button"
                  accessibilityLabel="Editorial Ivory light theme"
                  accessibilityState={{ selected: themeMode === 'light' }}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      { color: themeMode === 'light' ? colors.textInverse : colors.textSecondary },
                    ]}
                  >
                    Editorial Ivory
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.segmentBtn,
                    themeMode === 'dark' && { backgroundColor: colors.accentNavy },
                  ]}
                  onPress={() => setThemeMode('dark')}
                  accessibilityRole="button"
                  accessibilityLabel="Dark Ink dark theme"
                  accessibilityState={{ selected: themeMode === 'dark' }}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      { color: themeMode === 'dark' ? colors.textInverse : colors.textSecondary },
                    ]}
                  >
                    Dark Ink
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={[styles.blockRow, styles.borderTop, { borderTopColor: colors.borderSubtle }]}>
              <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>
                Default Chart Timeframe
              </Text>
              <View style={styles.optionRow}>
                {TIMEFRAME_OPTIONS.map((tf) => {
                  const selected = defaultTimeframe === tf;
                  return (
                    <Pressable
                      key={tf}
                      style={[
                        styles.optionChip,
                        selected
                          ? { backgroundColor: colors.accentNavy, borderColor: colors.accentNavy }
                          : { backgroundColor: colors.bgApp, borderColor: colors.borderSubtle },
                      ]}
                      onPress={() => setDefaultTimeframe(tf)}
                      accessibilityRole="button"
                      accessibilityLabel={`Default timeframe ${tf}`}
                      accessibilityState={{ selected }}
                    >
                      <Text
                        style={[
                          styles.optionChipText,
                          { color: selected ? colors.textInverse : colors.textSecondary },
                        ]}
                      >
                        {tf.toUpperCase()}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={[styles.blockRow, styles.borderTop, { borderTopColor: colors.borderSubtle }]}>
              <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>Primary Asset</Text>
              <View style={styles.optionRow}>
                {ASSET_OPTIONS.map((sym) => {
                  const selected = primaryAsset === sym;
                  return (
                    <Pressable
                      key={sym}
                      style={[
                        styles.optionChip,
                        selected
                          ? { backgroundColor: colors.accentNavy, borderColor: colors.accentNavy }
                          : { backgroundColor: colors.bgApp, borderColor: colors.borderSubtle },
                      ]}
                      onPress={() => handleSelectAsset(sym)}
                      accessibilityRole="button"
                      accessibilityLabel={`Primary asset ${sym}`}
                      accessibilityState={{ selected }}
                    >
                      <Text
                        style={[
                          styles.optionChipText,
                          { color: selected ? colors.textInverse : colors.textSecondary },
                        ]}
                      >
                        {sym}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>
            NOTIFICATIONS & ALERTS
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surfaceCard,
                borderColor: colors.borderSubtle,
              },
            ]}
          >
            <View style={styles.switchRow}>
              <View style={styles.rowTextWrap}>
                <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>
                  High-Alert Window (T-15m)
                </Text>
                <Text style={[styles.rowSubtitle, { color: colors.textSecondary }]}>
                  Pre-release notifications ahead of High Impact USD events
                </Text>
              </View>
              <Switch
                value={highAlertPush}
                onValueChange={setHighAlertPush}
                trackColor={{ false: colors.borderActive, true: colors.sentimentBullish }}
                thumbColor={colors.textInverse}
                accessibilityLabel="Toggle High-Alert Window notifications"
              />
            </View>

            <View style={[styles.switchRow, styles.borderTop, { borderTopColor: colors.borderSubtle }]}>
              <View style={styles.rowTextWrap}>
                <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>
                  Chart Crosshair Cues
                </Text>
                <Text style={[styles.rowSubtitle, { color: colors.textSecondary }]}>
                  Tactile feedback when inspecting candlesticks
                </Text>
              </View>
              <Switch
                value={hapticCues}
                onValueChange={setHapticCues}
                trackColor={{ false: colors.borderActive, true: colors.sentimentBullish }}
                thumbColor={colors.textInverse}
                accessibilityLabel="Toggle Chart Crosshair Cues"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>
            SYSTEM & CACHE
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surfaceCard,
                borderColor: colors.borderSubtle,
              },
            ]}
          >
            <View style={styles.switchRow}>
              <View style={styles.rowTextWrap}>
                <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>
                  Redis Dynamic TTL Polling
                </Text>
                <Text style={[styles.rowSubtitle, { color: colors.textSecondary }]}>
                  15s Standby / 3s High-Alert burst window synchronization
                </Text>
              </View>
              <Switch
                value={dynamicCacheTTL}
                onValueChange={setDynamicCacheTTL}
                trackColor={{ false: colors.borderActive, true: colors.sentimentBullish }}
                thumbColor={colors.textInverse}
                accessibilityLabel="Toggle Redis Dynamic TTL polling"
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.actionRow,
                styles.borderTop,
                { borderTopColor: colors.borderSubtle },
                pressed && { opacity: 0.75 },
              ]}
              onPress={handleClearCache}
              accessibilityRole="button"
              accessibilityLabel="Clear Local Cache"
            >
              <View style={styles.rowTextWrap}>
                <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>
                  Clear Local Cache
                </Text>
                <Text style={[styles.rowSubtitle, { color: colors.textSecondary }]}>
                  Reset local query cache and force fresh briefing fetch
                </Text>
              </View>
              <ChevronRight size={17} color={colors.textSecondary} />
            </Pressable>

            <View style={[styles.actionRow, styles.borderTop, { borderTopColor: colors.borderSubtle }]}>
              <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>App Version</Text>
              <Text style={[styles.versionMono, { color: colors.textMuted }]}>
                v1.0.0-editorial
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.logoutBtn,
            {
              borderColor: colors.sentimentBearish,
              backgroundColor: colors.sentimentBearishSubtle,
            },
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Log Out Account"
        >
          <LogOut size={16} color={colors.sentimentBearish} />
          <Text style={[styles.logoutText, { color: colors.sentimentBearish }]}>
            Log Out Account
          </Text>
        </Pressable>
      </ScrollView>
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.serif,
    fontSize: 19,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 44,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 20,
    paddingBottom: 48,
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.0,
  },
  card: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  blockRow: {
    padding: 14,
    gap: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    gap: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    minHeight: 52,
    gap: 12,
  },
  borderTop: {
    borderTopWidth: 1,
  },
  rowTextWrap: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '600',
  },
  rowSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    lineHeight: 17,
  },
  segmentedWrap: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    padding: 3,
    marginTop: 4,
  },
  segmentBtn: {
    flex: 1,
    minHeight: 40,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  optionChip: {
    minWidth: 56,
    minHeight: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionChipText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  versionMono: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    ...TABULAR_NUMS,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 48,
    borderWidth: 1.5,
    borderRadius: 4,
    marginTop: 4,
  },
  logoutText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
  },
});
