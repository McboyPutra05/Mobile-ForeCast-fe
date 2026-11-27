import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useThemeColors } from '../../store/useUIStore';

interface EditorialDividerProps {
  dashed?: boolean;
  strong?: boolean;
  spacingVertical?: number;
  style?: ViewStyle;
}

export const EditorialDivider: React.FC<EditorialDividerProps> = ({
  dashed = false,
  strong = false,
  spacingVertical = 0,
  style,
}) => {
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.rule,
        {
          borderBottomColor: strong
            ? colors.borderStrong
            : dashed
              ? colors.borderDashed
              : colors.borderSubtle,
          borderBottomWidth: strong ? 1.5 : 1,
          borderStyle: dashed ? 'dashed' : 'solid',
          marginVertical: spacingVertical,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  rule: {
    width: '100%',
    height: 1,
  },
});
