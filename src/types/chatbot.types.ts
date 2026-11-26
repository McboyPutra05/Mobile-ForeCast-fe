export interface ChatQueryRequest {
  event_id?: string;
  question: string;
}

export interface ChatQueryResponse {
  answer: string;
  tokens_consumed?: number;
  latency_seconds?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  activeContext?: string;
  isHawkish?: boolean;
}

