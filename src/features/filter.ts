/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state: State, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStatus: (state: State, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});
