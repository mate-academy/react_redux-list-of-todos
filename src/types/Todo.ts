export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum SortType {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ALL = 'all',
}
