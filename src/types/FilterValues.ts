export enum FilterValues {
  all = 'all',
  completed = 'completed',
  active = 'active',
}

export type FilterValuesType = keyof typeof FilterValues;
