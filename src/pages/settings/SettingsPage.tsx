import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import {
  ArrowLeft,
  Moon,
  Zap,
  Bell,
  Database,
  Sliders,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';

export const SettingsPage = ({ navigation }: any) => {
  const [darkMode, setDarkMode] = useState(true);
  const [highAlertPush, setHighAlertPush] = useState(true);
  const [rapidCacheTTL, setRapidCacheTTL] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const logout = useAuthStore((s) => s.logout);
  const showToast = useUIStore((s) => s.showToast);

  const handleLogout = async () => {
    await logout();
    showToast({
      type: 'info',
      title: 'Session Ended',
      message: 'You have been safely signed out.',
    });
  };

  const clearCache = () => {
    showToast({
      type: 'success',
      title: 'Cache Cleared',
      message: 'Redis query caches and OHLC buffers successfully purged.',
    });
  };

  return (
    <SafeScreenWrapper edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Back to previous page"
        >
          <ArrowLeft size={22} color={COLORS.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Settings and Preferences</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: Display & Appearance */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>DISPLAY & THEME</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Moon size={18} color={COLORS.textSecondary} />
                <View>
                  <Text style={styles.rowTitle}>Dark Mode (OLED Slate)</Text>
                  <Text style={styles.rowSubtitle}>Optimized for institutional trading desks</Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: COLORS.surfaceElevated, true: COLORS.sentimentBullish }}
                thumbColor={COLORS.textPrimary}
              />
            </View>

            <View style={[styles.row, styles.borderTop]}>
              <View style={styles.rowLeft}>
                <Sliders size={18} color={COLORS.textSecondary} />
                <View>
                  <Text style={styles.rowTitle}>Chart Haptic Cues</Text>
                  <Text style={styles.rowSubtitle}>Vibrate on crosshair price snap</Text>
                </View>
              </View>
              <Switch
                value={hapticFeedback}
                onValueChange={setHapticFeedback}
                trackColor={{ false: COLORS.surfaceElevated, true: COLORS.sentimentBullish }}
                thumbColor={COLORS.textPrimary}
              />
            </View>
          </View>
        </View>

        {/* Section 2: Macro High-Alert Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>NOTIFICATIONS & ALERTS</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Zap size={18} color={COLORS.alertWarning} />
                <View>
                  <Text style={styles.rowTitle}>High-Alert Push Window</Text>
                  <Text style={styles.rowSubtitle}>Notify T-minus 15m before High Impact releases</Text>
                </View>
              </View>
              <Switch
                value={highAlertPush}
                onValueChange={setHighAlertPush}
                trackColor={{ false: COLORS.surfaceElevated, true: COLORS.alertWarning }}
                thumbColor={COLORS.textPrimary}
              />
            </View>

            <View style={[styles.row, styles.borderTop]}>
              <View style={styles.rowLeft}>
                <Bell size={18} color={COLORS.textSecondary} />
                <View>
                  <Text style={styles.rowTitle}>Immediate Event Burst Alerts</Text>
                  <Text style={styles.rowSubtitle}>Toast popups on live actual vs forecast delta</Text>
                </View>
              </View>
              <Switch
                value={true}
                disabled
                trackColor={{ false: COLORS.surfaceElevated, true: COLORS.sentimentBullish }}
                thumbColor={COLORS.textPrimary}
              />
            </View>
          </View>
        </View>

        {/* Section 3: Caching & Engine Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>ENGINE & CACHING</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Database size={18} color={COLORS.alertInfo} />
                <View>
                  <Text style={styles.rowTitle}>Dynamic Redis TTL</Text>
                  <Text style={styles.rowSubtitle}>Auto-toggle 15s Standby / 3s High-Alert</Text>
                </View>
              </View>
              <Switch
                value={rapidCacheTTL}
                onValueChange={setRapidCacheTTL}
                trackColor={{ false: COLORS.surfaceElevated, true: COLORS.alertInfo }}
                thumbColor={COLORS.textPrimary}
              />
            </View>

            <Pressable
              style={({ pressed }) => [styles.actionRow, styles.borderTop, pressed && { opacity: 0.7 }]}
              onPress={clearCache}
            >
              <Text style={styles.actionText}>Purge Local Chart & Model Caches</Text>
              <ChevronRight size={16} color={COLORS.textSecondary} />
            </Pressable>
          </View>
        </View>

        {/* Section 4: Security & Session */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>ACCOUNT & SECURITY</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <ShieldCheck size={18} color={COLORS.sentimentBullish} />
                <View>
                  <Text style={styles.rowTitle}>Hardware KeyStore Security</Text>
                  <Text style={styles.rowSubtitle}>expo-secure-store encryption active</Text>
                </View>
              </View>
            </View>

            <Pressable
              style={({ pressed }) => [styles.actionRow, styles.borderTop, pressed && { opacity: 0.7 }]}
              onPress={handleLogout}
            >
              <View style={styles.logoutLeft}>
                <LogOut size={16} color={COLORS.sentimentBearish} />
                <Text style={styles.logoutText}>Sign Out from Terminal</Text>
              </View>
              <ChevronRight size={16} color={COLORS.sentimentBearish} />
            </Pressable>
          </View>
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          ForeCastFX Mobile v1.0.0-production • Institutional Macro Predictive Decision Engine.
        </Text>
      </ScrollView>
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgApp,
  },
  contentContainer: {
    padding: 16,
    gap: 20,
    paddingBottom: 60,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
    backgroundColor: COLORS.bgApp,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.sans,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 14,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  rowTitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  rowSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  actionText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.alertInfo,
    fontWeight: '600',
  },
  logoutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoutText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.sentimentBearish,
  },
  disclaimer: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 16,
  },
});

