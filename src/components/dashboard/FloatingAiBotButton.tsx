import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MessageSquare, X } from 'lucide-react-native';
import { FONTS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';

interface FloatingAiBotButtonProps {
  onPress: () => void;
  promptHint?: string;
}

export const FloatingAiBotButton: React.FC<FloatingAiBotButtonProps> = ({
  onPress,
  promptHint = 'Ada yang bisa aku bantu?',
}) => {
  const colors = useThemeColors();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.row}>
        {showTooltip && (
          <View
            style={[
              styles.speechTag,
              {
                backgroundColor: colors.bgApp,
                borderColor: colors.borderSubtle,
              },
            ]}
          >
            <Pressable
              onPress={onPress}
              style={styles.speechPress}
              accessibilityRole="button"
              accessibilityLabel="Open AI Macro Assistant"
            >
              <Text style={[styles.bubbleText, { color: colors.textPrimary }]} numberOfLines={1}>
                {promptHint}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setShowTooltip(false)}
              style={styles.dismissBtn}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel="Dismiss assistant prompt"
            >
              <X size={13} color={colors.textMuted} />
            </Pressable>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.fabButton,
            {
              backgroundColor: colors.accentNavy,
              borderColor: colors.borderStrong,
            },
            pressed && styles.fabButtonPressed,
          ]}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel="Open AI Macro Assistant"
        >
          <MessageSquare size={22} color={colors.textInverse} strokeWidth={1.9} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    zIndex: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  speechTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 12,
    paddingRight: 6,
    minHeight: 40,
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  speechPress: {
    paddingVertical: 8,
    paddingRight: 6,
  },
  bubbleText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
  },
  dismissBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },
  fabButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.96 }],
  },
});
