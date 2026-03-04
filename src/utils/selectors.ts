import { createSelector } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

const sortFn: Record<Exclude<Status, 'all'>, (todo: Todo) => boolean> = {
  completed: todo => todo.completed,
  active: todo => !todo.completed,
};

export const getFilteredTodos = createSelector(
  (state: RootState) => state.todos.todos,
  (state: RootState) => state.filter,
  (todos, filter) => {
    const filteredTodos =
      filter.status === 'all'
        ? [...todos]
        : todos.filter(sortFn[filter.status]);

    return filteredTodos.filter((todo: Todo) =>
      todo.title.toLowerCase().includes(filter.query.toLowerCase()),
    );
  },
);
