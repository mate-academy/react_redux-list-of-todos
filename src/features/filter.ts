/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectStatusTodos } from '../types/SelectStatusTodos';

type FilterState = {
  query: string;
  status: SelectStatusTodos;
};

const initialState: FilterState = {
  query: '',
  status: SelectStatusTodos.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },
    clearQuery: state => {
      state.query = '';
    },
    setStatus: (state, { payload }: PayloadAction<SelectStatusTodos>) => {
      state.status = payload;
    },
  },
});

export const { setQuery, setStatus, clearQuery } = filterSlice.actions;
