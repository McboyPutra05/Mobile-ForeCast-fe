import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Clock } from 'lucide-react-native';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { formatSecondsToCountdown } from '../../utils/date';

interface CountdownTimerProps {
  initialSeconds?: number;
  onExpire?: () => void;
  style?: ViewStyle;
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds = 4716,
  onExpire,
  style,
  compact = false,
}) => {
  const colors = useThemeColors();
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    setRemaining(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire?.();
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining, onExpire]);

  const countdown = formatSecondsToCountdown(remaining);
  const isHighAlert = remaining > 0 && remaining <= 900;
  const accent = isHighAlert ? colors.alertWarning : colors.textPrimary;

  return (
    <View
      style={[
        styles.container,
        !compact && {
          backgroundColor: isHighAlert ? colors.alertWarningSubtle : colors.surfaceCard,
          borderWidth: 1,
          borderColor: isHighAlert ? colors.alertWarningBorder : colors.borderSubtle,
        },
        style,
      ]}
    >
      <Clock size={12} color={isHighAlert ? colors.alertWarning : colors.textSecondary} />
      <Text style={[styles.timerText, { color: accent }]}>{countdown.formatted}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexShrink: 0,
  },
  timerText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: -0.2,
    ...TABULAR_NUMS,
  },
});
