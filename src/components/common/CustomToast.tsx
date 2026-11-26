import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { useUIStore } from '../../store/useUIStore';

export const CustomToast: React.FC = () => {
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

  const renderIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={20} color={COLORS.sentimentBullish} />;
      case 'warning':
        return <AlertTriangle size={20} color={COLORS.alertWarning} />;
      case 'error':
        return <XCircle size={20} color={COLORS.sentimentBearish} />;
      case 'info':
      default:
        return <Info size={20} color={COLORS.alertInfo} />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return COLORS.sentimentBullish;
      case 'warning':
        return COLORS.alertWarning;
      case 'error':
        return COLORS.sentimentBearish;
      default:
        return COLORS.alertInfo;
    }
  };

  return (
    <View style={[styles.container, { borderColor: getBorderColor() }]}>
      <View style={styles.iconWrapper}>{renderIcon()}</View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{toast.title}</Text>
        <Text style={styles.message}>{toast.message}</Text>
      </View>
      <Pressable onPress={hideToast} hitSlop={10} style={styles.closeBtn}>
        <X size={16} color={COLORS.textSecondary} />
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
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 10,
    gap: 12,
  },
  iconWrapper: {
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  message: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  closeBtn: {
    padding: 6,
    minWidth: 32,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

