import { Todo } from '../types/Todo';
import { TodoState } from '../types/TodoState';

export const getPreparedTodos = (
  todosFromServer: Todo[],
  { inputQuery, selectQuery }: { inputQuery: string; selectQuery: TodoState },
) => {
  let filteredTodos = todosFromServer;
  const preparedInputQuery = inputQuery.trim().toLowerCase();

  if (preparedInputQuery) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(preparedInputQuery),
    );
  }

  if (selectQuery !== TodoState.ALL) {
    if (selectQuery === TodoState.COMPLETED) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    if (selectQuery === TodoState.ACTIVE) {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }
  }

  return filteredTodos;
};
