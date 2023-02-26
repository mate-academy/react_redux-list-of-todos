import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  let filteredTodos = [...todos].filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  if (query) {
    const lowerCaseQuery = query.toLocaleLowerCase();

    filteredTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(lowerCaseQuery)
    ));
  }

  return filteredTodos;
};
