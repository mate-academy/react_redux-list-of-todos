/* eslint-disable no-param-reassign */

import {
  // createAsyncThunk,
  createSlice,
  // Dispatch,
  PayloadAction,
} from '@reduxjs/toolkit';
// import { createSelector } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
// import { getTodos } from '../api';
// import { RootState } from '../app/store';

type TodosState = {
  todos: Todo[];
  isLoading: boolean;
  error: string;
};

const initState: TodosState = {
  todos: [],
  isLoading: false,
  error: '',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initState,
  reducers: {
    setTodos: (todos, action: PayloadAction<Todo[]>) => {
      todos.todos = action.payload;
    },
    setError: (todos, action: PayloadAction<string>) => {
      todos.error = action.payload;
    },
    setLoading: (todos, action: PayloadAction<boolean>) => {
      todos.isLoading = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(init.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(init.fulfilled, (state, action) => {
  //     state.todos = action.payload;
  //     state.isLoading = false;
  //   });
  //   builder.addCase(init.rejected, (state, action) => {
  //     state.error = action.error.message || 'Something went wrong';
  //     state.isLoading = false;
  //   });
  // },
});

export const { actions } = todosSlice;
export default todosSlice.reducer;

// export const init = createAsyncThunk('todos/fetch', () => {
//   return getTodos();
// });

// const selectStatus = (state: RootState) => state.filter.status;
// const selectQuery = (state: RootState) => state.filter.query;
// const selectTodos = (state: RootState) => state.todos.todos;

// export const selectFilteredTodos = createSelector(
//   [selectStatus, selectQuery, selectTodos],
//   (status, query, todos) => {
//     if (status !== 'all') {
//       todos = todos.filter(todo => {
//         if (status === 'active') {
//           return !todo.completed;
//         } else {
//           return todo.completed;
//         }
//       });
//     }

//     if (query) {
//       todos = todos.filter(todo => todo.title.includes(query));
//     }

//     return todos;
//   },
// );
