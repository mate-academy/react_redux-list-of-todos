import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: Status.all,
};
/* eslint-disable no-param-reassign */
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state: FilterState, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStatus: (state: FilterState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

export const { actions } = filterSlice;

export default filterSlice.reducer;
