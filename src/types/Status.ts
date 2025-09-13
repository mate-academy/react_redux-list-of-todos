export type Status = 'all' | 'active' | 'completed';

export interface FilterStatus {
  query: string;
  status: Status;
}
