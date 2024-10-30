import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentTodoState = number;

const initialState: CurrentTodoState = 0;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodoId: (_, { payload }: PayloadAction<CurrentTodoState>) => payload,
  },
});
