import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all' as Status,
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<Status>) => {
      state.status = payload;
    },
    setQuerty: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },
    clearQuerty: state => {
      state.query = '';
    },
  },
});
