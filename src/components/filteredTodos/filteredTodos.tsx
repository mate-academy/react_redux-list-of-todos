import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Status';

type Args = {
  todos: Todo[],
  filter: Filter,
  searchText: string,
};

export function filterTodos({ filter, searchText, todos }: Args) {
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return todo.title.toLowerCase()
          .includes(searchText.toLowerCase().trim());
      case 'completed':
        return todo.completed
        && todo.title.toLowerCase().includes(searchText.toLowerCase().trim());
      case 'active':
        return !todo.completed
        && todo.title.toLowerCase().includes(searchText.toLowerCase().trim());
      default:
        return true;
    }
  });

  return filteredTodos;
}
