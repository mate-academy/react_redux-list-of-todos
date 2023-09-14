export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type Filters = {
  status: Status;
  query: string;
};
