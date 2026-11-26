import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart3 } from 'lucide-react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { TopAppBar } from '../../components/common/TopAppBar';
import { HistoryKpiCard, VerificationLogCard } from '../../components/history';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { HistoryLogItem } from '../../types';
import { MOCK_HISTORY_ACCURACY } from '../../api/history.api';

export const HistoryPage = ({ navigation }: any) => {
  const [expandedLogId, setExpandedLogId] = useState<string | null>('hist_091');

  const { summary_kpi, breakdown_by_event, logs } = MOCK_HISTORY_ACCURACY;

  const toggleExpand = (logId: string) => {
    setExpandedLogId((prev) => (prev === logId ? null : logId));
  };

  return (
    <SafeScreenWrapper edges={['top']}>
      <TopAppBar
        title="Accuracy & Backtest"
        onNotificationPress={() => navigation.navigate('Notification')}
        onProfilePress={() => navigation.navigate('Settings')}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Modular Feature 1: Header KPI Strip */}
        <HistoryKpiCard
          summaryKpi={summary_kpi}
          breakdownByEvent={breakdown_by_event}
        />

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <BarChart3 size={16} color={COLORS.sentimentBullish} />
            <Text style={styles.sectionTitle}>Verification Logs (Hit / Miss)</Text>
          </View>
          <Text style={styles.sectionSub}>Last 50 Major Releases</Text>
        </View>

        {/* Modular Feature 2: Verification Log Cards with Expandable Accordion */}
        {logs.map((item: HistoryLogItem) => (
          <VerificationLogCard
            key={item.log_id}
            item={item}
            isExpanded={expandedLogId === item.log_id}
            onToggleExpand={() => toggleExpand(item.log_id)}
          />
        ))}
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
    paddingBottom: 100,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  sectionSub: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});

