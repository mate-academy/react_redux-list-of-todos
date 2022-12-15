import { createSlice } from '@reduxjs/toolkit/dist';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (...arg) => arg[1].payload,
  },
});

export default todosSlice.reducer;
export const { actions } = todosSlice;
