import { FilterStatus } from '../types/Filter';
import { Todo } from '../types/Todo';

export function filterTodos(
  filter: string,
  query: string,
  todos: Todo[],
) {
  let res = [];

  switch (filter) {
    case FilterStatus.All:
      res = todos;
      break;

    case FilterStatus.Completed:
      res = todos.filter(todo => todo.completed);
      break;

    case FilterStatus.Active:
      res = todos.filter(todo => !todo.completed);
      break;

    default:
      return todos;
  }

  if (query) {
    res = res.filter(el => {
      return el.title.toLowerCase().includes(query.toLowerCase());
    });
  }

  return res;
}
