import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (_state, action: PayloadAction<Todo[]>) => action.payload,
  },
});

// Експортуємо дії
export const { setTodos } = todosSlice.actions;

// Експортуємо reducer
export default todosSlice.reducer;
