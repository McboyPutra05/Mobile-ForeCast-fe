import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { TopAppBar } from '../../components/common/TopAppBar';
import { BottomSheetWrapper } from '../../components/common/BottomSheetWrapper';
import { NewsCard } from '../../components/news';
import { FONTS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { NewsArticle, NewsCategory } from '../../types';
import { newsApi, MOCK_NEWS } from '../../api/news.api';
import { formatWIBDate } from '../../utils/date';

export const NewsPage = () => {
  const colors = useThemeColors();
  const [activeTab, setActiveTab] = useState<NewsCategory>('ADMIN_ANALYSIS');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const { data: newsRes, isLoading, isError, refetch } = useQuery({
    queryKey: ['news', activeTab],
    queryFn: () => newsApi.getNews({ category: activeTab }),
    staleTime: 60000,
  });

  const allArticles = newsRes?.data || MOCK_NEWS;
  const filteredNews = allArticles.filter((item) => {
    if (activeTab === 'ALL') return true;
    return item.type === activeTab;
  });

  return (
    <SafeScreenWrapper edges={['top']}>
      <TopAppBar title="Market News & Insights" />

      <View style={[styles.container, { backgroundColor: colors.bgApp }]}>
        <View
          style={[
            styles.tabBar,
            {
              backgroundColor: colors.surfaceCard,
              borderColor: colors.borderSubtle,
            },
          ]}
        >
          <Pressable
            style={[
              styles.tabButton,
              activeTab === 'ADMIN_ANALYSIS' && { backgroundColor: colors.accentNavy },
            ]}
            onPress={() => setActiveTab('ADMIN_ANALYSIS')}
            accessibilityRole="tab"
            accessibilityLabel="Editorial Analysis"
            accessibilityState={{ selected: activeTab === 'ADMIN_ANALYSIS' }}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'ADMIN_ANALYSIS' ? colors.textInverse : colors.textSecondary,
                },
              ]}
            >
              Editorial Analysis
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.tabButton,
              activeTab === 'MACRO_FEED' && { backgroundColor: colors.accentNavy },
            ]}
            onPress={() => setActiveTab('MACRO_FEED')}
            accessibilityRole="tab"
            accessibilityLabel="Live Macro Feed"
            accessibilityState={{ selected: activeTab === 'MACRO_FEED' }}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === 'MACRO_FEED' ? colors.textInverse : colors.textSecondary,
                },
              ]}
            >
              Live Macro Feed
            </Text>
          </Pressable>
        </View>

        {isLoading && !newsRes ? (
          <View style={styles.stateCenter}>
            <ActivityIndicator size="small" color={colors.accentNavy} />
            <Text style={[styles.stateText, { color: colors.textSecondary }]}>
              Loading market dispatches...
            </Text>
          </View>
        ) : isError && !newsRes ? (
          <View style={styles.stateCenter}>
            <Text style={[styles.stateTitle, { color: colors.textPrimary }]}>
              Unable to load news dispatches
            </Text>
            <Pressable
              onPress={() => refetch()}
              style={[styles.retryButton, { backgroundColor: colors.accentNavy }]}
              accessibilityRole="button"
              accessibilityLabel="Retry loading news"
            >
              <Text style={[styles.retryText, { color: colors.textInverse }]}>Retry</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={filteredNews}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }: { item: NewsArticle; index: number }) => (
              <NewsCard
                item={item}
                isLead={index === 0}
                onPress={() => setSelectedArticle(item)}
              />
            )}
            ListEmptyComponent={
              <View style={styles.stateCenter}>
                <Text style={[styles.stateTitle, { color: colors.textPrimary }]}>
                  No dispatches published yet
                </Text>
                <Text style={[styles.stateText, { color: colors.textSecondary }]}>
                  Switch tabs to check the other macro feed.
                </Text>
              </View>
            }
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <BottomSheetWrapper
        visible={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        title={selectedArticle?.title || 'Market Dispatch'}
        subtitle={
          selectedArticle
            ? `${selectedArticle.author} • ${formatWIBDate(selectedArticle.published_at)} • ${selectedArticle.read_time_minutes} min read`
            : ''
        }
      >
        {selectedArticle && (
          <View style={styles.readerBody}>
            <Image
              source={{ uri: selectedArticle.image_url }}
              style={[styles.readerImage, { backgroundColor: colors.surfaceCard }]}
              resizeMode="cover"
              accessibilityLabel={selectedArticle.title}
            />
            <Text style={[styles.readerLead, { color: colors.textPrimary }]}>
              {selectedArticle.summary}
            </Text>
            <Text style={[styles.readerProse, { color: colors.textSecondary }]}>
              {selectedArticle.content ||
                'Full research dispatch commentary is synced directly from the ForeCastFX macro desk and cross-checked against current USD leading indicator vectors.'}
            </Text>
          </View>
        )}
      </BottomSheetWrapper>
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 4,
    padding: 3,
    borderWidth: 1,
  },
  tabButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 96,
  },
  stateCenter: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    alignItems: 'center',
    gap: 8,
  },
  stateTitle: {
    fontFamily: FONTS.serif,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  stateText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 8,
    paddingHorizontal: 18,
    minHeight: 44,
    borderRadius: 4,
    justifyContent: 'center',
  },
  retryText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '700',
  },
  readerBody: {
    gap: 12,
  },
  readerImage: {
    width: '100%',
    height: 170,
    borderRadius: 4,
  },
  readerLead: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '600',
  },
  readerProse: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 22,
  },
});
