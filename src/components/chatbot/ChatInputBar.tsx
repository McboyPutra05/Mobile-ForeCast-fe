import React from 'react';
import { View, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { ArrowUp } from 'lucide-react-native';
import { FONTS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';

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
  const colors = useThemeColors();
  const canSend = value.trim().length > 0 && !loading;

  return (
    <View
      style={[
        styles.inputBar,
        {
          backgroundColor: colors.bgApp,
          borderTopColor: colors.borderSubtle,
        },
      ]}
    >
      <TextInput
        style={[
          styles.textInput,
          {
            backgroundColor: colors.surfaceCard,
            borderColor: colors.borderSubtle,
            color: colors.textPrimary,
          },
        ]}
        placeholder="Ask about CPI drivers, DXY, or XAUUSD..."
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="send"
        onSubmitEditing={() => {
          if (canSend) onSend();
        }}
        accessibilityLabel="Macro question input"
      />

      <Pressable
        style={({ pressed }) => [
          styles.sendButton,
          { backgroundColor: colors.accentNavy },
          !canSend && { opacity: 0.45 },
          pressed && canSend && { opacity: 0.85 },
        ]}
        onPress={onSend}
        disabled={!canSend}
        accessibilityRole="button"
        accessibilityLabel="Send question"
        accessibilityState={{ disabled: !canSend }}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.textInverse} />
        ) : (
          <ArrowUp size={20} color={colors.textInverse} />
        )}
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
    borderTopWidth: 1,
    gap: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 14,
    minHeight: 44,
    fontFamily: FONTS.sans,
    fontSize: 14,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
