import { useMemo } from 'react';
import { Sort } from '../types/Sort';

export const useSortAndSearch = (todos, sort, query) => {
  const modifiedTodos = useMemo(() => {
    return ((todos || [])
      .filter(todo => {
        switch (sort) {
          case Sort.active:
            return !todo.completed;
          case Sort.completed:
            return todo.completed;
          case Sort.all:
          default:
            return todo;
        }
      })
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    );
  }, [todos, sort, query]);

  return modifiedTodos;
};
