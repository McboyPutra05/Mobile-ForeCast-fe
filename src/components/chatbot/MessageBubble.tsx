import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ThumbsUp, ThumbsDown } from 'lucide-react-native';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { ChatMessage } from '../../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const colors = useThemeColors();
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <View style={[styles.messageRow, styles.messageRowUser]}>
        <View
          style={[
            styles.userBubble,
            {
              backgroundColor: colors.surfaceSecondary,
              borderColor: colors.borderSubtle,
            },
          ]}
        >
          <Text style={[styles.userBubbleText, { color: colors.textPrimary }]}>{message.text}</Text>
          <Text style={[styles.userTimestamp, { color: colors.textMuted }]}>
            {message.timestamp}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.messageRow, styles.messageRowAI]}>
      <View
        style={[
          styles.aiCard,
          {
            backgroundColor: colors.surfaceCard,
            borderColor: colors.borderSubtle,
            borderLeftColor: colors.sentimentBullish,
          },
        ]}
      >
        <View style={styles.aiHeader}>
          <Text style={[styles.aiTitle, { color: colors.textPrimary }]}>
            Quantitative Synthesis
          </Text>
          <Text style={[styles.aiTimestamp, { color: colors.textMuted }]}>{message.timestamp}</Text>
        </View>

        <Text style={[styles.aiBodyText, { color: colors.textPrimary }]}>{message.text}</Text>

        <View style={[styles.aiFooter, { borderTopColor: colors.borderSubtle }]}>
          <Text style={[styles.aiFooterMeta, { color: colors.textMuted }]}>
            ForeCastFX Macro Engine
          </Text>
          <View style={styles.feedbackRow}>
            <Pressable
              style={({ pressed }) => [
                styles.feedbackBtn,
                feedback === 'up' && { backgroundColor: colors.sentimentBullishSubtle },
                pressed && { opacity: 0.75 },
              ]}
              onPress={() => setFeedback((prev) => (prev === 'up' ? null : 'up'))}
              accessibilityRole="button"
              accessibilityLabel="Mark synthesis helpful"
              accessibilityState={{ selected: feedback === 'up' }}
            >
              <ThumbsUp
                size={14}
                color={feedback === 'up' ? colors.sentimentBullish : colors.textSecondary}
              />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.feedbackBtn,
                feedback === 'down' && { backgroundColor: colors.sentimentBearishSubtle },
                pressed && { opacity: 0.75 },
              ]}
              onPress={() => setFeedback((prev) => (prev === 'down' ? null : 'down'))}
              accessibilityRole="button"
              accessibilityLabel="Mark synthesis not helpful"
              accessibilityState={{ selected: feedback === 'down' }}
            >
              <ThumbsDown
                size={14}
                color={feedback === 'down' ? colors.sentimentBearish : colors.textSecondary}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageRow: {
    width: '100%',
  },
  messageRowUser: {
    alignItems: 'flex-end',
  },
  messageRowAI: {
    alignItems: 'flex-start',
  },
  userBubble: {
    maxWidth: '84%',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 5,
  },
  userBubbleText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 20,
  },
  userTimestamp: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    alignSelf: 'flex-end',
    ...TABULAR_NUMS,
  },
  aiCard: {
    width: '100%',
    borderWidth: 1,
    borderLeftWidth: 3,
    borderRadius: 4,
    padding: 14,
    gap: 10,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  aiTitle: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: '700',
  },
  aiTimestamp: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    ...TABULAR_NUMS,
  },
  aiBodyText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 21,
  },
  aiFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
  },
  aiFooterMeta: {
    fontFamily: FONTS.mono,
    fontSize: 10,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  feedbackBtn: {
    width: 36,
    height: 36,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
