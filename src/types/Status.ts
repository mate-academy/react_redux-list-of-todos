export type Status = 'all' | 'active' | 'completed';

export enum Statuses {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export function isValidStatus(string: string): string is Status {
  return ['all', 'active', 'completed'].includes(string);
}
