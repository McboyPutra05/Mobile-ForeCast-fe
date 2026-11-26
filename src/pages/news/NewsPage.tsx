import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { BookOpen, Radio } from 'lucide-react-native';
import { SafeScreenWrapper } from '../../components/common/SafeScreenWrapper';
import { TopAppBar } from '../../components/common/TopAppBar';
import { NewsCard } from '../../components/news';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { NewsArticle, NewsCategory } from '../../types';
import { MOCK_NEWS } from '../../api/news.api';

export const NewsPage = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<NewsCategory>('ADMIN_ANALYSIS');

  const filteredNews = MOCK_NEWS.filter((item) => {
    if (activeTab === 'ALL') return true;
    return item.type === activeTab;
  });

  return (
    <SafeScreenWrapper edges={['top']}>
      <TopAppBar
        title="News & Insights"
        onNotificationPress={() => navigation.navigate('Notification')}
        onProfilePress={() => navigation.navigate('Settings')}
      />

      <View style={styles.container}>
        {/* Segmented Switch: Editorial Analysis vs Live Macro Feed */}
        <View style={styles.tabBar}>
          <Pressable
            style={[styles.tabButton, activeTab === 'ADMIN_ANALYSIS' && styles.tabButtonActive]}
            onPress={() => setActiveTab('ADMIN_ANALYSIS')}
          >
            <BookOpen
              size={15}
              color={
                activeTab === 'ADMIN_ANALYSIS' ? COLORS.sentimentBullish : COLORS.textSecondary
              }
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'ADMIN_ANALYSIS' && styles.tabTextActive,
              ]}
            >
              Editorial Analysis
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tabButton, activeTab === 'MACRO_FEED' && styles.tabButtonActive]}
            onPress={() => setActiveTab('MACRO_FEED')}
          >
            <Radio
              size={15}
              color={
                activeTab === 'MACRO_FEED' ? COLORS.sentimentBullish : COLORS.textSecondary
              }
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'MACRO_FEED' && styles.tabTextActive,
              ]}
            >
              Live Macro Feed
            </Text>
          </Pressable>
        </View>

        {/* Article Cards Stream */}
        <FlatList
          data={filteredNews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: NewsArticle }) => (
            <NewsCard item={item} onPress={() => {}} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgApp,
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: COLORS.surfaceCard,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.sentimentBullishBorder,
  },
  tabText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.sentimentBullish,
  },
  listContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 100,
  },
});

