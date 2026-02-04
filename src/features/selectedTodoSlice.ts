import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = null as number | null;

export const selectedTodoSlice = createSlice({
  name: 'selectedTodoId',
  initialState,
  reducers: {
    setSelectedTodoId: (state, action: PayloadAction<number>) => action.payload,
    clearSelectedTodoId: () => null,
  },
});

export const { setSelectedTodoId, clearSelectedTodoId } =
  selectedTodoSlice.actions;

export default selectedTodoSlice.reducer;
