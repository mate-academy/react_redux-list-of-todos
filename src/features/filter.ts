/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type FilterState = {
  query: string;
  status: Status;
  filteredTodos: Todo[];
};

const initialState: FilterState = {
  query: '',
  status: 'all',
  filteredTodos: [] as Todo[],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },

    filterByStatus(state, action: PayloadAction<Todo[]>) {
      const todos = action.payload;

      switch (state.status) {
        case 'active':
          state.filteredTodos = todos.filter(todo => !todo.completed);
          break;

        case 'completed':
          state.filteredTodos = todos.filter(todo => todo.completed);
          break;

        case 'all':
          state.filteredTodos = todos;
          break;

        default:
      }

      if (state.query) {
        state.filteredTodos = state.filteredTodos.filter(todo =>
          todo.title.toLowerCase().includes(state.query.toLowerCase()),
        );
      }
    },
  },
});

export const { setStatus, setQuery, filterByStatus } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
