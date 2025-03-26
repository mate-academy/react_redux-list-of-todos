import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Status = 'all' | 'active' | 'completed';

type InitialState = {
  query: string;
  status: Status;
};

export const initialState: InitialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    setFilter: (state, action: PayloadAction<Status>) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setQuery, setFilter } = filterSlice.actions;
