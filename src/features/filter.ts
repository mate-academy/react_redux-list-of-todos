import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface InitialState {
  query: string;
  status: Status;
}

const initialState: InitialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    changeStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});
