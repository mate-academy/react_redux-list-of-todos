import { createSelector } from '@reduxjs/toolkit';
import { FilterParams } from '../types/FilterParams';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

export const selectPreparedTodos = createSelector(
  [(state: RootState) => state.todos, (state: RootState) => state.filter],
  (todos: Todo[], filterParams: FilterParams) => {
    const { query, status } = filterParams;

    let preparedTodos = [...todos];

    switch (status) {
      case 'active':
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (query) {
      preparedTodos = preparedTodos.filter(todo =>
        todo.title
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase().trim()),
      );
    }

    return preparedTodos;
  },
);
