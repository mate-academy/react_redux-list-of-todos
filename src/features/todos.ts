/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  items: [] as Todo[],
  loading: false as boolean,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      const idx = state.items.findIndex(todo => todo.id === action.payload.id);

      if (idx !== -1) {
        state.items[idx] = action.payload;
      }
    },
  },
});

export const { setTodos, updateTodo, setLoading } = todosSlice.actions;
export default todosSlice.reducer;
