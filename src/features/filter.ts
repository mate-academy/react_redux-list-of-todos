import { Status } from './../types/Status';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<Status>) => {
      return { ...state, status: payload };
    },
    setQuery: (state, { payload }: PayloadAction<string>) => {
      return { ...state, query: payload };
    },
  },
});

export const { setFilter, setQuery } = filterSlice.actions;
