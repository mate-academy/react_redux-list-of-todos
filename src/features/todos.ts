import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (todos, { payload }: PayloadAction<Todo[]>) => {
      // eslint-disable-next-line no-param-reassign
      todos.push(...payload);
    },
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
