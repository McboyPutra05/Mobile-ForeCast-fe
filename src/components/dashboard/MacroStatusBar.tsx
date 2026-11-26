import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';

interface MacroStatusBarProps {
  eventName?: string;
  countdownText?: string;
}

export const MacroStatusBar: React.FC<MacroStatusBarProps> = ({
  eventName = 'US CPI',
  countdownText = '1h 18m',
}) => {
  return (
    <View style={styles.statusBar}>
      <View style={styles.statusLeft}>
        <View style={styles.pulseDot} />
        <Text style={styles.statusLabel}>LIVE MACRO ENGINE</Text>
      </View>
      <View style={styles.statusRight}>
        <Clock size={13} color={COLORS.alertWarning} />
        <Text style={styles.statusTimerText}>
          {eventName} in{' '}
          <Text style={styles.timerHighlight}>
            {countdownText}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.sentimentBullish,
  },
  statusLabel: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.sentimentBullish,
    letterSpacing: 0.6,
  },
  statusRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusTimerText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  timerHighlight: {
    fontFamily: FONTS.mono,
    color: COLORS.alertWarning,
    fontWeight: '700',
  },
});


