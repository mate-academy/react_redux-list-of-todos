export type Status = 'all' | 'active' | 'completed';

export interface Filter {
  query: string;
  status: Status;
}
