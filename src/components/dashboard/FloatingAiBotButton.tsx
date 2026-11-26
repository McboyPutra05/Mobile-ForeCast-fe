import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
} from 'react-native';
import { Bot, Sparkles, X } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';

interface FloatingAiBotButtonProps {
  onPress: () => void;
  promptHint?: string;
}

const BOT_SIZE = 52;
const EDGE_MARGIN = 16;
const MIN_Y = 80;

export const FloatingAiBotButton: React.FC<FloatingAiBotButtonProps> = ({
  onPress,
  promptHint = 'Ada yang bisa aku bantu? ✨',
}) => {
  const windowDimensions = Dimensions.get('window');
  const screenWidth = windowDimensions.width;
  const screenHeight = windowDimensions.height;
  const maxY = screenHeight - BOT_SIZE - 90;

  const defaultX = screenWidth - BOT_SIZE - EDGE_MARGIN;
  const defaultY = screenHeight - BOT_SIZE - 120;

  const pan = useRef(new Animated.ValueXY({ x: defaultX, y: defaultY })).current;
  const currentPos = useRef({ x: defaultX, y: defaultY });
  const [isDockedLeft, setIsDockedLeft] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const listenerId = pan.addListener((value) => {
      currentPos.current = value;
    });
    return () => {
      pan.removeListener(listenerId);
    };
  }, [pan]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 4 || Math.abs(gestureState.dy) > 4;
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: currentPos.current.x,
          y: currentPos.current.y,
        });
        pan.setValue({ x: 0, y: 0 });
        setIsDragging(true);
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        setIsDragging(false);

        const dist = Math.hypot(gestureState.dx, gestureState.dy);
        if (dist < 6) {
          // It was a tap / click
          onPress();
          return;
        }

        // Snap to nearest edge (left or right)
        const currentX = currentPos.current.x;
        const currentY = currentPos.current.y;
        const snapLeft = currentX + BOT_SIZE / 2 < screenWidth / 2;
        const targetX = snapLeft ? EDGE_MARGIN : screenWidth - BOT_SIZE - EDGE_MARGIN;
        const clampedY = Math.max(MIN_Y, Math.min(maxY, currentY));

        setIsDockedLeft(snapLeft);

        Animated.spring(pan, {
          toValue: { x: targetX, y: clampedY },
          friction: 7,
          tension: 40,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderTerminate: () => {
        pan.flattenOffset();
        setIsDragging(false);
      },
    })
  ).current;

  return (
    <View style={styles.fullscreenOverlay} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.botWrapper,
          {
            transform: pan.getTranslateTransform(),
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Row container: speech bubble flips left or right depending on dock edge */}
        <View
          style={[
            styles.contentRow,
            isDockedLeft ? styles.contentRowLeftDock : styles.contentRowRightDock,
          ]}
        >
          {/* Conversational Prompt Pill (Tooltip) */}
          {showTooltip && !isDragging && (
            <Pressable
              style={styles.speechBubble}
              onPress={onPress}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel="Open AI Copilot"
            >
              <Sparkles size={13} color={COLORS.sentimentBullish} />
              <Text style={styles.bubbleText}>{promptHint}</Text>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation?.();
                  setShowTooltip(false);
                }}
                hitSlop={8}
                style={styles.closeTooltipBtn}
                accessibilityRole="button"
                accessibilityLabel="Dismiss message"
              >
                <X size={12} color={COLORS.textSecondary} />
              </Pressable>
            </Pressable>
          )}

          {/* 52x52 Round Floating Bot Button */}
          <Pressable
            style={({ pressed }) => [
              styles.fabButton,
              pressed && styles.fabButtonPressed,
            ]}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel="Open Macro AI Copilot"
          >
            <Bot size={24} color={COLORS.sentimentBullish} strokeWidth={2} />
            <View style={styles.pulseIndicator} />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  botWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contentRowRightDock: {
    flexDirection: 'row',
    transform: [{ translateX: -190 }], // Place speech bubble nicely to the left of the button
    justifyContent: 'flex-end',
    width: 190 + BOT_SIZE,
  },
  contentRowLeftDock: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    width: 190 + BOT_SIZE,
  },
  fabButton: {
    width: BOT_SIZE,
    height: BOT_SIZE,
    borderRadius: BOT_SIZE / 2,
    backgroundColor: '#151C25',
    borderWidth: 1.5,
    borderColor: COLORS.sentimentBullish,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.sentimentBullish,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
    position: 'relative',
  },
  fabButtonPressed: {
    transform: [{ scale: 0.94 }],
    opacity: 0.9,
  },
  pulseIndicator: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.sentimentBullish,
    borderWidth: 1.5,
    borderColor: '#151C25',
  },
  speechBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.45)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
    maxWidth: 185,
  },
  bubbleText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '500',
    color: '#F9FAFB',
    letterSpacing: -0.2,
    flexShrink: 1,
  },
  closeTooltipBtn: {
    marginLeft: 2,
    padding: 2,
  },
});
