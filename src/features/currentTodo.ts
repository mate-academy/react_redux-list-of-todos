import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialValue = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: { value: initialValue },
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
