import React from 'react';
import { StyleSheet, ScrollView, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Bell, ArrowRight } from 'lucide-react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { TopAppBar } from '../../components/common/TopAppBar';
import { BottomSheetWrapper } from '../../components/common/BottomSheetWrapper';
import {
  MacroStatusBar,
  HeroPredictionCard,
  LeadingIndicatorsCluster,
  AssetVolatilityProjections,
  FloatingAiBotButton,
} from '../../components/dashboard';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { ROUTES } from '../../routes/routeNames';
import { useUIStore, useThemeColors } from '../../store/useUIStore';
import {
  predictionApi,
  MOCK_LATEST_PREDICTION,
  MOCK_LEADING_INDICATORS,
} from '../../api/prediction.api';
import { formatSecondsToCountdown } from '../../utils/date';

export const DashboardPage = ({ navigation }: any) => {
  const colors = useThemeColors();
  const isLeadingSheetOpen = useUIStore((s) => s.isLeadingIndicatorsSheetOpen);
  const setLeadingSheetOpen = useUIStore((s) => s.setLeadingIndicatorsSheetOpen);
  const isHighAlertMode = useUIStore((s) => s.isHighAlertMode);
  const highAlertPush = useUIStore((s) => s.highAlertPush);
  const setHighAlertPush = useUIStore((s) => s.setHighAlertPush);
  const showToast = useUIStore((s) => s.showToast);

  const staleTime = isHighAlertMode ? 3000 : 15000;

  const {
    data: predictionRes,
    isLoading: isPredictionLoading,
    isError: isPredictionError,
    refetch: refetchPrediction,
  } = useQuery({
    queryKey: ['prediction', 'latest'],
    queryFn: predictionApi.getLatest,
    staleTime,
  });

  const prediction = predictionRes?.data || MOCK_LATEST_PREDICTION;

  const { data: indicatorsRes } = useQuery({
    queryKey: ['prediction', 'leading-indicators', prediction.event_id],
    queryFn: () => predictionApi.getLeadingIndicators(prediction.event_id),
    staleTime: isHighAlertMode ? 5000 : 30000,
  });

  const indicators = indicatorsRes?.data?.indicators || MOCK_LEADING_INDICATORS.indicators;
  const countdown = formatSecondsToCountdown(prediction.countdown_seconds);

  const navigateToChatbot = () => {
    navigation.getParent()?.navigate(ROUTES.CHATBOT, { context: prediction.event_name }) ??
      navigation.navigate(ROUTES.CHATBOT, { context: prediction.event_name });
  };

  const handleToggleAlertWindow = () => {
    const next = !highAlertPush;
    setHighAlertPush(next);
    showToast({
      type: next ? 'success' : 'info',
      title: next ? 'High-Alert Window Enabled' : 'High-Alert Window Paused',
      message: next
        ? `T-15m release alerts active for ${prediction.event_name}.`
        : 'Pre-release alert notifications paused.',
    });
  };

  return (
    <SafeScreenWrapper edges={['top']}>
      <TopAppBar title="ForeCastFX" />

      <MacroStatusBar eventName="US CPI" countdownText={countdown.formatted} />

      <ScrollView
        style={[styles.container, { backgroundColor: colors.bgApp }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {isPredictionLoading && !predictionRes ? (
          <View style={styles.stateBox}>
            <ActivityIndicator size="small" color={colors.accentNavy} />
            <Text style={[styles.stateText, { color: colors.textSecondary }]}>
              Loading latest macro briefing...
            </Text>
          </View>
        ) : isPredictionError && !predictionRes ? (
          <View
            style={[
              styles.errorBanner,
              {
                backgroundColor: colors.sentimentBearishSubtle,
                borderColor: colors.sentimentBearishBorder,
              },
            ]}
          >
            <Text style={[styles.errorText, { color: colors.sentimentBearish }]}>
              Unable to refresh prediction desk.
            </Text>
            <Pressable
              onPress={() => refetchPrediction()}
              style={styles.retryBtn}
              accessibilityRole="button"
              accessibilityLabel="Retry loading briefing"
            >
              <Text style={[styles.retryText, { color: colors.sentimentBearish }]}>Retry</Text>
            </Pressable>
          </View>
        ) : null}

        <HeroPredictionCard
          prediction={prediction}
          cached={predictionRes?.meta?.cached ?? true}
          cacheTtlSeconds={predictionRes?.meta?.cache_ttl_remaining ?? 120}
          onAskAiPress={navigateToChatbot}
        />

        <LeadingIndicatorsCluster
          indicators={indicators}
          zScoreDeviation={prediction.z_score_deviation}
          onInfoPress={() => setLeadingSheetOpen(true)}
        />

        <AssetVolatilityProjections />

        <View style={styles.actionsBlock}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryCta,
              { backgroundColor: colors.accentNavy },
              pressed && { opacity: 0.88 },
            ]}
            onPress={() => setLeadingSheetOpen(true, prediction.event_id)}
            accessibilityRole="button"
            accessibilityLabel="View full CPI model weights"
          >
            <Text style={[styles.primaryCtaText, { color: colors.textInverse }]}>
              View Full CPI Model Weights
            </Text>
            <ArrowRight size={17} color={colors.textInverse} strokeWidth={2} />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryAction,
              {
                borderColor: colors.borderSubtle,
                backgroundColor: highAlertPush ? colors.surfaceCard : colors.bgApp,
              },
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleToggleAlertWindow}
            accessibilityRole="button"
            accessibilityLabel="Toggle release alert window"
          >
            <Bell
              size={15}
              color={highAlertPush ? colors.sentimentBullish : colors.textSecondary}
            />
            <Text style={[styles.secondaryActionText, { color: colors.textPrimary }]}>
              {highAlertPush ? 'Alert Window Active (±15m)' : 'Set Alert Window (±15m)'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <FloatingAiBotButton onPress={navigateToChatbot} />

      <BottomSheetWrapper
        visible={isLeadingSheetOpen}
        onClose={() => setLeadingSheetOpen(false)}
        title="Model Weights & Z-Score Matrix"
        subtitle={`${prediction.event_name} • Aggregate +${prediction.z_score_deviation.toFixed(2)}σ`}
      >
        <Text style={[styles.sheetDesc, { color: colors.textSecondary }]}>
          Each leading indicator is weighted (w_i) and normalized against its 12-month historical standard deviation prior to LLM synthesis.
        </Text>
        {indicators.map((ind, i) => {
          const isHawkish = ind.sentiment_impact.toUpperCase().includes('HAWKISH');
          const impactColor = isHawkish ? colors.sentimentBullish : colors.sentimentBearish;
          const impactBg = isHawkish
            ? colors.sentimentBullishSubtle
            : colors.sentimentBearishSubtle;

          return (
            <View
              key={`${ind.name}-${i}`}
              style={[styles.sheetRow, { borderBottomColor: colors.borderSubtle }]}
            >
              <View style={styles.sheetRowLeft}>
                <Text style={[styles.sheetIndName, { color: colors.textPrimary }]}>{ind.name}</Text>
                <Text style={[styles.sheetIndWeight, { color: colors.textSecondary }]}>
                  Weight: {Math.round(ind.weight * 100)}% • Z-Score: +{ind.deviation_score.toFixed(2)}σ
                </Text>
              </View>
              <View style={[styles.sheetPillWrapper, { backgroundColor: impactBg }]}>
                <Text style={[styles.sheetPillText, { color: impactColor }]}>
                  {ind.sentiment_impact}
                </Text>
              </View>
            </View>
          );
        })}
        <View
          style={[
            styles.correlationBox,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.borderSubtle,
            },
          ]}
        >
          <Text style={[styles.correlationTitle, { color: colors.textPrimary }]}>
            Synthesis Note
          </Text>
          <Text style={[styles.correlationDesc, { color: colors.textSecondary }]}>
            {prediction.summary_reasoning}
          </Text>
        </View>
      </BottomSheetWrapper>
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 112,
    gap: 20,
  },
  stateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  stateText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    flex: 1,
  },
  retryBtn: {
    minHeight: 44,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  retryText: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: '700',
  },
  actionsBlock: {
    gap: 10,
    marginTop: 2,
  },
  primaryCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 4,
    minHeight: 48,
    paddingHorizontal: 16,
  },
  primaryCtaText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 4,
    minHeight: 44,
    paddingHorizontal: 14,
  },
  secondaryActionText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
  },
  sheetDesc: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 10,
  },
  sheetRowLeft: {
    flex: 1,
  },
  sheetIndName: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '600',
  },
  sheetIndWeight: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    marginTop: 2,
    ...TABULAR_NUMS,
  },
  sheetPillWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sheetPillText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  correlationBox: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 12,
    marginTop: 16,
    gap: 6,
  },
  correlationTitle: {
    fontFamily: FONTS.serif,
    fontSize: 14,
    fontWeight: '700',
  },
  correlationDesc: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 19,
  },
});
