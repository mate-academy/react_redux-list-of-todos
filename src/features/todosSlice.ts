/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface TodosState {
  todos: Todo[];
  isLoading: boolean;
  isModalOpen: boolean;
}

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  isModalOpen: false,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    openModal: state => {
      state.isModalOpen = true;
    },
    closeModal: state => {
      state.isModalOpen = false;
    },
  },
});

export const { setTodos, setIsLoading, openModal, closeModal } =
  todosSlice.actions;
export default todosSlice.reducer;
export type { TodosState };
