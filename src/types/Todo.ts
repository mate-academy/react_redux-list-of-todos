export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum FilterBy {
  NONE = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}
