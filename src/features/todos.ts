import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = {
  items: Todo[];
  isLoading: boolean;
};

const initialState: TodosState = {
  items: [],
  isLoading: true,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      return {
        items: action.payload,
        isLoading: false,
      };
    },
  },
});
