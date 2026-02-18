import { Status } from '../types/Status';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
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
