import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus: (state, action) => ({
      ...state,
      status: action.payload,
    }),
    changeQuery: (state, action) => ({
      ...state,
      query: action.payload,
    }),
  },
});

export const { changeQuery, changeStatus } = filterSlice.actions;
