import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    currentTodo(_, { payload }: PayloadAction<Todo>) {
      return payload;
    },
    deleteTodo(_, { payload }: PayloadAction<null>) {
      return payload;
    },
  },
});
