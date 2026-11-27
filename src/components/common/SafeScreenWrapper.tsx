import React from 'react';
import { View, StyleSheet, StatusBar, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useThemeColors } from '../../store/useUIStore';

interface SafeScreenWrapperProps {
  children: React.ReactNode;
  edges?: Edge[];
  className?: string;
  style?: ViewStyle;
}

export const SafeScreenWrapper: React.FC<SafeScreenWrapperProps> = ({
  children,
  edges = ['top'],
  style,
}) => {
  const colors = useThemeColors();

  return (
    <SafeAreaView edges={edges} style={[styles.container, { backgroundColor: colors.bgApp }, style]}>
      <StatusBar
        barStyle={colors.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.bgApp}
      />
      <View style={[styles.inner, { backgroundColor: colors.bgApp }]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
