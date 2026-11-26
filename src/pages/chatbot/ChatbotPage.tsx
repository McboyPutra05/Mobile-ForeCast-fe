import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ArrowLeft, Bot, Zap } from 'lucide-react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { MessageBubble, QuickPromptChips, ChatInputBar } from '../../components/chatbot';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { ChatMessage } from '../../types';
import { chatbotApi } from '../../api/chatbot.api';

const QUICK_PROMPTS = [
  'How will Gold (XAUUSD) react?',
  'What is the impact of USOIL surge?',
  'Compare with previous NFP release',
  'Explain Z-score deviation of ISM Prices Paid',
];

export const ChatbotPage = ({ route, navigation }: any) => {
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

1. USOIL Crude Surge (+6.5% Deviation) — Weight: 35%
Strong energy pass-through elevating transportation baseline.

2. ISM Prices Paid (55.4 vs 52.8 Prev) — Weight: 30%
Persistent input price pressure sustained across mid-tier sectors.

Implied Forecast:
• DXY Implied: +38 pips to 104.85
• Gold (XAU): -$18.40 drag`,
      timestamp: '17:29 WIB',
      isHawkish: true,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await chatbotApi.sendQuery({ question: query });
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: res.data.answer,
        timestamp: 'Just now',
        isHawkish: true,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Model saat ini sedang memproses data feed live. Sinyal tetap mengindikasikan tekanan hawkish.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeScreenWrapper edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Back to previous page"
          >
            <ArrowLeft size={22} color={COLORS.textPrimary} />
          </Pressable>

          <View style={styles.headerCenter}>
            <View style={styles.botIconCircle}>
              <Bot size={20} color={COLORS.sentimentBullish} />
            </View>
            <View>
              <Text style={styles.headerTitle}>Macro Intelligence Copilot</Text>
              <View style={styles.headerStatusRow}>
                <View style={styles.headerPulseDot} />
                <Text style={styles.headerStatusText}>Online • Quantitative Context</Text>
              </View>
            </View>
          </View>

          <View style={{ width: 36 }} />
        </View>

        {/* Active Macro Context Banner */}
        <View style={styles.contextBanner}>
          <View style={styles.contextLeft}>
            <Zap size={15} color={COLORS.alertWarning} />
            <Text style={styles.contextText} numberOfLines={1}>
              <Text style={{ color: COLORS.alertWarning, fontWeight: '700' }}>Active Context: </Text>
              {activeContext} • Consensus: 85% Good for USD
            </Text>
          </View>
          <View style={styles.liveFeedTag}>
            <View style={styles.liveDot} />
            <Text style={styles.liveFeedText}>LIVE FEED</Text>
          </View>
        </View>

        {/* Chat History Messages */}
        <ScrollView
          style={styles.chatScroll}
          contentContainerStyle={styles.chatScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sessionMarker}>
            <Text style={styles.sessionMarkerText}>TODAY • INSTITUTIONAL SESSION</Text>
          </View>

          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </ScrollView>

        {/* Quick Suggestion Chips */}
        <View style={styles.quickChipsWrapper}>
          <QuickPromptChips prompts={QUICK_PROMPTS} onSelectPrompt={handleSendMessage} />
        </View>

        {/* Bottom Fixed Terminal Prompt Input Bar */}
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
    backgroundColor: COLORS.bgApp,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
    backgroundColor: COLORS.bgApp,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  botIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.sentimentBullish,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  headerStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 1,
  },
  headerPulseDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.sentimentBullish,
  },
  headerStatusText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.sentimentBullish,
  },
  contextBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceCard,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contextLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  contextText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.textPrimary,
    flex: 1,
  },
  liveFeedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  liveDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.sentimentBullish,
  },
  liveFeedText: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.sentimentBullish,
  },
  chatScroll: {
    flex: 1,
  },
  chatScrollContent: {
    padding: 16,
    gap: 16,
  },
  sessionMarker: {
    alignSelf: 'center',
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  sessionMarkerText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  quickChipsWrapper: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
  },
});

