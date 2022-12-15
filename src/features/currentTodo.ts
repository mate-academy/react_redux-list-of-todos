import { createSlice } from '@reduxjs/toolkit';

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: null,
  reducers: {
    setTodo: (...arg) => arg[1].payload,
    removeTodo: () => null,
  },
});

export default currentTodoSlice.reducer;
export const { actions } = currentTodoSlice;
