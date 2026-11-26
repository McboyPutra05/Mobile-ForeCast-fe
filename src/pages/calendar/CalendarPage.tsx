import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { TopAppBar } from '../../components/common/TopAppBar';
import { BottomSheetWrapper } from '../../components/common/BottomSheetWrapper';
import {
  CalendarEventRowCard,
  DatePickerStrip,
  DateItem,
} from '../../components/calendar';
import { Badge } from '../../components/common/Badge';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { ROUTES } from '../../routes/routeNames';
import { CalendarEvent, ImpactLevel } from '../../types';
import { MOCK_CALENDAR_EVENTS } from '../../api/calendar.api';

const DATES_STRIP: DateItem[] = [
  { dayName: 'Mon', dayNum: '28' },
  { dayName: 'Tue', dayNum: '29' },
  { dayName: 'Wed', dayNum: '30', isToday: true },
  { dayName: 'Thu', dayNum: '31' },
  { dayName: 'Fri', dayNum: '01' },
];

export const CalendarPage = ({ navigation }: any) => {
  const [selectedDate, setSelectedDate] = useState('30');
  const [activeImpact, setActiveImpact] = useState<ImpactLevel>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const filteredEvents = MOCK_CALENDAR_EVENTS.filter((item) => {
    if (activeImpact === 'ALL') return true;
    return item.impact === activeImpact;
  });

  const navigateToNotification = () => {
    navigation.getParent()?.navigate(ROUTES.NOTIFICATION) ?? navigation.navigate(ROUTES.NOTIFICATION);
  };

  const navigateToSettings = () => {
    navigation.getParent()?.navigate(ROUTES.SETTINGS) ?? navigation.navigate(ROUTES.SETTINGS);
  };

  return (
    <SafeScreenWrapper edges={['top']}>
      <TopAppBar
        title="ForeCastFX"
        onNotificationPress={navigateToNotification}
        onProfilePress={navigateToSettings}
      />

      <View style={styles.container}>
        {/* Modular Feature 1: Horizontal Date Picker Strip */}
        <DatePickerStrip
          dates={DATES_STRIP}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Modular Feature 2: Benchmark Filter Impact Chips Bar */}
        <View style={styles.filterBar}>
          {/* ALL IMPACT */}
          <Pressable
            style={({ pressed }) => [
              styles.filterChip,
              activeImpact === 'ALL' && styles.filterChipAllActive,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => setActiveImpact('ALL')}
            accessibilityRole="button"
            accessibilityLabel="Filter all events"
          >
            <Text
              style={[
                styles.filterText,
                activeImpact === 'ALL' && styles.filterTextAllActive,
              ]}
            >
              All Impact
            </Text>
          </Pressable>

          {/* HIGH IMPACT ONLY with red glowing dot */}
          <Pressable
            style={({ pressed }) => [
              styles.filterChip,
              activeImpact === 'HIGH' ? styles.filterChipHighActive : styles.filterChipInactive,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => setActiveImpact('HIGH')}
            accessibilityRole="button"
            accessibilityLabel="Filter high impact only"
          >
            <View style={styles.highImpactDot} />
            <Text
              style={[
                styles.filterText,
                activeImpact === 'HIGH' ? styles.filterTextHighActive : styles.filterTextHighInactive,
              ]}
            >
              High Impact Only
            </Text>
          </Pressable>

          {/* MEDIUM & HIGH */}
          <Pressable
            style={({ pressed }) => [
              styles.filterChip,
              activeImpact === 'MEDIUM' ? styles.filterChipMedActive : styles.filterChipInactive,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => setActiveImpact('MEDIUM')}
            accessibilityRole="button"
            accessibilityLabel="Filter medium and high"
          >
            <Text
              style={[
                styles.filterText,
                activeImpact === 'MEDIUM' && styles.filterTextMedActive,
              ]}
            >
              Medium & High
            </Text>
          </Pressable>
        </View>

        {/* Modular Feature 3: Compact Schedule Event List */}
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CalendarEventRowCard
              item={item}
              onPress={() => setSelectedEvent(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Leading Indicators / Event Detail Sheet */}
      <BottomSheetWrapper
        visible={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.event_name || 'Event Detail'}
        subtitle={`Release: ${selectedEvent?.release_time || ''} | Country: ${selectedEvent?.country || ''}`}
      >
        {selectedEvent && (
          <View style={styles.detailSheetContent}>
            <View style={styles.detailMetaRow}>
              <View style={styles.detailMetaItem}>
                <Text style={styles.detailMetaLabel}>IMPACT LEVEL</Text>
                <Badge
                  label={selectedEvent.impact}
                  variant={selectedEvent.impact === 'HIGH' ? 'bearish' : 'neutral'}
                  size="sm"
                />
              </View>
              {selectedEvent.has_prediction && selectedEvent.predicted_bias && (
                <View style={styles.detailMetaItem}>
                  <Text style={styles.detailMetaLabel}>PREDICTED BIAS</Text>
                  <Badge
                    label={selectedEvent.predicted_bias}
                    variant={selectedEvent.predicted_bias === 'GOOD FOR USD' ? 'bullish' : 'bearish'}
                    size="sm"
                  />
                </View>
              )}
            </View>

            <View style={styles.metricsComparisonCard}>
              <View style={styles.metricsRow}>
                <View style={styles.metricBlock}>
                  <Text style={styles.metricBlockLabel}>PREVIOUS</Text>
                  <Text style={styles.metricBlockVal}>{selectedEvent.previous || 'N/A'}</Text>
                </View>
                <View style={styles.metricBlock}>
                  <Text style={styles.metricBlockLabel}>FORECAST</Text>
                  <Text style={styles.metricBlockVal}>{selectedEvent.forecast || 'N/A'}</Text>
                </View>
                <View style={styles.metricBlock}>
                  <Text style={styles.metricBlockLabel}>ACTUAL</Text>
                  <Text
                    style={[
                      styles.metricBlockVal,
                      selectedEvent.actual ? { color: COLORS.sentimentBullish } : { color: COLORS.textMuted },
                    ]}
                  >
                    {selectedEvent.actual || 'Pending'}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.correlationNoteTitle}>AI Engine Correlation Analysis</Text>
            <Text style={styles.correlationNoteText}>
              Data event ini diintegrasikan ke dalam pipeline Z-Score kuantitatif ForeCastFX untuk mengukur deviasi konsensus makro terhadap volatilitas aset forex.
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
    backgroundColor: COLORS.bgApp,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
    backgroundColor: COLORS.bgApp,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 6,
    minHeight: 32,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },
  filterChipInactive: {
    backgroundColor: COLORS.surfaceCard,
    borderColor: COLORS.borderSubtle,
  },
  filterChipAllActive: {
    backgroundColor: COLORS.surfaceElevated,
    borderColor: COLORS.borderHighlight,
  },
  filterChipHighActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.35)',
  },
  filterChipMedActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  highImpactDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  filterText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterTextAllActive: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  filterTextHighActive: {
    color: '#EF4444',
    fontWeight: '600',
  },
  filterTextHighInactive: {
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterTextMedActive: {
    color: '#F59E0B',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
    gap: 10,
  },
  detailSheetContent: {
    paddingVertical: 8,
    gap: 14,
  },
  detailMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  detailMetaItem: {
    gap: 4,
  },
  detailMetaLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  metricsComparisonCard: {
    backgroundColor: COLORS.surfaceSecondary,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 12,
    padding: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBlock: {
    alignItems: 'center',
    flex: 1,
  },
  metricBlockLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textMuted,
  },
  metricBlockVal: {
    fontFamily: FONTS.mono,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  correlationNoteTitle: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  correlationNoteText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },
});
