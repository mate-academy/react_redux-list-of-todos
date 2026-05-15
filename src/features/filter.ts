/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all' as Status,
};

export function filterTodos(
  status: Status,
  query: string,
  todos: Todo[],
): Todo[] {
  const filteredTodos = todos.filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
      default:
        return true;
    }
  });

  return filteredTodos.filter(todo => {
    const fixedQuery = query.toLowerCase().trim();
    const fixedName = todo.title.toLowerCase();

    return fixedName.includes(fixedQuery);
  });
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, { payload }: PayloadAction<string>) {
      state.query = payload;
    },
    setStatus(state, { payload }: PayloadAction<Status>) {
      state.status = payload;
    },
  },
});
