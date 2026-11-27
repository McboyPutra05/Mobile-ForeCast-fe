import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors, useUIStore } from '../../store/useUIStore';

interface MacroStatusBarProps {
  eventName?: string;
  countdownText?: string;
}

export const MacroStatusBar: React.FC<MacroStatusBarProps> = ({
  eventName = 'US CPI',
  countdownText = '01h : 18m : 36s',
}) => {
  const colors = useThemeColors();
  const isHighAlertMode = useUIStore((s) => s.isHighAlertMode);

  return (
    <View
      style={[
        styles.statusBar,
        {
          borderTopColor: colors.borderSubtle,
          borderBottomColor: colors.borderSubtle,
          backgroundColor: isHighAlertMode ? colors.alertWarningSubtle : colors.bgApp,
        },
      ]}
    >
      <Text style={[styles.deskLabel, { color: colors.textSecondary }]} numberOfLines={1}>
        US MACRO DESK • WIB (UTC+7)
      </Text>
      <Text
        style={[
          styles.releaseText,
          { color: isHighAlertMode ? colors.alertWarning : colors.textPrimary },
        ]}
        numberOfLines={1}
      >
        {eventName} in {countdownText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    gap: 8,
  },
  deskLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    flexShrink: 1,
  },
  releaseText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
    ...TABULAR_NUMS,
  },
});
