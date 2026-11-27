import React from 'react';
import { View, ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';

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
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.dateStripWrapper,
        {
          backgroundColor: colors.bgApp,
          borderBottomColor: colors.borderSubtle,
        },
      ]}
    >
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
                isSelected
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
              onPress={() => onSelectDate(d.dayNum)}
              accessibilityRole="button"
              accessibilityLabel={`${d.dayName} ${d.dayNum}${d.isToday ? ', today' : ''}`}
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[
                  styles.dayName,
                  { color: isSelected ? colors.textInverse : colors.textSecondary },
                ]}
              >
                {d.dayName}
              </Text>
              <Text
                style={[
                  styles.dayNum,
                  { color: isSelected ? colors.textInverse : colors.textPrimary },
                ]}
              >
                {d.dayNum}
              </Text>
              {d.isToday && (
                <View
                  style={[
                    styles.todayMarker,
                    {
                      backgroundColor: isSelected ? colors.textInverse : colors.sentimentBullish,
                    },
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
    borderBottomWidth: 1,
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
    minHeight: 44,
    borderRadius: 4,
    borderWidth: 1,
  },
  dayName: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '500',
  },
  dayNum: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    fontWeight: '700',
    ...TABULAR_NUMS,
  },
  todayMarker: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
});
