import { State } from '../features/filter';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], filter: State) {
  const filterByQuery = todos.filter(todo =>
    todo.title.toLocaleLowerCase().includes(filter.query.toLowerCase().trim()),
  );

  switch (filter.status) {
    case 'all':
      return [...filterByQuery];
    case 'completed':
      return filterByQuery.filter(todo => todo.completed);

    case 'active':
      return filterByQuery.filter(todo => !todo.completed);

    default:
      return filterByQuery;
  }
}
