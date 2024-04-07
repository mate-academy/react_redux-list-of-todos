export enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export type Status = Filter.ALL | Filter.ACTIVE | Filter.COMPLETED;
