import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  status: Status,
  query: string,
) => {
  let preparedTodos = [...todos];

  if (query) {
    const lowerQuery = query.toLowerCase();

    preparedTodos = preparedTodos
      .filter(todo => todo.title.toLowerCase().includes(lowerQuery));
  }

  preparedTodos = preparedTodos.filter(todo => {
    switch (status) {
      case 'all':
        return true;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        throw new Error('Filter type is incorrect');
    }
  });

  return preparedTodos;
};
