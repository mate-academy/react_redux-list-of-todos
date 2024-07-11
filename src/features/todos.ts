import { PayloadAction, Reducer, Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    loadTodos: (_todos, { payload }: PayloadAction<Todo[]>) => {
      return payload;
    },
  },
});

export default todosSlice.reducer as Reducer<Todo[]>;
