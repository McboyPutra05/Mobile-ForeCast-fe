import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';

interface SafeScreenWrapperProps {
  children: React.ReactNode;
  edges?: Edge[];
  className?: string;
  style?: object;
}

export const SafeScreenWrapper: React.FC<SafeScreenWrapperProps> = ({
  children,
  edges = ['top'],
  style,
}) => {
  return (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgApp} />
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgApp,
  },
  inner: {
    flex: 1,
    backgroundColor: COLORS.bgApp,
  },
});

