export type NewsCategory = 'ALL' | 'ADMIN_ANALYSIS' | 'MACRO_FEED';

export interface NewsArticle {
  id: string;
  type: 'ADMIN_ANALYSIS' | 'MACRO_FEED';
  title: string;
  summary: string;
  content?: string;
  author: string;
  image_url: string;
  read_time_minutes: number;
  published_at: string;
}

export interface NewsFilterParams {
  category?: NewsCategory;
  page?: number;
  limit?: number;
}

