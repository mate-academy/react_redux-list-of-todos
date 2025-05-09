import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { isOpen: boolean; selectedTodoId: number | null } = {
  isOpen: false,
  selectedTodoId: null,
};

/* eslint-disable no-param-reassign */
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<number>) {
      state.isOpen = true;
      state.selectedTodoId = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.selectedTodoId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
