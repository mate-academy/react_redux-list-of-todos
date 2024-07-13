import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice: Slice<Todo | null> = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setSelectedTodo: (_, { payload }: PayloadAction<Todo | null>) => payload,
    closeTodo: () => null,
  },
});
