import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = {
  items: Todo[];
};

const initialState: TodosState = {
  items: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => ({
      ...state,
      items: action.payload,
    }),
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
