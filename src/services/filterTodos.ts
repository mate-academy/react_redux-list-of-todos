import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

type Props = {
  filterBy: string;
  query: string;
};

export function filterTodos(todos: Todo[], { filterBy, query }: Props) {
  let filteredTodos = [...todos];
  const lowerQuery = query.trim().toLowerCase();

  switch (filterBy) {
    case Filter.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Filter.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (lowerQuery) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(lowerQuery),
    );
  }

  return filteredTodos;
}
