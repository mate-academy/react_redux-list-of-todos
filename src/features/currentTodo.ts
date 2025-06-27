/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

const initialState = {
  currentItem: null as Todo | null,
  loadingModal: false as boolean,
  user: null as User | null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodo(state, action: PayloadAction<Todo | null>) {
      state.currentItem = action.payload;
      state.loadingModal = false;
    },

    setLoadingModal(state, action: PayloadAction<boolean>) {
      state.loadingModal = action.payload;
    },

    clearTodo(state) {
      state.currentItem = null;
      state.loadingModal = false;
    },

    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { selectTodo, clearTodo, setLoadingModal, setUser } =
  currentTodoSlice.actions;
export default currentTodoSlice.reducer;
