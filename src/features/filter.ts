import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Filter = {
  query: string;
  status: string;
};

const initialState: Filter = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    status: (state: Filter, action: PayloadAction<string>) => ({
      ...state,
      status: action.payload,
    }),
    query: (state: Filter, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
  },
});

export const { actions } = filterSlice;
