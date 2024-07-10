import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    loadTodos: (_todos, { payload }: PayloadAction<Todo[]>) => {
      return payload;
    },
  },
});

export default todosSlice.reducer;
export const { actions } = todosSlice;
