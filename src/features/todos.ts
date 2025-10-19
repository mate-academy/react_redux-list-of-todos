import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodosState {
  items: Todo[];
  isLoading: boolean;
}

const initialState: TodosState = {
  items: [],
  isLoading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    startLoading: state => {
      state.isLoading = true;
    },
  },
});

export const { setTodos, startLoading } = todosSlice.actions;
export default todosSlice.reducer;
