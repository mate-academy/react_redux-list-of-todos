import { Status } from '../types/Status';
import { StatusSelect, Todo } from '../types/Todo';

interface IQuery {
  status: Status;
  query: string;
}

export const getFilteredTodos = (initialTodos: Todo[], query: IQuery) => {
  const { status, query: searchQuery } = query;

  // Filter based on status
  let filteredTodos = initialTodos;

  if (status === StatusSelect.Active) {
    filteredTodos = initialTodos.filter(item => !item.completed);
  } else if (status === StatusSelect.Completed) {
    filteredTodos = initialTodos.filter(item => item.completed);
  }

  // Filter based on search query
  if (searchQuery) {
    const lowerCaseQuery = searchQuery.toLowerCase();

    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(lowerCaseQuery),
    );
  }

  return filteredTodos;
};
