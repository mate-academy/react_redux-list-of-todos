import { RootState } from '../app/store';
import { Todo } from '../types/Todo';

export const todosSelector = (state: RootState) => {
  const todos = state.todos;
  const { query, status } = state.filter;

  return todos
    .filter((todo: Todo) => {
      const statusMatch =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      return statusMatch;
    })
    .filter((todo: Todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
};
