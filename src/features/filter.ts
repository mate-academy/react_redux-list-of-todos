import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus: (s, { payload }) => ({ ...s, status: payload }),
    changeQuery: (s, { payload }) => ({ ...s, query: payload }),
    clearQuery: s => ({ ...s, query: '' }),
  },
});
