import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodosList: (_, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const { setTodosList } = todosSlice.actions;
export default todosSlice;
