import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  X,
  SlidersHorizontal,
  LogOut,
  CheckCircle2,
  Bell,
  ChevronRight,
} from 'lucide-react-native';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { ROUTES } from '../../routes/routeNames';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore, useThemeColors } from '../../store/useUIStore';
import { MOCK_HISTORY_ACCURACY } from '../../api/history.api';

interface ProfileDrawerProps {
  onNavigate: (route: string, params?: Record<string, unknown>) => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ onNavigate }) => {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const isDrawerOpen = useUIStore((s) => s.isProfileDrawerOpen);
  const setDrawerOpen = useUIStore((s) => s.setProfileDrawerOpen);
  const unreadCount = useUIStore((s) => s.unreadNotificationsCount);

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  if (!isDrawerOpen) return null;

  const handleClose = () => setDrawerOpen(false);

  const handleNavigate = (route: string, params?: Record<string, unknown>) => {
    handleClose();
    onNavigate(route, params);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
  };

  const displayName = user?.name || 'ForeCastFX Member';
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const { win_rate_percentage, total_events_analyzed } = MOCK_HISTORY_ACCURACY.summary_kpi;

  return (
    <Modal visible={isDrawerOpen} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={[styles.overlay, { backgroundColor: colors.scrim }]}>
        <View
          style={[
            styles.drawerContainer,
            {
              backgroundColor: colors.bgApp,
              borderRightColor: colors.borderSubtle,
              paddingTop: Math.max(insets.top + 12, 24),
              paddingBottom: Math.max(insets.bottom + 16, 24),
            },
          ]}
        >
          <View>
            <View style={[styles.topBar, { borderBottomColor: colors.borderSubtle }]}>
              <Text style={[styles.topBarTitle, { color: colors.textMuted }]}>
                FORECASTFX ACCOUNT
              </Text>
              <Pressable
                style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.7 }]}
                onPress={handleClose}
                accessibilityRole="button"
                accessibilityLabel="Close profile drawer"
              >
                <X size={20} color={colors.textPrimary} />
              </Pressable>
            </View>

            <View
              style={[
                styles.profileCard,
                {
                  backgroundColor: colors.surfaceCard,
                  borderColor: colors.borderSubtle,
                },
              ]}
            >
              <View style={[styles.avatarCircle, { backgroundColor: colors.accentNavy }]}>
                <Text style={[styles.avatarInitials, { color: colors.textInverse }]}>
                  {initials}
                </Text>
              </View>
              <View style={styles.profileDetails}>
                <Text style={[styles.userName, { color: colors.textPrimary }]} numberOfLines={1}>
                  {displayName}
                </Text>
                <Text style={[styles.userEmail, { color: colors.textSecondary }]} numberOfLines={1}>
                  {user?.email || 'Not signed in'}
                </Text>
                <View
                  style={[
                    styles.roleTag,
                    {
                      backgroundColor: colors.sentimentBullishSubtle,
                      borderColor: colors.sentimentBullishBorder,
                    },
                  ]}
                >
                  <Text style={[styles.roleText, { color: colors.sentimentBullish }]}>
                    {user?.role || 'PRO_TRADER'}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.statsStrip,
                {
                  backgroundColor: colors.surfaceCard,
                  borderColor: colors.borderSubtle,
                },
              ]}
            >
              <View style={styles.statCol}>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>MODEL WIN RATE</Text>
                <Text style={[styles.statVal, { color: colors.sentimentBullish }]}>
                  {win_rate_percentage.toFixed(1)}%
                </Text>
              </View>

              <View style={[styles.statDivider, { backgroundColor: colors.borderSubtle }]} />

              <View style={styles.statCol}>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>AUDITED EVENTS</Text>
                <Text style={[styles.statVal, { color: colors.textPrimary }]}>
                  {total_events_analyzed} Events
                </Text>
              </View>
            </View>

            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>WORKSPACE</Text>

            <View style={[styles.menuGroup, { borderColor: colors.borderSubtle }]}>
              <Pressable
                style={({ pressed }) => [
                  styles.menuItem,
                  { borderBottomColor: colors.borderSubtle },
                  pressed && { backgroundColor: colors.surfaceCard },
                ]}
                onPress={() => handleNavigate(ROUTES.MAIN_TABS, { screen: ROUTES.HISTORY })}
                accessibilityRole="button"
                accessibilityLabel="Open Prediction Accuracy and History"
              >
                <View style={styles.menuLeft}>
                  <CheckCircle2 size={18} color={colors.sentimentBullish} />
                  <View style={styles.menuTextBlock}>
                    <Text style={[styles.menuText, { color: colors.textPrimary }]}>
                      Prediction Accuracy Logs
                    </Text>
                    <Text style={[styles.menuSubtext, { color: colors.textSecondary }]}>
                      {win_rate_percentage.toFixed(1)}% across {total_events_analyzed} releases
                    </Text>
                  </View>
                </View>
                <ChevronRight size={16} color={colors.textMuted} />
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.menuItem,
                  { borderBottomColor: colors.borderSubtle },
                  pressed && { backgroundColor: colors.surfaceCard },
                ]}
                onPress={() => handleNavigate(ROUTES.NOTIFICATION)}
                accessibilityRole="button"
                accessibilityLabel="Open Notifications"
              >
                <View style={styles.menuLeft}>
                  <Bell size={18} color={colors.textPrimary} />
                  <View style={styles.menuTextBlock}>
                    <Text style={[styles.menuText, { color: colors.textPrimary }]}>
                      Notifications
                    </Text>
                    <Text style={[styles.menuSubtext, { color: colors.textSecondary }]}>
                      {unreadCount > 0 ? `${unreadCount} unread macro alerts` : 'All alerts read'}
                    </Text>
                  </View>
                </View>
                <ChevronRight size={16} color={colors.textMuted} />
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.menuItem,
                  styles.menuItemLast,
                  pressed && { backgroundColor: colors.surfaceCard },
                ]}
                onPress={() => handleNavigate(ROUTES.SETTINGS)}
                accessibilityRole="button"
                accessibilityLabel="Open Settings and Preferences"
              >
                <View style={styles.menuLeft}>
                  <SlidersHorizontal size={18} color={colors.textPrimary} />
                  <View style={styles.menuTextBlock}>
                    <Text style={[styles.menuText, { color: colors.textPrimary }]}>
                      Settings and Preferences
                    </Text>
                    <Text style={[styles.menuSubtext, { color: colors.textSecondary }]}>
                      Theme, chart defaults, alerts, cache
                    </Text>
                  </View>
                </View>
                <ChevronRight size={16} color={colors.textMuted} />
              </Pressable>
            </View>
          </View>

          <View style={styles.drawerFooter}>
            <Pressable
              style={({ pressed }) => [
                styles.logoutButton,
                {
                  borderColor: colors.sentimentBearishBorder,
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

            <Text style={[styles.footerMeta, { color: colors.textMuted }]}>
              ForeCastFX Mobile v1.0.0 • Editorial Edition
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.scrim}
          onPress={handleClose}
          accessibilityLabel="Dismiss profile drawer"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  scrim: {
    flex: 1,
  },
  drawerContainer: {
    width: '82%',
    maxWidth: 340,
    height: '100%',
    borderRightWidth: 1,
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  topBarTitle: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.0,
  },
  closeBtn: {
    width: 44,
    height: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 16,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: '700',
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontFamily: FONTS.serif,
    fontSize: 17,
    fontWeight: '700',
  },
  userEmail: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    marginTop: 2,
  },
  roleTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    borderWidth: 1,
    marginTop: 6,
  },
  roleText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  statsStrip: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  statCol: {
    flex: 1,
    gap: 3,
  },
  statLabel: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  statVal: {
    fontFamily: FONTS.mono,
    fontSize: 15,
    fontWeight: '700',
    ...TABULAR_NUMS,
  },
  statDivider: {
    width: 1,
    height: 28,
    marginHorizontal: 12,
  },
  sectionLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.0,
    marginBottom: 8,
  },
  menuGroup: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    minHeight: 54,
    borderBottomWidth: 1,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuTextBlock: {
    flex: 1,
  },
  menuText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '600',
  },
  menuSubtext: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    marginTop: 1,
  },
  drawerFooter: {
    gap: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 46,
    borderRadius: 4,
    borderWidth: 1,
  },
  logoutText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
  },
  footerMeta: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    textAlign: 'center',
  },
});
