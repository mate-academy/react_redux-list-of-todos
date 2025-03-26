/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: Status.All,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<Status>) => {
      return { ...state, status: action.payload };
    },
    addQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    clearQuery: state => {
      return { ...state, query: initialState.query };
    },
  },
});

export const { addQuery, clearQuery, changeStatus } = filterSlice.actions;

export default filterSlice.reducer;
