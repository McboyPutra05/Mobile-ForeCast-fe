import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react-native';
import { FONTS } from '../../constants/typography';
import { useUIStore, useThemeColors } from '../../store/useUIStore';

export const CustomToast: React.FC = () => {
  const colors = useThemeColors();
  const toast = useUIStore((s) => s.toast);
  const hideToast = useUIStore((s) => s.hideToast);

  useEffect(() => {
    if (!toast) return;

    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      hideToast();
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  if (!toast) return null;

  const accentColor = (() => {
    switch (toast.type) {
      case 'success':
        return colors.sentimentBullish;
      case 'warning':
        return colors.alertWarning;
      case 'error':
        return colors.sentimentBearish;
      default:
        return colors.accentNavy;
    }
  })();

  const renderIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={18} color={accentColor} />;
      case 'warning':
        return <AlertTriangle size={18} color={accentColor} />;
      case 'error':
        return <XCircle size={18} color={accentColor} />;
      case 'info':
      default:
        return <Info size={18} color={accentColor} />;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceCard,
          borderColor: colors.borderSubtle,
          borderLeftColor: accentColor,
        },
      ]}
      accessibilityLiveRegion="polite"
    >
      <View style={styles.iconWrapper}>{renderIcon()}</View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{toast.title}</Text>
        <Text style={[styles.message, { color: colors.textSecondary }]}>{toast.message}</Text>
      </View>
      <Pressable
        onPress={hideToast}
        style={styles.closeBtn}
        accessibilityRole="button"
        accessibilityLabel="Dismiss alert"
      >
        <X size={16} color={colors.textSecondary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 56,
    left: 16,
    right: 16,
    zIndex: 9999,
    borderRadius: 6,
    borderWidth: 1,
    borderLeftWidth: 3,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    gap: 12,
  },
  iconWrapper: {
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  message: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    lineHeight: 17,
  },
  closeBtn: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
