import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { TopAppBar } from '../../components/common/TopAppBar';
import { HistoryKpiCard, VerificationLogCard } from '../../components/history';
import { FONTS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { HistoryLogItem } from '../../types';
import { historyApi, MOCK_HISTORY_ACCURACY } from '../../api/history.api';

type StatusFilter = 'ALL' | 'HIT' | 'MISS';

export const HistoryPage = () => {
  const colors = useThemeColors();
  const [expandedLogId, setExpandedLogId] = useState<string | null>('hist_091');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const { data: historyRes, isLoading, isError, refetch } = useQuery({
    queryKey: ['history', 'accuracy'],
    queryFn: historyApi.getAccuracy,
    staleTime: 60000,
  });

  const payload = historyRes?.data || MOCK_HISTORY_ACCURACY;
  const { summary_kpi, breakdown_by_event, logs } = payload;

  const filteredLogs = logs.filter((log) => {
    if (statusFilter === 'ALL') return true;
    return log.status === statusFilter;
  });

  const toggleExpand = (logId: string) => {
    setExpandedLogId((prev) => (prev === logId ? null : logId));
  };

  return (
    <SafeScreenWrapper edges={['top']}>
      <TopAppBar title="Prediction Accuracy" />

      <ScrollView
        style={[styles.container, { backgroundColor: colors.bgApp }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {isLoading && !historyRes ? (
          <View style={styles.stateCenter}>
            <ActivityIndicator size="small" color={colors.accentNavy} />
            <Text style={[styles.stateText, { color: colors.textSecondary }]}>
              Loading historical verification logs...
            </Text>
          </View>
        ) : isError && !historyRes ? (
          <View style={styles.stateCenter}>
            <Text style={[styles.stateTitle, { color: colors.textPrimary }]}>
              Unable to load accuracy logs
            </Text>
            <Pressable
              onPress={() => refetch()}
              style={[styles.retryButton, { backgroundColor: colors.accentNavy }]}
              accessibilityRole="button"
              accessibilityLabel="Retry loading accuracy logs"
            >
              <Text style={[styles.retryText, { color: colors.textInverse }]}>Retry</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <HistoryKpiCard summaryKpi={summary_kpi} breakdownByEvent={breakdown_by_event} />

            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                Verification Logs
              </Text>
              <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
                PAST {summary_kpi.total_events_analyzed} RELEASES
              </Text>
            </View>

            <View style={styles.filterRow}>
              {(['ALL', 'HIT', 'MISS'] as StatusFilter[]).map((mode) => {
                const active = statusFilter === mode;
                const label =
                  mode === 'ALL'
                    ? `All (${logs.length})`
                    : mode === 'HIT'
                      ? `Hits (${logs.filter((l) => l.status === 'HIT').length})`
                      : `Misses (${logs.filter((l) => l.status === 'MISS').length})`;

                return (
                  <Pressable
                    key={mode}
                    style={[
                      styles.filterChip,
                      active
                        ? {
                            backgroundColor: colors.accentNavy,
                            borderColor: colors.accentNavy,
                          }
                        : {
                            backgroundColor: colors.surfaceCard,
                            borderColor: colors.borderSubtle,
                          },
                    ]}
                    onPress={() => setStatusFilter(mode)}
                    accessibilityRole="button"
                    accessibilityLabel={`Filter logs by ${label}`}
                    accessibilityState={{ selected: active }}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        { color: active ? colors.textInverse : colors.textSecondary },
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {filteredLogs.length === 0 ? (
              <View style={styles.stateCenter}>
                <Text style={[styles.stateTitle, { color: colors.textPrimary }]}>
                  No verification logs match this filter
                </Text>
              </View>
            ) : (
              filteredLogs.map((item: HistoryLogItem) => (
                <VerificationLogCard
                  key={item.log_id}
                  item={item}
                  isExpanded={expandedLogId === item.log_id}
                  onToggleExpand={() => toggleExpand(item.log_id)}
                />
              ))
            )}
          </>
        )}
      </ScrollView>
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 96,
    gap: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: '700',
  },
  sectionSub: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    minHeight: 40,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
  },
  filterText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
  },
  stateCenter: {
    paddingVertical: 40,
    alignItems: 'center',
    gap: 8,
  },
  stateTitle: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: '700',
  },
  stateText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
  },
  retryButton: {
    marginTop: 8,
    paddingHorizontal: 18,
    minHeight: 44,
    borderRadius: 4,
    justifyContent: 'center',
  },
  retryText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
  },
});
