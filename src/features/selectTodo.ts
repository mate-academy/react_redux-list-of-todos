import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Quary {
  todo: number | null,
}

const initialState: Quary = {
  todo: null,
};

const selectTodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setSelectedTodo(state, action: PayloadAction<number | null>) {
      // eslint-disable-next-line no-param-reassign
      state.todo = action.payload;
    },
  },
});

export const { setSelectedTodo } = selectTodoSlice.actions;
export default selectTodoSlice.reducer;
