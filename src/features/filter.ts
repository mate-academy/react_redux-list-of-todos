import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    SET_STATUS: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    SET_QUERY: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});
