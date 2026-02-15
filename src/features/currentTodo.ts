import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types/Todo";

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: "currentTodo",
  initialState,
  reducers: {
    checkCurrentTodo(_, { payload }: PayloadAction<Todo>) {
      return payload;
    },
    unCheckCurrentTodo() {
      return null;
    },
  },
});
