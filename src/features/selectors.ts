import { RootState } from '../app/store';
import { Todo } from '../types/Todo';
import { FilterState } from './filter';

export const selectTodos = (state: RootState) => state.todos;

export const selectFilter = (state: RootState): FilterState => state.filter;

export const selectFilteredTodos = (state: RootState): Todo[] => {
  const todos = selectTodos(state);
  const { status, query } = selectFilter(state);

  return todos
    .filter(todo => {
      if (status === 'all') {
        return true;
      }

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
