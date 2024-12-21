/* eslint-disable */
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
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});
export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
