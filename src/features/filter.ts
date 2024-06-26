import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
