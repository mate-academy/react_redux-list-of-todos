/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isModaloOpen: boolean;
};

const initialState: InitialState = {
  isModaloOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModaloOpen = true;
    },
    closeModal: (state) => {
      state.isModaloOpen = false;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
