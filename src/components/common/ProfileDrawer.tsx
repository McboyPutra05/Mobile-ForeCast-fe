import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import {
  X,
  User,
  Shield,
  Sliders,
  LogOut,
  Award,
  TrendingUp,
  Activity,
} from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';

interface ProfileDrawerProps {
  navigation: any;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ navigation }) => {
  const isDrawerOpen = useUIStore((s) => s.isProfileDrawerOpen);
  const setDrawerOpen = useUIStore((s) => s.setProfileDrawerOpen);

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  if (!isDrawerOpen) return null;

  const handleClose = () => setDrawerOpen(false);

  const navigateToSettings = () => {
    handleClose();
    navigation.navigate('Settings');
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
  };

  return (
    <Modal visible={isDrawerOpen} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.scrim} onPress={handleClose} />

        {/* 82% Width Slide-Out Left Drawer */}
        <View style={styles.drawerContainer}>
          {/* Top Bar with Close Button */}
          <View style={styles.topBar}>
            <Text style={styles.topBarTitle}>Institutional Trader</Text>
            <Pressable
              style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.7 }]}
              onPress={handleClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Close Drawer"
            >
              <X size={20} color={COLORS.textSecondary} />
            </Pressable>
          </View>

          {/* User Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarCircle}>
              <User size={30} color={COLORS.sentimentBullish} />
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.userName}>{user?.name || 'Fahmi Dani'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
              <View style={styles.roleTag}>
                <Shield size={12} color={COLORS.sentimentBullish} />
                <Text style={styles.roleText}>{user?.role || 'PRO_TRADER'}</Text>
              </View>
            </View>
          </View>

          {/* Quick Trader Stats Strip */}
          <View style={styles.statsStrip}>
            <View style={styles.statCol}>
              <View style={styles.statIconRow}>
                <Award size={14} color={COLORS.sentimentBullish} />
                <Text style={styles.statLabel}>WIN RATE</Text>
              </View>
              <Text style={styles.statVal}>82.0%</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCol}>
              <View style={styles.statIconRow}>
                <TrendingUp size={14} color={COLORS.alertInfo} />
                <Text style={styles.statLabel}>EVALUATED</Text>
              </View>
              <Text style={styles.statVal}>50 Events</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCol}>
              <View style={styles.statIconRow}>
                <Activity size={14} color={COLORS.alertWarning} />
                <Text style={styles.statLabel}>STATUS</Text>
              </View>
              <Text style={[styles.statVal, { color: COLORS.sentimentBullish }]}>Active</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            <Pressable
              style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
              onPress={navigateToSettings}
            >
              <Sliders size={18} color={COLORS.textPrimary} />
              <Text style={styles.menuText}>Settings and Preferences</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
              onPress={handleLogout}
            >
              <LogOut size={18} color={COLORS.sentimentBearish} />
              <Text style={[styles.menuText, { color: COLORS.sentimentBearish }]}>
                Sign Out from Device
              </Text>
            </Pressable>
          </View>

          {/* Footer Version info */}
          <View style={styles.drawerFooter}>
            <Text style={styles.footerApp}>ForeCastFX Mobile</Text>
            <Text style={styles.footerVersion}>Build 2026.09 • Native React Native</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'row',
  },
  scrim: {
    flex: 1,
  },
  drawerContainer: {
    width: '82%',
    maxWidth: 340,
    height: '100%',
    backgroundColor: COLORS.bgApp,
    borderRightWidth: 1,
    borderRightColor: COLORS.borderSubtle,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
  },
  topBarTitle: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  closeBtn: {
    padding: 4,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1.5,
    borderColor: COLORS.sentimentBullish,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontFamily: FONTS.sans,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  userEmail: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  roleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.sentimentBullishSubtle,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 6,
  },
  roleText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.sentimentBullish,
  },
  statsStrip: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 18,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    color: COLORS.textSecondary,
  },
  statVal: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.borderSubtle,
  },
  menuContainer: {
    gap: 8,
    flex: 1,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceCard,
  },
  menuItemPressed: {
    backgroundColor: COLORS.surfaceElevated,
  },
  menuText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
    paddingTop: 16,
    gap: 2,
  },
  footerApp: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  footerVersion: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textMuted,
  },
});

