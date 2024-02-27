import { Todo } from './Todo';

export interface RootState {
  currentTodo: Todo | null;
  filter: {
    query: string;
    status: 'all' | 'active' | 'completed';
    filteredTodos: Todo[];
  };
  todos: Todo[];
}
