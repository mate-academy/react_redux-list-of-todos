import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all' as Status,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = payload;
    },
    setStatus: (state, { payload }: PayloadAction<Status>) => {
      // eslint-disable-next-line no-param-reassign
      state.status = payload;
    },
  },
});
