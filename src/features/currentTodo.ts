import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    showModal: (_state, action) => {
      return action.payload;
    },

    closeModal: () => {
      return null;
    },
  },
});

export const { showModal, closeModal } = currentTodoSlice.actions;
