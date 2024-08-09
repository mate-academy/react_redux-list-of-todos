import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(todos, action: PayloadAction<Todo[]>) {
      todos.push(...action.payload);
    },
  },
});
