import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { ChevronLeft, AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors, useUIStore } from '../../store/useUIStore';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'EVENT_ALERT' | 'HIGH_VOLATILITY' | 'SYSTEM';
  isUnread?: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'High-Alert Window: US CPI in 45m',
    description:
      'Dynamic Redis TTL switched to rapid polling. Volatility bands expanding on DXY and XAUUSD.',
    time: '45m ago',
    type: 'HIGH_VOLATILITY',
    isUnread: true,
  },
  {
    id: 'n2',
    title: 'Leading Indicator: ISM Manufacturing Prices Paid',
    description:
      'Actual 55.4 vs Prev 52.8. Hawkish input pressure logged for the upcoming CPI briefing.',
    time: '2h ago',
    type: 'EVENT_ALERT',
    isUnread: true,
  },
  {
    id: 'n3',
    title: 'Intermarket Move: WTI Crude Oil +1.91%',
    description:
      'USOIL moved above $77.10, reinforcing headline inflation weight (35%).',
    time: '5h ago',
    type: 'EVENT_ALERT',
    isUnread: false,
  },
  {
    id: 'n4',
    title: 'Accuracy Audit: 82.0% Overall Win Rate',
    description: '50 historical macro releases evaluated with 41 accurate directional hits.',
    time: '1d ago',
    type: 'SYSTEM',
    isUnread: false,
  },
];

export const NotificationPage = ({ navigation }: any) => {
  const colors = useThemeColors();
  const setUnreadNotificationsCount = useUIStore((s) => s.setUnreadNotificationsCount);
  const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const handleItemPress = (id: string) => {
    setItems((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n));
      setUnreadNotificationsCount(updated.filter((n) => n.isUnread).length);
      return updated;
    });
  };

  const renderItem = ({ item }: { item: NotificationItem }) => {
    const iconColor =
      item.type === 'HIGH_VOLATILITY'
        ? colors.alertWarning
        : item.type === 'EVENT_ALERT'
          ? colors.sentimentBullish
          : colors.accentNavy;

    const iconBg =
      item.type === 'HIGH_VOLATILITY'
        ? colors.alertWarningSubtle
        : item.type === 'EVENT_ALERT'
          ? colors.sentimentBullishSubtle
          : colors.surfaceCard;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.itemContainer,
          {
            borderBottomColor: colors.borderSubtle,
            backgroundColor: item.isUnread
              ? colors.surfaceCard
              : pressed
                ? colors.surfaceCard
                : colors.bgApp,
          },
        ]}
        onPress={() => handleItemPress(item.id)}
        accessibilityRole="button"
        accessibilityLabel={`${item.title}, ${item.isUnread ? 'unread' : 'read'}`}
      >
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: iconBg,
              borderColor: colors.borderSubtle,
            },
          ]}
        >
          {item.type === 'HIGH_VOLATILITY' ? (
            <AlertTriangle size={17} color={iconColor} />
          ) : item.type === 'EVENT_ALERT' ? (
            <TrendingUp size={17} color={iconColor} />
          ) : (
            <CheckCircle2 size={17} color={iconColor} />
          )}
        </View>

        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.itemTitle, { color: colors.textPrimary }]}>{item.title}</Text>
            {item.isUnread && (
              <View style={[styles.unreadDot, { backgroundColor: colors.sentimentBearish }]} />
            )}
          </View>
          <Text style={[styles.itemDescription, { color: colors.textSecondary }]}>
            {item.description}
          </Text>
          <Text style={[styles.itemTime, { color: colors.textMuted }]}>{item.time}</Text>
        </View>
      </Pressable>
    );
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
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <ChevronLeft size={22} color={colors.textPrimary} />
          <Text style={[styles.backText, { color: colors.textPrimary }]}>Back</Text>
        </Pressable>

        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Notifications</Text>

        {/* Intentionally empty right slot per editorial Strava-style Notification UX */}
        <View style={styles.headerRightSpacer} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
              No notifications yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              High-impact event windows and accuracy logs will appear here.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 72,
    minHeight: 44,
    gap: 2,
  },
  backText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    fontFamily: FONTS.serif,
    fontSize: 19,
    fontWeight: '700',
  },
  headerRightSpacer: {
    minWidth: 72,
  },
  listContent: {
    paddingBottom: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    gap: 14,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  itemTitle: {
    fontFamily: FONTS.serif,
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemDescription: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 19,
  },
  itemTime: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    marginTop: 2,
    ...TABULAR_NUMS,
  },
  emptyState: {
    paddingHorizontal: 24,
    paddingVertical: 64,
    alignItems: 'center',
    gap: 6,
  },
  emptyTitle: {
    fontFamily: FONTS.serif,
    fontSize: 17,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
});
