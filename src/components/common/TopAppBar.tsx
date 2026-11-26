import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Bell, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { ROUTES } from '../../routes/routeNames';
import { useMarketStore } from '../../store/useMarketStore';
import { useUIStore } from '../../store/useUIStore';

interface TopAppBarProps {
  title?: string;
  hasUnreadNotifications?: boolean;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title = 'ForeCastFX',
  hasUnreadNotifications = true,
  onNotificationPress,
  onProfilePress,
}) => {
  const navigation = useNavigation<any>();
  const isLiveConnected = useMarketStore((s) => s.isLiveConnected);
  const setProfileDrawerOpen = useUIStore((s) => s.setProfileDrawerOpen);

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      // Safe fallback navigation up to root stack
      navigation.getParent()?.navigate(ROUTES.NOTIFICATION) ?? navigation.navigate(ROUTES.NOTIFICATION);
    }
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      setProfileDrawerOpen(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Brand Title */}
      <View style={styles.leftBrand}>
        <Text style={styles.brandTitle}>{title}</Text>
        <View style={styles.brandDot} />
      </View>

      {/* Right Action Icons */}
      <View style={styles.rightActions}>
        {/* Live Synced Status Pill */}
        <View style={styles.liveStatusPill}>
          <View
            style={[
              styles.statusPulseDot,
              { backgroundColor: isLiveConnected ? COLORS.alertInfo : COLORS.alertWarning },
            ]}
          />
          <Text
            style={[
              styles.statusText,
              { color: isLiveConnected ? COLORS.alertInfo : COLORS.alertWarning },
            ]}
          >
            {isLiveConnected ? 'Live Synced' : 'Reconnecting'}
          </Text>
        </View>

        {/* Notification Bell with unread dot placed outside icon body */}
        <Pressable
          style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
          onPress={handleNotificationPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Bell size={18} color={COLORS.textPrimary} />
          {hasUnreadNotifications && <View style={styles.unreadDot} />}
        </Pressable>

        {/* User Profile Avatar */}
        <Pressable
          style={({ pressed }) => [styles.profileAvatar, pressed && styles.iconButtonPressed]}
          onPress={handleProfilePress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="User Profile and Settings"
        >
          <User size={18} color={COLORS.textPrimary} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bgApp,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
  },
  leftBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontFamily: FONTS.sans,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.sentimentBullish,
    marginLeft: 4,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    gap: 5,
  },
  statusPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.borderActive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }],
  },
  unreadDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.sentimentBearish,
    borderWidth: 1.5,
    borderColor: COLORS.surfaceCard,
  },
});
