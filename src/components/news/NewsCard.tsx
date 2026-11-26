import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Clock } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { NewsArticle } from '../../types';
import { formatWIBDate } from '../../utils/date';

interface NewsCardProps {
  item: NewsArticle;
  onPress?: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, onPress }) => {
  const isEditorial = item.type === 'ADMIN_ANALYSIS';
  const authorInitials = item.author
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <Pressable
      style={({ pressed }) => [styles.articleCard, pressed && { opacity: 0.88 }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={item.title}
    >
      <View style={styles.thumbnailWrapper}>
        <Image
          source={{ uri: item.image_url }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View
          style={[
            styles.typePill,
            {
              backgroundColor: isEditorial
                ? 'rgba(16, 185, 129, 0.88)'
                : 'rgba(59, 130, 246, 0.88)',
            },
          ]}
        >
          <Text style={styles.typeText}>
            {isEditorial ? 'Editorial Analysis' : 'Live Macro Feed'}
          </Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.metaTop}>
          <Text style={styles.categoryTag}>
            {isEditorial ? 'CENTRAL BANK & INFLATION' : 'GLOBAL MACRO FLOW'}
          </Text>
          <View style={styles.readTime}>
            <Clock size={11} color={COLORS.textSecondary} />
            <Text style={styles.readTimeText}>{item.read_time_minutes} min read</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.summary} numberOfLines={2}>
          {item.summary}
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.authorGroup}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{authorInitials}</Text>
            </View>
            <Text style={styles.author}>{item.author}</Text>
          </View>
          <Text style={styles.date}>{formatWIBDate(item.published_at)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  articleCard: {
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 14,
    overflow: 'hidden',
  },
  thumbnailWrapper: {
    width: '100%',
    height: 150,
    position: 'relative',
    backgroundColor: COLORS.surfaceElevated,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  typePill: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  cardContent: {
    padding: 14,
    gap: 8,
  },
  metaTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryTag: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.sentimentBullish,
    letterSpacing: 0.5,
  },
  readTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readTimeText: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  title: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  summary: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
    marginTop: 4,
  },
  authorGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  avatarCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.borderHighlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  author: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  date: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});


