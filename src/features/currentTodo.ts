import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type InitialStateType = {
  todo: null | Todo;
  user: null |User;
  isModalOpened: boolean;
  modalLoading: boolean;
};

const initialState: InitialStateType = {
  todo: null,
  user: null,
  isModalOpened: false,
  modalLoading: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.isModalOpened = action.payload;
    },
    setModalLoading: (state, action) => {
      state.modalLoading = action.payload;
    },
    setCurrentTodo: (state, action) => {
      state.todo = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default currentTodoSlice.reducer;
export const { actions } = currentTodoSlice;
