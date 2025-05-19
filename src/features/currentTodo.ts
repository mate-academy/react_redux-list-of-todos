import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (state, { payload }: PayloadAction<Todo>) => {
      return { ...state, ...payload };
    },
    deleteTodo() {
      return null;
    },
  },
});
