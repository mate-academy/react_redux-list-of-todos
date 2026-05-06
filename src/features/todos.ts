import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getTodos } from '../api';
import { Todo } from '../types/Todo';

interface TodosState {
  items: Todo[];
  loading: boolean;
}

const initialState: TodosState = { items: [], loading: false };

export const init = createAsyncThunk('todos/fetch', () => {
  return getTodos();
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    update: (state, action: PayloadAction<Todo>) => {
      const index = state.items.findIndex(
        todo => todo.id === action.payload.id,
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
    });
  },
});

export const { add, remove, update } = todosSlice.actions;
export default todosSlice.reducer;
