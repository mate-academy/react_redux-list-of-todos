import { CompletionQuery } from '../types/CompletionQuery';
import { Todo } from '../types/Todo';

type QueryType = {
  query: string;
  status: CompletionQuery;
};

export const getPreparedTodos = (
  todos: Todo[],
  { query, status }: QueryType,
) => {
  let preparedTodos = [...todos];

  const normalizedSearchQuery = query.trim().toLowerCase();

  if (normalizedSearchQuery !== '') {
    preparedTodos = preparedTodos.filter(todo => {
      const normalizedTodo = todo.title.toLowerCase();

      return normalizedTodo.includes(normalizedSearchQuery);
    });
  }

  if (status !== 'all') {
    preparedTodos = preparedTodos.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
      }
    });
  }

  return preparedTodos;
};
