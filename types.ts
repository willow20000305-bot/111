export interface HeartRateData {
  user: number;
  partner: number;
  history: number[];
}

export interface RoutePoint {
  id: string;
  type: 'shop' | 'moment';
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  completed: boolean;
  label: string;
}

export enum GenerationStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}