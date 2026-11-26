import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { formatSecondsToCountdown } from '../../utils/date';

interface CountdownTimerProps {
  initialSeconds?: number;
  onExpire?: () => void;
  style?: object;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds = 4716, // Default 1h 18m 36s
  onExpire,
  style,
}) => {
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

  return (
    <View style={[styles.container, style]}>
      <Clock size={12} color={COLORS.alertWarning} />
      <Text style={styles.timerText}>{countdown.formatted}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 999,
    flexShrink: 0,
  },
  timerText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.alertWarning,
    letterSpacing: -0.2,
  },
});
