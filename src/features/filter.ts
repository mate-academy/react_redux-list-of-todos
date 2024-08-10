import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: Status.all,
};

type FilterState = {
  query: string;
  status: Status;
};

export const filterSlice: Slice<FilterState> = createSlice({
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
