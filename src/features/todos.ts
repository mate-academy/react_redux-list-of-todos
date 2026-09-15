import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

type TodosState = {
  items: Todo[];
  loading: boolean;
  error: string;
};

const initialState: TodosState = {
  items: [],
  loading: false,
  error: '',
};

// A thunk is an action creator that can run async code (here, the fetch)
// before dispatching a plain action. RTK auto-dispatches
// todos/fetchTodos/pending, /fulfilled or /rejected around it.
export const fetchTodos = createAsyncThunk('todos/fetchTodos', () =>
  getTodos(),
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  // Redux Toolkit wraps reducers in Immer, so mutating `state` in each
  // case below is safe and produces an immutable update behind the scenes.
  /* eslint-disable no-param-reassign */
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error.message || 'Unable to load todos';
        state.loading = false;
      });
  },
  /* eslint-enable no-param-reassign */
});

export const todosReducer = todosSlice.reducer;
