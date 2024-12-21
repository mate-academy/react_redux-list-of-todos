import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    get: (currentTodo: Todo | null, { payload }: PayloadAction<Todo>) => {
      return payload;
    },
    clear: () => null,
  },
});
