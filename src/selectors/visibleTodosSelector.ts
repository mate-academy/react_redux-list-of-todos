import { createSelector } from 'reselect';
import { RootState } from '../app/store';
import { Todo } from '../types/Todo';

const selectTodos = (state: RootState) => state.todos.todos;
const selectQuery = (state: RootState) => state.filter.query;
const selectStatus = (state: RootState) => state.filter.status;

export const selectVisibleTodos = createSelector(
  [selectTodos, selectQuery, selectStatus],
  (todos: Todo[], query: string, status: string) => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  },
);
