import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  const filteredTodosByQuery = todos.filter(
    todo => todo.title.toLowerCase()
      .includes(query.toLowerCase().trim()),
  );

  switch (status) {
    case 'active':
      return filteredTodosByQuery.filter(todo => !todo.completed);

    case 'completed':
      return filteredTodosByQuery.filter(todo => todo.completed);

    default:
      return filteredTodosByQuery;
  }
};
