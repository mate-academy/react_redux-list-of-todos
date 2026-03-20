import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    add: (state, action: PayloadAction<Todo>) => {
      return [...state, action.payload];
    },
    remove: (state, action: PayloadAction<number>) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    update: (state, action: PayloadAction<Todo>) => {
      return state.map(todo =>
        todo.id === action.payload.id ? action.payload : todo,
      );
    },
  },
});

export const { actions } = todosSlice;
export default todosSlice.reducer;
