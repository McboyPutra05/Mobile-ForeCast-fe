import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { MessageBubble, QuickPromptChips, ChatInputBar } from '../../components/chatbot';
import { FONTS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { ChatMessage } from '../../types';
import { chatbotApi } from '../../api/chatbot.api';

const QUICK_PROMPTS = [
  'How will Gold (XAUUSD) react?',
  'What is the impact of USOIL surge?',
  'Compare with previous NFP release',
  'Explain Z-score deviation of ISM Prices Paid',
];

export const ChatbotPage = ({ route, navigation }: any) => {
  const colors = useThemeColors();
  const scrollRef = useRef<ScrollView | null>(null);
  const activeContext = route?.params?.context || 'Consumer Price Index (CPI) MoM';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Why is CPI predicted Good for USD? What are the key models saying?',
      timestamp: '17:29 WIB',
    },
    {
      id: '2',
      sender: 'ai',
      text: `Synthesis across 140 macro vectors indicates an upside surprise risk (+0.4% MoM vs +0.3% expected).

1. USOIL Crude Surge (+6.5% Deviation, Weight: 35%)
Strong energy pass-through elevating transportation baseline.

2. ISM Prices Paid (55.4 vs 52.8 Prev, Weight: 30%)
Persistent input price pressure sustained across mid-tier sectors.

Implied Forecast:
• DXY Implied: +38 pips toward 104.85
• Gold (XAUUSD): -$18.40 drag`,
      timestamp: '17:29 WIB',
      isHawkish: true,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setLoading(true);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);

    try {
      const res = await chatbotApi.sendQuery({ question: query });
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: res.data.answer,
        timestamp: res.data.latency_seconds
          ? `${res.data.latency_seconds.toFixed(2)}s`
          : 'Just now',
        isHawkish: true,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Unable to reach the synthesis service right now. Please try again shortly.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <SafeScreenWrapper edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={[styles.keyboardContainer, { backgroundColor: colors.bgApp }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.bgApp,
              borderBottomColor: colors.borderSubtle,
            },
          ]}
        >
          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Back to previous screen"
          >
            <ArrowLeft size={20} color={colors.textPrimary} />
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]} numberOfLines={1}>
              ForeCastFX AI Analyst
            </Text>
            <Text style={[styles.headerStatusText, { color: colors.sentimentBullish }]}>
              Active Context Ready
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <View
          style={[
            styles.contextBanner,
            {
              backgroundColor: colors.surfaceCard,
              borderBottomColor: colors.borderSubtle,
            },
          ]}
        >
          <Text style={[styles.contextText, { color: colors.textPrimary }]} numberOfLines={1}>
            <Text style={{ fontWeight: '700', color: colors.sentimentBullish }}>CONTEXT: </Text>
            {activeContext} • 85% Good for USD
          </Text>
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.chatScroll}
          contentContainerStyle={styles.chatScrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.sessionMarker}>
            <Text style={[styles.sessionMarkerText, { color: colors.textMuted }]}>
              TODAY • MACRO DESK SESSION
            </Text>
          </View>

          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </ScrollView>

        <View
          style={[
            styles.quickChipsWrapper,
            {
              backgroundColor: colors.bgApp,
              borderTopColor: colors.borderSubtle,
            },
          ]}
        >
          <QuickPromptChips prompts={QUICK_PROMPTS} onSelectPrompt={handleSendMessage} />
        </View>

        <ChatInputBar
          value={inputText}
          onChangeText={setInputText}
          onSend={() => handleSendMessage()}
          loading={loading}
        />
      </KeyboardAvoidingView>
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: '700',
  },
  headerStatusText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  headerSpacer: {
    width: 44,
  },
  contextBanner: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  contextText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
  },
  chatScroll: {
    flex: 1,
  },
  chatScrollContent: {
    padding: 16,
    gap: 14,
  },
  sessionMarker: {
    alignSelf: 'center',
    paddingVertical: 2,
  },
  sessionMarkerText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: 0.8,
  },
  quickChipsWrapper: {
    paddingVertical: 8,
    borderTopWidth: 1,
  },
});
