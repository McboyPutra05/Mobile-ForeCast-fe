import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { TopAppBar } from '../../components/common/TopAppBar';
import { BottomSheetWrapper } from '../../components/common/BottomSheetWrapper';
import {
  CalendarEventRowCard,
  DatePickerStrip,
  DateItem,
} from '../../components/calendar';
import { Badge } from '../../components/common/Badge';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { CalendarEvent, ImpactLevel } from '../../types';
import { calendarApi, MOCK_CALENDAR_EVENTS } from '../../api/calendar.api';

const DATES_STRIP: DateItem[] = [
  { dayName: 'Mon', dayNum: '28' },
  { dayName: 'Tue', dayNum: '29' },
  { dayName: 'Wed', dayNum: '30', isToday: true },
  { dayName: 'Thu', dayNum: '31' },
  { dayName: 'Fri', dayNum: '01' },
];

type CalendarFilterMode = 'ALL' | 'HIGH' | 'MED_HIGH';

export const CalendarPage = () => {
  const colors = useThemeColors();
  const [selectedDate, setSelectedDate] = useState('30');
  const [activeFilter, setActiveFilter] = useState<CalendarFilterMode>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const apiImpact: ImpactLevel = activeFilter === 'HIGH' ? 'HIGH' : 'ALL';

  const { data: calendarRes, isLoading, isError, refetch } = useQuery({
    queryKey: ['calendar', 'events', selectedDate, apiImpact],
    queryFn: () => calendarApi.getEvents({ impact: apiImpact }),
    staleTime: 30000,
  });

  const events = calendarRes?.data || MOCK_CALENDAR_EVENTS;

  const filteredEvents = events.filter((item) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'HIGH') return item.impact === 'HIGH';
    return item.impact === 'HIGH' || item.impact === 'MEDIUM';
  });

  const renderFilterChip = (mode: CalendarFilterMode, label: string) => {
    const isActive = activeFilter === mode;
    return (
      <Pressable
        key={mode}
        style={({ pressed }) => [
          styles.filterChip,
          isActive
            ? {
                backgroundColor: colors.accentNavy,
                borderColor: colors.accentNavy,
              }
            : {
                backgroundColor: colors.surfaceCard,
                borderColor: colors.borderSubtle,
              },
          pressed && { opacity: 0.84 },
        ]}
        onPress={() => setActiveFilter(mode)}
        accessibilityRole="button"
        accessibilityLabel={`Filter calendar by ${label}`}
        accessibilityState={{ selected: isActive }}
      >
        <Text
          style={[
            styles.filterText,
            { color: isActive ? colors.textInverse : colors.textSecondary },
          ]}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeScreenWrapper edges={['top']}>
      <TopAppBar title="Economic Calendar" />

      <View style={[styles.container, { backgroundColor: colors.bgApp }]}>
        <DatePickerStrip
          dates={DATES_STRIP}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        <View
          style={[
            styles.filterBar,
            {
              backgroundColor: colors.bgApp,
              borderBottomColor: colors.borderSubtle,
            },
          ]}
        >
          {renderFilterChip('ALL', 'All Impact')}
          {renderFilterChip('HIGH', 'High Impact Only')}
          {renderFilterChip('MED_HIGH', 'Medium & High')}
        </View>

        {isLoading && !calendarRes ? (
          <View style={styles.stateCenter}>
            <ActivityIndicator size="small" color={colors.accentNavy} />
            <Text style={[styles.stateText, { color: colors.textSecondary }]}>
              Loading US macro schedule...
            </Text>
          </View>
        ) : isError && !calendarRes ? (
          <View style={styles.stateCenter}>
            <Text style={[styles.stateTitle, { color: colors.textPrimary }]}>
              Unable to load calendar events
            </Text>
            <Text style={[styles.stateText, { color: colors.textSecondary }]}>
              Check your network connection and try refreshing.
            </Text>
            <Pressable
              onPress={() => refetch()}
              style={[styles.retryButton, { backgroundColor: colors.accentNavy }]}
              accessibilityRole="button"
              accessibilityLabel="Retry loading calendar"
            >
              <Text style={[styles.retryText, { color: colors.textInverse }]}>Retry</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={filteredEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CalendarEventRowCard item={item} onPress={() => setSelectedEvent(item)} />
            )}
            ListEmptyComponent={
              <View style={styles.stateCenter}>
                <Text style={[styles.stateTitle, { color: colors.textPrimary }]}>
                  No events match this filter
                </Text>
                <Text style={[styles.stateText, { color: colors.textSecondary }]}>
                  Switch to All Impact to view every scheduled US macro release.
                </Text>
              </View>
            }
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <BottomSheetWrapper
        visible={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.event_name || 'Event Detail'}
        subtitle={`${selectedEvent?.country || 'USD'} • ${selectedEvent?.impact || 'HIGH'} IMPACT`}
      >
        {selectedEvent && (
          <View style={styles.detailSheetContent}>
            <View style={styles.detailMetaRow}>
              <View style={styles.detailMetaItem}>
                <Text style={[styles.detailMetaLabel, { color: colors.textMuted }]}>
                  IMPACT LEVEL
                </Text>
                <Badge
                  label={selectedEvent.impact}
                  variant={
                    selectedEvent.impact === 'HIGH'
                      ? 'bearish'
                      : selectedEvent.impact === 'MEDIUM'
                        ? 'warning'
                        : 'neutral'
                  }
                  size="sm"
                />
              </View>

              {selectedEvent.has_prediction && selectedEvent.predicted_bias && (
                <View style={styles.detailMetaItem}>
                  <Text style={[styles.detailMetaLabel, { color: colors.textMuted }]}>
                    FORECASTFX BIAS
                  </Text>
                  <Badge
                    label={selectedEvent.predicted_bias}
                    variant={
                      selectedEvent.predicted_bias === 'GOOD FOR USD' ? 'bullish' : 'bearish'
                    }
                    size="sm"
                  />
                </View>
              )}
            </View>

            <View
              style={[
                styles.metricsComparisonCard,
                {
                  backgroundColor: colors.surfaceCard,
                  borderColor: colors.borderSubtle,
                },
              ]}
            >
              <View style={styles.metricsRow}>
                <View style={styles.metricBlock}>
                  <Text style={[styles.metricBlockLabel, { color: colors.textMuted }]}>
                    PREVIOUS
                  </Text>
                  <Text style={[styles.metricBlockVal, { color: colors.textSecondary }]}>
                    {selectedEvent.previous || 'N/A'}
                  </Text>
                </View>
                <View style={styles.metricBlock}>
                  <Text style={[styles.metricBlockLabel, { color: colors.textMuted }]}>
                    FORECAST
                  </Text>
                  <Text style={[styles.metricBlockVal, { color: colors.textPrimary }]}>
                    {selectedEvent.forecast || 'N/A'}
                  </Text>
                </View>
                <View style={styles.metricBlock}>
                  <Text style={[styles.metricBlockLabel, { color: colors.textMuted }]}>
                    ACTUAL
                  </Text>
                  <Text
                    style={[
                      styles.metricBlockVal,
                      {
                        color: selectedEvent.actual
                          ? colors.sentimentBullish
                          : colors.textMuted,
                      },
                    ]}
                  >
                    {selectedEvent.actual || 'Pending'}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={[styles.correlationNoteTitle, { color: colors.textPrimary }]}>
              Model Integration Note
            </Text>
            <Text style={[styles.correlationNoteText, { color: colors.textSecondary }]}>
              Scheduled US releases are ingested into the normalized Z-Score pipeline to track consensus surprise and cross-asset volatility across DXY and XAUUSD.
            </Text>
          </View>
        )}
      </BottomSheetWrapper>
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: 12,
    minHeight: 40,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 96,
  },
  stateCenter: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    alignItems: 'center',
    gap: 8,
  },
  stateTitle: {
    fontFamily: FONTS.serif,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  stateText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
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
  detailSheetContent: {
    paddingVertical: 6,
    gap: 14,
  },
  detailMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
  },
  detailMetaItem: {
    gap: 5,
  },
  detailMetaLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  metricsComparisonCard: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBlock: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  metricBlockLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
  },
  metricBlockVal: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    fontWeight: '700',
    ...TABULAR_NUMS,
  },
  correlationNoteTitle: {
    fontFamily: FONTS.serif,
    fontSize: 15,
    fontWeight: '700',
  },
  correlationNoteText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 19,
  },
});
