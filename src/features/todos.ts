import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (todos, action: PayloadAction<Todo[]>) => {
      action.payload.forEach((item => todos.push(item)));
    },
  },
});

export default todosSlice.reducer;
export const { actions } = todosSlice;
