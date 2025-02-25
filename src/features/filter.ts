/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    query: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    status: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});
