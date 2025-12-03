import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    SET_QUERY(state, { payload }: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.query = payload;
    },
    SET_STATUS(state, { payload }: PayloadAction<Status>) {
      // eslint-disable-next-line no-param-reassign
      state.status = payload;
    },
  },
});
