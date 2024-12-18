import { Todo } from './Todo';

export interface Todos {
  todos: Todo[];
  loading: boolean;
  error: string;
}
