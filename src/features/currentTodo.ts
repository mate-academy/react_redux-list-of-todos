import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurtTodo = Todo | null;

const initialState = null as CurtTodo;

export const currentTodoSlice: Slice<CurtTodo> = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (_, { payload }: PayloadAction<CurtTodo>) => payload,
    removeTodo: () => null,
  },
});
