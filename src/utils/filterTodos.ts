import { FilterTrigger } from '../types/Filter';
import { Todo } from '../types/Todo';

export function filterTodos(
  filter: string,
  query: string,
  todos: Todo [],
) {
  let result: Todo[] = [];

  switch (filter) {
    case FilterTrigger.All:
      result = todos;
      break;
    case FilterTrigger.Completed:
      result = todos.filter(todo => todo.completed);
      break;
    case FilterTrigger.Active:
      result = todos.filter(todo => !todo.completed);
      break;
    default:
      return todos;
  }

  if (query) {
    result = result.filter(e => {
      return e.title.toLowerCase().includes(query.toLowerCase());
    });
  }

  return result;
}
