import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getVisibleTodos(
  todos: Todo[],
  status: Status,
  query: string,
): Todo[] {
  const filterFn: Record<Exclude<Status, 'all'>, (todo: Todo) => boolean> = {
    active: (todo: Todo) => !todo.completed,
    completed: (todo: Todo) => todo.completed,
  };

  let visibleTodos =
    status === 'all' ? [...todos] : todos.filter(filterFn[status]);

  visibleTodos = visibleTodos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  return visibleTodos;
}
