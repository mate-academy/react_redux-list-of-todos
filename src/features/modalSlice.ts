import { createSlice, Slice } from '@reduxjs/toolkit';

type ModalState = {
  isOpen: boolean;
};

const initialState: ModalState = {
  isOpen: false,
};

export const modalSlice: Slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: state => {
      // eslint-disable-next-line no-param-reassign
      state.isOpen = true;
    },

    closeModal: state => {
      // eslint-disable-next-line no-param-reassign
      state.isOpen = false;
    },
  },
});
