import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Bell, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { FONTS } from '../../constants/typography';
import { ROUTES } from '../../routes/routeNames';
import { useMarketStore } from '../../store/useMarketStore';
import { useUIStore, useThemeColors } from '../../store/useUIStore';

interface TopAppBarProps {
  title?: string;
  hasUnreadNotifications?: boolean;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title = 'ForeCastFX',
  hasUnreadNotifications,
  onNotificationPress,
  onProfilePress,
}) => {
  const navigation = useNavigation<any>();
  const colors = useThemeColors();
  const isLiveConnected = useMarketStore((s) => s.isLiveConnected);
  const unreadCount = useUIStore((s) => s.unreadNotificationsCount);
  const setProfileDrawerOpen = useUIStore((s) => s.setProfileDrawerOpen);

  const showUnread = hasUnreadNotifications ?? unreadCount > 0;

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
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
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bgApp,
          borderBottomColor: colors.borderSubtle,
        },
      ]}
    >
      <View style={styles.leftBrand}>
        <Text style={[styles.brandTitle, { color: colors.textPrimary }]} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.rightActions}>
        {!isLiveConnected && (
          <View
            style={[
              styles.reconnectTag,
              {
                backgroundColor: colors.alertWarningSubtle,
                borderColor: colors.alertWarningBorder,
              },
            ]}
          >
            <Text style={[styles.reconnectText, { color: colors.alertWarning }]}>RECONNECTING</Text>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.borderSubtle,
            },
            pressed && styles.iconButtonPressed,
          ]}
          onPress={handleNotificationPress}
          accessibilityRole="button"
          accessibilityLabel={showUnread ? 'Notifications, unread items available' : 'Notifications'}
        >
          <Bell size={18} color={colors.textPrimary} strokeWidth={1.8} />
          {showUnread && (
            <View
              style={[
                styles.unreadDot,
                {
                  backgroundColor: colors.sentimentBearish,
                  borderColor: colors.bgApp,
                },
              ]}
            />
          )}
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.profileAvatar,
            {
              backgroundColor: colors.accentNavy,
              borderColor: colors.borderStrong,
            },
            pressed && styles.iconButtonPressed,
          ]}
          onPress={handleProfilePress}
          accessibilityRole="button"
          accessibilityLabel="Open account profile drawer"
        >
          <User size={18} color={colors.textInverse} strokeWidth={1.8} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 58,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  leftBrand: {
    flex: 1,
    paddingRight: 12,
  },
  brandTitle: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reconnectTag: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
  },
  reconnectText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPressed: {
    opacity: 0.78,
  },
  unreadDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
  },
});
