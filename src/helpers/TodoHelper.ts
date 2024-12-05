import { StatusTodo } from '../types/StatusTodo';
import { Todo } from '../types/Todo';

function isStatusMatches(status: StatusTodo, todoStatus: boolean): boolean {
  switch (status) {
    case StatusTodo.Active:
      return !todoStatus;

    case StatusTodo.Completed:
      return todoStatus;

    default:
      return true;
  }
}

function isQueryMarches(query: string, title: string): boolean {
  return title.toLowerCase().includes(query.toLowerCase().trim());
}

export function getFilteredTodos(
  todos: Todo[],
  status: StatusTodo,
  query: string,
): Todo[] {
  return todos.filter(todo => {
    const hasStatusMatched = isStatusMatches(status, todo.completed);
    const hasQueryMarched = isQueryMarches(query, todo.title);

    return hasStatusMatched && hasQueryMarched;
  });
}
