import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
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

    clearQuery: state => {
      // eslint-disable-next-line no-param-reassign
      state.query = '';
    },
  },
});

export const { setQuery, setStatus, clearQuery } = filterSlice.actions;
