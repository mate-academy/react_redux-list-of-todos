import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurrentTodo = Todo | null;

type Payload = PayloadAction<CurrentTodo>;

const initialState = null as CurrentTodo;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    changeCurrentTodo: (_currentTodo, { payload }: Payload) => payload,
  },
});
