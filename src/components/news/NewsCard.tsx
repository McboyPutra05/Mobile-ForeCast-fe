import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Badge } from '../common/Badge';
import { FONTS, TABULAR_NUMS } from '../../constants/typography';
import { useThemeColors } from '../../store/useUIStore';
import { NewsArticle } from '../../types';
import { formatWIBDate } from '../../utils/date';

interface NewsCardProps {
  item: NewsArticle;
  isLead?: boolean;
  onPress?: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, isLead = false, onPress }) => {
  const colors = useThemeColors();
  const isEditorial = item.type === 'ADMIN_ANALYSIS';

  if (isLead) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.leadCard,
          {
            backgroundColor: colors.surfaceCard,
            borderColor: colors.borderSubtle,
          },
          pressed && { opacity: 0.88 },
        ]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Read lead article: ${item.title}`}
      >
        <View style={[styles.leadImageWrap, { backgroundColor: colors.surfaceElevated }]}>
          <Image
            source={{ uri: item.image_url }}
            style={styles.leadImage}
            resizeMode="cover"
            accessibilityLabel={item.title}
          />
        </View>

        <View style={styles.leadBody}>
          <View style={styles.metaTop}>
            <Badge
              label={isEditorial ? 'Editorial Analysis' : 'Live Macro Feed'}
              variant={isEditorial ? 'bullish' : 'navy'}
              size="sm"
            />
            <Text style={[styles.metaMono, { color: colors.textMuted }]}>
              {item.read_time_minutes} MIN READ
            </Text>
          </View>

          <Text style={[styles.leadTitle, { color: colors.textPrimary }]} numberOfLines={3}>
            {item.title}
          </Text>

          <Text style={[styles.leadSummary, { color: colors.textSecondary }]} numberOfLines={3}>
            {item.summary}
          </Text>

          <View style={[styles.footerRow, { borderTopColor: colors.borderSubtle }]}>
            <Text style={[styles.authorText, { color: colors.textPrimary }]} numberOfLines={1}>
              {item.author}
            </Text>
            <Text style={[styles.metaMono, { color: colors.textMuted }]}>
              {formatWIBDate(item.published_at)}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.rowCard,
        {
          borderBottomColor: colors.borderSubtle,
          backgroundColor: pressed ? colors.surfaceCard : colors.bgApp,
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Read article: ${item.title}`}
    >
      <View style={styles.rowTextCol}>
        <View style={styles.rowMetaTop}>
          <Text
            style={[
              styles.categoryTag,
              {
                color: isEditorial ? colors.sentimentBullish : colors.textSecondary,
              },
            ]}
          >
            {isEditorial ? 'EDITORIAL ANALYSIS' : 'MACRO FEED'}
          </Text>
          <Text style={[styles.metaMono, { color: colors.textMuted }]}>
            {formatWIBDate(item.published_at)}
          </Text>
        </View>

        <Text style={[styles.rowTitle, { color: colors.textPrimary }]} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={[styles.rowSummary, { color: colors.textSecondary }]} numberOfLines={2}>
          {item.summary}
        </Text>

        <Text style={[styles.rowByline, { color: colors.textMuted }]} numberOfLines={1}>
          {item.author} • {item.read_time_minutes} min read
        </Text>
      </View>

      <Image
        source={{ uri: item.image_url }}
        style={[styles.rowThumb, { backgroundColor: colors.surfaceCard }]}
        resizeMode="cover"
        accessibilityLabel={item.title}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  leadCard: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  leadImageWrap: {
    width: '100%',
    height: 176,
  },
  leadImage: {
    width: '100%',
    height: '100%',
  },
  leadBody: {
    padding: 14,
    gap: 8,
  },
  metaTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  metaMono: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    ...TABULAR_NUMS,
  },
  leadTitle: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
  },
  leadSummary: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    marginTop: 2,
    borderTopWidth: 1,
    gap: 8,
  },
  authorText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  rowCard: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 12,
    alignItems: 'flex-start',
  },
  rowTextCol: {
    flex: 1,
    gap: 5,
  },
  rowMetaTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  categoryTag: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  rowTitle: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  rowSummary: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 18,
  },
  rowByline: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    marginTop: 2,
  },
  rowThumb: {
    width: 78,
    height: 78,
    borderRadius: 4,
    marginTop: 4,
  },
});
