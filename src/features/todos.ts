import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

// interface TodoState {
//   todos: Todo[];
// }

// const initialState: TodoState = {

// };

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    fetchTodos(state, action: PayloadAction<Todo[]>) {
      state.push(...action.payload);
    },
  },
});

export const { fetchTodos } = todosSlice.actions;
