import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Status } from '../../types/Status';

type Filter = {
  query: string;
  status: Status;
};

const initialState: Filter = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state: Filter, action: PayloadAction<Status>): Filter => ({
      ...state,
      status: action.payload,
    }),
    setQuery: (state: Filter, action: PayloadAction<string>): Filter => ({
      ...state,
      query: action.payload,
    }),
    clearQuery: (state: Filter): Filter => ({ ...state, query: '' }),
  },
});

export const { setFilter, setQuery, clearQuery } = filterSlice.actions;
