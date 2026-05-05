export enum StatusType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const STATUS_TYPES = ['all', 'active', 'completed'] as const;

export type Status = (typeof STATUS_TYPES)[number];

export const isStatus = (value: unknown): value is Status => {
  return STATUS_TYPES.includes(value as Status);
};
