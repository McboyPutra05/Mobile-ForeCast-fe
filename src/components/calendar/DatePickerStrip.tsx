import React from 'react';
import { View, ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';

export interface DateItem {
  dayName: string;
  dayNum: string;
  isToday?: boolean;
}

interface DatePickerStripProps {
  dates: DateItem[];
  selectedDate: string;
  onSelectDate: (dateNum: string) => void;
}

export const DatePickerStrip: React.FC<DatePickerStripProps> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <View style={styles.dateStripWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateStrip}
      >
        {dates.map((d) => {
          const isSelected = selectedDate === d.dayNum;
          return (
            <Pressable
              key={d.dayNum}
              style={({ pressed }) => [
                styles.datePill,
                isSelected ? styles.datePillActive : styles.datePillInactive,
                pressed && { opacity: 0.8 },
              ]}
              onPress={() => onSelectDate(d.dayNum)}
              accessibilityRole="button"
              accessibilityLabel={`${d.dayName} ${d.dayNum}`}
              accessibilityState={{ selected: isSelected }}
              hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
            >
              <Text
                style={[
                  styles.dayName,
                  isSelected ? styles.dayNameActive : styles.dayNameInactive,
                ]}
              >
                {d.dayName}
              </Text>
              <Text
                style={[
                  styles.dayNum,
                  isSelected ? styles.dayNumActive : styles.dayNumInactive,
                ]}
              >
                {d.dayNum}
              </Text>
              {d.isToday && (
                <View
                  style={[
                    styles.todayDot,
                    isSelected ? styles.todayDotActive : styles.todayDotInactive,
                  ]}
                />
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dateStripWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.bgApp,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
  },
  dateStrip: {
    gap: 8,
    alignItems: 'center',
  },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
  },
  datePillInactive: {
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },
  datePillActive: {
    backgroundColor: COLORS.sentimentBullish,
    borderWidth: 1,
    borderColor: COLORS.sentimentBullish,
    shadowColor: COLORS.sentimentBullish,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 3,
  },
  dayName: {
    fontFamily: FONTS.sans,
    fontSize: 12,
  },
  dayNameInactive: {
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  dayNameActive: {
    color: '#003824',
    fontWeight: '700',
  },
  dayNum: {
    fontFamily: FONTS.mono,
    fontSize: 13,
  },
  dayNumInactive: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  dayNumActive: {
    color: '#003824',
    fontWeight: '700',
  },
  todayDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginLeft: 1,
  },
  todayDotInactive: {
    backgroundColor: COLORS.sentimentBullish,
  },
  todayDotActive: {
    backgroundColor: '#003824',
  },
});
