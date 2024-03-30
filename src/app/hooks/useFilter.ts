import { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../hooks';

export const useFilter = (todos: Todo[]) => {
  const filter = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(() => {
    switch (filter.status) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'all':
      default:
        return todos;
    }
  }, [filter.status, todos]);

  const filteredByQuery = useMemo(() => {
    return filteredTodos.filter(todo => todo.title.includes(filter.query));
  }, [filteredTodos, filter.query]);

  return filteredByQuery;
};
