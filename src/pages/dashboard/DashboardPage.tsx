import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
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
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { ROUTES } from '../../routes/routeNames';
import { useUIStore } from '../../store/useUIStore';
import { MOCK_LATEST_PREDICTION, MOCK_LEADING_INDICATORS } from '../../api/prediction.api';

export const DashboardPage = ({ navigation }: any) => {
  const isLeadingSheetOpen = useUIStore((s) => s.isLeadingIndicatorsSheetOpen);
  const setLeadingSheetOpen = useUIStore((s) => s.setLeadingIndicatorsSheetOpen);

  const prediction = MOCK_LATEST_PREDICTION;
  const indicators = MOCK_LEADING_INDICATORS.indicators;

  const navigateToChatbot = () => {
    navigation.getParent()?.navigate(ROUTES.CHATBOT, { context: prediction.event_name }) ??
      navigation.navigate(ROUTES.CHATBOT, { context: prediction.event_name });
  };

  const navigateToNotification = () => {
    navigation.getParent()?.navigate(ROUTES.NOTIFICATION) ??
      navigation.navigate(ROUTES.NOTIFICATION);
  };

  const navigateToSettings = () => {
    navigation.getParent()?.navigate(ROUTES.SETTINGS) ??
      navigation.navigate(ROUTES.SETTINGS);
  };

  return (
    <SafeScreenWrapper edges={['top']}>
      <TopAppBar
        title="ForeCastFX"
        onNotificationPress={navigateToNotification}
        onProfilePress={navigateToSettings}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Modular Feature 1: Status Bar */}
        <MacroStatusBar eventName="US CPI" countdownText="1h 18m" />

        {/* Modular Feature 2: Hero Prediction Card */}
        <HeroPredictionCard
          prediction={prediction}
          onAskAiPress={navigateToChatbot}
        />

        {/* Modular Feature 3: Leading Indicators Breakdown Cluster */}
        <LeadingIndicatorsCluster
          indicators={indicators}
          zScoreDeviation={prediction.z_score_deviation}
          onInfoPress={() => setLeadingSheetOpen(true)}
        />

        {/* Modular Feature 4: Volatility Projections */}
        <AssetVolatilityProjections />
      </ScrollView>

      {/* Modular Feature 5: Floating AI Robot */}
      <FloatingAiBotButton onPress={navigateToChatbot} />

      {/* Modal Bottom Sheet: Leading Indicators Breakdown (Section 4.B.1) */}
      <BottomSheetWrapper
        visible={isLeadingSheetOpen}
        onClose={() => setLeadingSheetOpen(false)}
        title="Leading Indicators Breakdown"
        subtitle={`Parent Event: ${prediction.event_name} | Release: Tomorrow 19:30 WIB`}
      >
        <Text style={styles.sheetDesc}>
          Setiap indikator dihitung dengan pembobotan w_i dan deviasi statistik standar (Z-Score) untuk mengukur tingkat tekanan sebelum data resmi CPI diumumkan.
        </Text>
        {indicators.map((ind, i) => {
          const isHawkish = ind.sentiment_impact.toUpperCase().includes('HAWKISH');
          return (
            <View key={i} style={styles.sheetRow}>
              <View style={styles.sheetRowLeft}>
                <Text style={styles.sheetIndName}>{ind.name}</Text>
                <Text style={styles.sheetIndWeight}>
                  Bobot model: {Math.round(ind.weight * 100)}% | Deviasi: +{ind.deviation_score}σ
                </Text>
              </View>
              <View style={[styles.sheetPillWrapper, { backgroundColor: isHawkish ? COLORS.sentimentBullishSubtle : COLORS.sentimentBearishSubtle }]}>
                <Text style={[styles.sheetPillText, { color: isHawkish ? COLORS.sentimentBullish : COLORS.sentimentBearish }]}>
                  {ind.sentiment_impact}
                </Text>
              </View>
            </View>
          );
        })}
        <View style={styles.correlationBox}>
          <Text style={styles.correlationTitle}>AI Agent Engine Correlation Note:</Text>
          <Text style={styles.correlationDesc}>
            Transmisi energi hulu (USOIL) dan indeks upah sektor jasa (ISM Prices Paid) menunjukkan divergensi hawkish moderat, memberikan probabilitas 85% penguatan awal pada indeks DXY.
          </Text>
        </View>
      </BottomSheetWrapper>
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgApp,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  sheetDesc: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
  },
  sheetRowLeft: {
    flex: 1,
  },
  sheetIndName: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  sheetIndWeight: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  sheetPillWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sheetPillText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  correlationBox: {
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    padding: 12,
    marginTop: 16,
    gap: 6,
  },
  correlationTitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.sentimentBullish,
  },
  correlationDesc: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },
});

