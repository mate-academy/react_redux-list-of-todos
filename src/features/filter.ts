import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateQuery(state, { payload }: PayloadAction<string>) {
      return { ...state, query: payload };
    },
    updateStatus(state, { payload }: PayloadAction<Status>) {
      return { ...state, status: payload };
    },
  },
});
