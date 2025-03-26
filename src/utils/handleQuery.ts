import { Todo } from '../types/Todo';

export function handleQuery(todos: Todo[], query: string): Todo[] {
  return todos.filter(todo => {
    const normalizedQuery = query.trim().toLowerCase();

    return todo.title.trim().toLowerCase().includes(normalizedQuery);
  });
}
