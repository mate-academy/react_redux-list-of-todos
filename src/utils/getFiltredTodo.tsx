import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  titles: string,
  filter: Status,
) {
  const visibleTodos = [...todos];

  return visibleTodos
    .filter(todo =>
      todo.title.toLowerCase().includes(titles.trim().toLowerCase()),
    )
    .filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return visibleTodos;
      }
    });
}
