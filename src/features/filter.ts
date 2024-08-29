/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FiltersState = {
  query: string;
  status: Status;
};

const initialState: FiltersState = {
  query: '',
  status: Status.all,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setStatus, setQuery } = filterSlice.actions;
export default filterSlice.reducer;
