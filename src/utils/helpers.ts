import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getNormalisedTodos(
  todos: Todo[],
  query: string,
  filter: Status,
): Todo[] {
  let newTodos = todos;

  if (query.trim()) {
    const normalizedQuery = query.trim().toLowerCase();

    newTodos = todos.filter(
      todo => todo.title.toLocaleLowerCase().includes(normalizedQuery),
    );
  }

  switch (filter) {
    case Status.Active:
      return newTodos.filter(todo => !todo.completed);

    case Status.Completed:
      return newTodos.filter(todo => todo.completed);

    default:
      return newTodos;
  }
}
