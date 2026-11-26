import { apiClient } from './client';
import { ENDPOINTS } from '../constants/endpoints';
import { ApiResponse, NewsArticle, NewsFilterParams } from '../types';

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'art_991823',
    type: 'ADMIN_ANALYSIS',
    title: 'Analisis Dinamika Minyak USOIL terhadap Potensi CPI Pekan Ini',
    summary: 'Lonjakan harga minyak mentah berisiko memicu inflasi persisten dan menahan ekspektasi penurunan suku bunga Fed di Q4.',
    content: 'Pasar keuangan global kini menyorot transmisi kenaikan harga energi ke komponen headline inflasi AS. Dalam 30 hari terakhir, harga kontrak berjangka WTI Crude menguat sebesar 6.5% didorong pembatasan pasokan OPEC+ dan ketegangan rute logistik Laut Merah.',
    author: 'ForeCastFX Research Team',
    image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&auto=format&fit=crop&q=80',
    read_time_minutes: 3,
    published_at: '2026-09-27T08:00:00Z',
  },
  {
    id: 'art_991824',
    type: 'ADMIN_ANALYSIS',
    title: 'Korelasi Terbalik DXY vs Emas (XAUUSD): Antisipasi Skenario CPI Hawkish',
    summary: 'Data Leading Indicators memperlihatkan lonjakan ISM Prices Paid ke level 55.4 yang menyiratkan volatilitas bearish pada XAUUSD.',
    content: 'Emas menunjukkan kelemahan teknis di area resistance $2,695. Jika rilis CPI mencatatkan deviasi positif di atas +0.3% MoM, DXY berpeluang rally menuju 104.85.',
    author: 'Fahmi Dani, Senior Macro Strategist',
    image_url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&auto=format&fit=crop&q=80',
    read_time_minutes: 5,
    published_at: '2026-09-26T14:30:00Z',
  },
  {
    id: 'feed_101',
    type: 'MACRO_FEED',
    title: 'Fed Governor Waller: Pertumbuhan Upah Perlu Melambat Sebelum Pelonggaran Agresif',
    summary: 'Komentar hawkish mengalir dari pejabat the Fed menjelang rilis data ketenagakerjaan dan inflasi.',
    author: 'Bloomberg Macro Terminal',
    image_url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop&q=80',
    read_time_minutes: 2,
    published_at: '2026-09-27T11:15:00Z',
  },
  {
    id: 'feed_102',
    type: 'MACRO_FEED',
    title: 'Cadangan Minyak Mentah AS EIA Turun 3.4 Juta Barel Lebih Dalam dari Estimasi',
    summary: 'Pengetatan suplai domestik mendorong WTI stabil di kisaran $77/barel.',
    author: 'Reuters Energy',
    image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
    read_time_minutes: 1,
    published_at: '2026-09-27T10:00:00Z',
  },
];

export const newsApi = {
  getNews: async (params?: NewsFilterParams): Promise<ApiResponse<NewsArticle[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<NewsArticle[]>>(ENDPOINTS.NEWS, { params });
      return response.data;
    } catch {
      let filtered = MOCK_NEWS;
      if (params?.category && params.category !== 'ALL') {
        filtered = MOCK_NEWS.filter((item) => item.type === params.category);
      }
      return {
        success: true,
        status_code: 200,
        data: filtered,
        meta: {
          current_page: 1,
          total_pages: 1,
          timestamp: new Date().toISOString(),
        },
      };
    }
  },

  getArticleDetail: async (id: string): Promise<ApiResponse<NewsArticle>> => {
    try {
      const response = await apiClient.get<ApiResponse<NewsArticle>>(ENDPOINTS.ARTICLE_DETAIL(id));
      return response.data;
    } catch {
      const article = MOCK_NEWS.find((n) => n.id === id) || MOCK_NEWS[0];
      return {
        success: true,
        status_code: 200,
        data: article,
      };
    }
  },
};

