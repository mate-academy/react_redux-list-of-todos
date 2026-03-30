import { useMemo } from 'react';
import { Todo, Status } from '../types/all_Types';

export const useFilters = (todos: Todo[], status: Status, query: string) => {
  return useMemo(() => {
    if (!todos || !Array.isArray(todos)) {
      return [];
    }

    let filtered = [...todos];

    // Фильтрация по статусу
    if (status !== 'all') {
      filtered = filtered.filter(todo =>
        status === 'completed' ? todo.completed : !todo.completed,
      );
    }

    // Фильтрация по поисковому запросу
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();

      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(lowerQuery),
      );
    }

    return filtered;
  }, [todos, status, query]);
};
