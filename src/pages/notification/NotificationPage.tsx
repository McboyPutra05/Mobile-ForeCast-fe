import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { ArrowLeft, AlertTriangle, Zap, TrendingUp } from 'lucide-react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'EVENT_ALERT' | 'HIGH_VOLATILITY' | 'SYSTEM';
  isUnread?: boolean;
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'High-Alert Mode Activated: US CPI in 45m',
    description:
      'Dynamic Redis TTL switched to 3-second rapid polling. Volatility bands expanding on XAUUSD.',
    time: '45m ago',
    type: 'HIGH_VOLATILITY',
    isUnread: true,
  },
  {
    id: 'n2',
    title: 'Data Release: ISM Manufacturing Prices Paid',
    description:
      'Actual: 55.4 vs Prev 52.8. Hawkish bias validated for upcoming CPI release.',
    time: '2h ago',
    type: 'EVENT_ALERT',
    isUnread: true,
  },
  {
    id: 'n3',
    title: 'Intermarket Divergence Alert (USOIL)',
    description:
      'WTI Crude Oil surged +1.91% today, exceeding the upper volatility barrier.',
    time: '5h ago',
    type: 'EVENT_ALERT',
    isUnread: false,
  },
  {
    id: 'n4',
    title: 'Accuracy Model Update: 82.0% Overall Win Rate',
    description:
      '50 institutional macro events evaluated with 41 accurate hits.',
    time: '1d ago',
    type: 'SYSTEM',
    isUnread: false,
  },
];

export const NotificationPage = ({ navigation }: any) => {
  const renderItem = ({ item }: { item: NotificationItem }) => {
    return (
      <View style={[styles.itemContainer, item.isUnread && styles.itemUnread]}>
        <View style={styles.iconCircle}>
          {item.type === 'HIGH_VOLATILITY' ? (
            <AlertTriangle size={18} color={COLORS.alertWarning} />
          ) : item.type === 'EVENT_ALERT' ? (
            <Zap size={18} color={COLORS.sentimentBullish} />
          ) : (
            <TrendingUp size={18} color={COLORS.alertInfo} />
          )}
        </View>

        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            {item.isUnread && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Text style={styles.itemTime}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeScreenWrapper edges={['top']}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Back to previous page"
        >
          <ArrowLeft size={22} color={COLORS.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: COLORS.bgApp,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
  },
  backButton: {
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
  listContent: {
    paddingVertical: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
    gap: 14,
  },
  itemUnread: {
    backgroundColor: 'rgba(21, 26, 35, 0.4)',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.sentimentBearish,
    marginLeft: 8,
  },
  itemDescription: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  itemTime: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});

