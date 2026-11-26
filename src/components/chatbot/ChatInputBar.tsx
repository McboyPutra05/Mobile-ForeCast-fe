import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { ArrowUp } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';

interface ChatInputBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  loading?: boolean;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  value,
  onChangeText,
  onSend,
  loading = false,
}) => {
  const canSend = value.trim().length > 0 && !loading;

  return (
    <View style={styles.inputBar}>
      <TextInput
        style={styles.textInput}
        placeholder="Tanyakan alasan prediksi makro..."
        placeholderTextColor={COLORS.textMuted}
        value={value}
        onChangeText={onChangeText}
        multiline={false}
      />

      <Pressable
        style={({ pressed }) => [
          styles.sendButton,
          !canSend && { opacity: 0.5 },
          pressed && { transform: [{ scale: 0.95 }] },
        ]}
        onPress={onSend}
        disabled={!canSend}
      >
        <ArrowUp size={20} color={COLORS.textInverse} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.bgApp,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontFamily: FONTS.sans,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.sentimentBullish,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

