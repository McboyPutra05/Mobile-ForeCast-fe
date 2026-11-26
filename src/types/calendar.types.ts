import { BiasDirection, ImpactLevel } from './common.types';

export interface CalendarEvent {
  id: string;
  event_name: string;
  country: string;
  release_time: string;
  impact: ImpactLevel;
  previous: string | null;
  forecast: string | null;
  actual: string | null;
  has_prediction: boolean;
  predicted_bias?: BiasDirection;
}

export interface CalendarFilterParams {
  start_date?: string;
  end_date?: string;
  impact?: 'HIGH' | 'MEDIUM' | 'ALL';
}

