import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: null as Todo | null,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      return action.payload;
    },
  },
});

export default currentTodoSlice.reducer;

//містить зразок усіх необхідних типів;
