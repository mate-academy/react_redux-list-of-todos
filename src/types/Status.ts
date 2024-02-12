export type Status = 'all' | 'active' | 'completed';

export type State = {
  query: string;
  status: Status;
};
