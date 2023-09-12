import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type FilterParams = {
  query: string,
  status: Status,
};

const filterTodosByStatus = (todos: Todo[], status: Status): Todo[] => {
  switch (status) {
    case 'active':
      return todos.filter(todo => !todo.completed);

    case 'completed':
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};

export const filterTodos = (
  todos: Todo[],
  { query, status }: FilterParams,
): Todo[] => {
  let todosCopy = [...todos];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    todosCopy = todosCopy.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  if (status) {
    todosCopy = filterTodosByStatus(todosCopy, status);
  }

  return todosCopy;
};
