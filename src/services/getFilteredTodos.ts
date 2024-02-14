import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export function getFilteredTodos(todos: Todo[], filter: Filter) {
  const { status, title } = filter;
  const filteredByTitle = todos
    .filter(todo => todo.title.toLowerCase().includes(title));

  switch (status) {
    case 'active':
      return filteredByTitle.filter(({ completed }) => !completed);
    case 'completed':
      return filteredByTitle.filter(({ completed }) => completed);
    default:
      return filteredByTitle;
  }
}
