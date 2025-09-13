import { RootState } from '../app/store';
import { FilterStatus } from '../types/Status';
import { Todo } from '../types/Todo';

export const selectTodos = (state: RootState) => state.todos;

export const selectFilter = (state: RootState): FilterStatus => state.filter;

export const selectFilteredTodos = (state: RootState): Todo[] => {
  const todos = selectTodos(state);
  const { status, query } = selectFilter(state);

  return todos
    .filter(todo => {
      if (status === 'completed') {
        return todo.completed;
      }

      if (status === 'active') {
        return !todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
};
