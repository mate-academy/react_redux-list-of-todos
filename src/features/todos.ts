import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (value: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: value,
});

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    fetchTodos(state: Todo[], action: PayloadAction<Todo[]>) {
      state.push(...action.payload);
    },
  },
});

export const actions = { setTodos };

export const { fetchTodos } = todosSlice.actions;
