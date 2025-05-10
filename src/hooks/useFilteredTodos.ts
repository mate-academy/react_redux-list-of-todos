import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Status } from '../types/Status';

export const useFilteredTodos = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const filter = useSelector((state: RootState) => state.filter.status);
  const query = useSelector((state: RootState) => state.filter.query);

  return useMemo(() => {
    const filteredBy = (() => {
      switch (filter) {
        case Status.Completed:
          return todos.filter(todo => todo.completed);

        case Status.Active:
          return todos.filter(todo => !todo.completed);

        default:
          return todos;
      }
    })();

    return (
      filteredBy.filter(todo =>
        todo.title.toLowerCase().includes(query.trim().toLowerCase()),
      ) || []
    );
  }, [todos, filter, query]);
};
