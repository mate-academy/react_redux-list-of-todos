/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: Status.all,
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;

export default filterSlice.reducer;
