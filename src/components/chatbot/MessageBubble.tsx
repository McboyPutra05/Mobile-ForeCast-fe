import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Sparkles, Copy, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { ChatMessage } from '../../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <View style={[styles.messageRow, styles.messageRowUser]}>
        <View style={styles.userBubble}>
          <Text style={styles.userBubbleText}>{message.text}</Text>
          <Text style={styles.userTimestamp}>{message.timestamp}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.messageRow, styles.messageRowAI]}>
      <View style={styles.aiPanel}>
        {/* Left Accent Bar */}
        <View style={styles.aiAccentBar} />

        <View style={styles.aiPanelHeader}>
          <View style={styles.aiTitleRow}>
            <Sparkles size={16} color={COLORS.sentimentBullish} />
            <Text style={styles.aiTitle}>Quantitative Synthesis</Text>
          </View>
          <View style={styles.convictionPill}>
            <Text style={styles.convictionText}>85% High Conviction</Text>
          </View>
        </View>

        <Text style={styles.aiBodyText}>{message.text}</Text>

        {/* AI Feedback & Action Row */}
        <View style={styles.aiFooterRow}>
          <Text style={styles.aiFooterMeta}>
            Redis Cached (1.18s) • Model: GPT-4o Macro
          </Text>
          <View style={styles.aiActionIcons}>
            <Pressable style={styles.aiActionBtn} hitSlop={6}>
              <Copy size={13} color={COLORS.textSecondary} />
            </Pressable>
            <Pressable style={styles.aiActionBtn} hitSlop={6}>
              <ThumbsUp size={13} color={COLORS.textSecondary} />
            </Pressable>
            <Pressable style={styles.aiActionBtn} hitSlop={6}>
              <ThumbsDown size={13} color={COLORS.textSecondary} />
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
    maxWidth: '85%',
    backgroundColor: COLORS.surfaceSecondary,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    padding: 12,
    gap: 4,
  },
  userBubbleText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  userTimestamp: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textMuted,
    alignSelf: 'flex-end',
  },
  aiPanel: {
    width: '100%',
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 16,
    padding: 14,
    gap: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  aiAccentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: COLORS.sentimentBullish,
  },
  aiPanelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 4,
  },
  aiTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aiTitle: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  convictionPill: {
    backgroundColor: COLORS.sentimentBullishSubtle,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.sentimentBullishBorder,
  },
  convictionText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.sentimentBullish,
  },
  aiBodyText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 20,
    paddingLeft: 4,
  },
  aiFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
    paddingLeft: 4,
  },
  aiFooterMeta: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textMuted,
    flex: 1,
  },
  aiActionIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  aiActionBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

