import { FilterStatuses } from '../utils/enums/FiltersStatus';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface ITodoFilter {
  status: FilterStatuses;
  query: string;
}
