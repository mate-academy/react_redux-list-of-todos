import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

const initialState = {
  currentTodo: null as Todo | null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      return {
        ...state,
        currentTodo: action.payload,
      };
    },
    deleteCurrentTodo: state => {
      return {
        ...state,
        currentTodo: null,
      };
    },
  },
});

export const selectedTodo = (state: RootState) => state.currentTodo.currentTodo;
export const { setCurrentTodo, deleteCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
