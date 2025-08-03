import { Todo } from './Todo';

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}
