import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [] as Todo[],
    loading: true,
  },
  reducers: {
    loadTodos: (state, action: PayloadAction<Todo[]>) => ({
      ...state,
      todos: action.payload,
      loading: false,
    }),
  },
});
