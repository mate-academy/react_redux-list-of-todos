import { useMemo } from 'react';
import { SORT } from '../types/Sort';

export const useSortAndSearch = (todos, sort, query) => {
  const modifiedTodos = useMemo(() => {
    return ((todos || [])
      .filter(todo => {
        switch (sort) {
          case SORT.Active:
            return !todo.completed;
          case SORT.Completed:
            return todo.completed;
          case SORT.All:
          default:
            return todo;
        }
      })
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    );
  }, [todos, sort, query]);

  return modifiedTodos;
};
