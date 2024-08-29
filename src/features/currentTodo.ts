import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

// type CurrentTodoState = {
//   currentTodo: Todo | null;
// };

// const initialState: CurrentTodoState = {
//   todos: [],
// };

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_, action: PayloadAction<Todo | null>) => action.payload,
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
