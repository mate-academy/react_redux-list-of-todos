export const FilterStatus = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export type FilterStatusType = (typeof FilterStatus)[keyof typeof FilterStatus];
