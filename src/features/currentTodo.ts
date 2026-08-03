import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodoState = {
  item: Todo | null;
  loading: boolean;
};

const initialState: TodoState = {
  item: null as Todo | null,
  loading: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo(state, action: PayloadAction<Todo | null>) {
      return {
        ...state,
        item: action.payload,
      };
    },
    setTodoLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const { setTodo, setTodoLoading } = currentTodoSlice.actions;

export default currentTodoSlice.reducer;
