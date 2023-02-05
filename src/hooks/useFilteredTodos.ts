import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';

export const useFilteredTodos = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  return useMemo(() => {
    return todos.filter(todo => {
      const isQueryMatched = todo.title.toLowerCase()
        .includes(query.toLowerCase());

      switch (status) {
        case 'active':
          return isQueryMatched && !todo.completed;

        case 'completed':
          return isQueryMatched && todo.completed;

        case 'all':
        default:
          return isQueryMatched;
      }
    });
  }, [todos, query, status]);
};
