import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { FONTS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';

interface QuickPromptChipsProps {
  prompts: string[];
  onSelectPrompt: (prompt: string) => void;
}

export const QuickPromptChips: React.FC<QuickPromptChipsProps> = ({
  prompts,
  onSelectPrompt,
}) => {
  const colors = useThemeColors();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipsScroll}
    >
      {prompts.map((prompt, idx) => (
        <Pressable
          key={`${prompt}-${idx}`}
          style={({ pressed }) => [
            styles.chip,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.borderSubtle,
            },
            pressed && { opacity: 0.78 },
          ]}
          onPress={() => onSelectPrompt(prompt)}
          accessibilityRole="button"
          accessibilityLabel={`Ask: ${prompt}`}
        >
          <Text style={[styles.chipText, { color: colors.textPrimary }]}>{prompt}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chipsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    paddingHorizontal: 12,
    minHeight: 40,
    borderRadius: 4,
    justifyContent: 'center',
  },
  chipText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '500',
  },
});
