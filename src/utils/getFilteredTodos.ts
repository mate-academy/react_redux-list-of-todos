import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';

export function getFilteredTodos(
  todos: Todo[],
  filter: { query: string; status: TodoStatus },
) {
  let filteredTodos = [...todos];

  if (filter.query.trim()) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(filter.query.trim().toLowerCase()),
    );
  }

  if (filter.status !== TodoStatus.all) {
    filteredTodos = filteredTodos.filter(todo =>
      filter.status === TodoStatus.completed ? todo.completed : !todo.completed,
    );
  }

  return filteredTodos;
}
