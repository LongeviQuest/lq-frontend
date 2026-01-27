import { Supercentenarian } from './map-info';

export interface TopSCDataInfo {
  content: Supercentenarian[];
  count: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}
