import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Statuses = 'all' | 'active' | 'completed';

type FilterState = {
  query: string;
  status: Statuses;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    status: (state, action: PayloadAction<Statuses>) => ({
      ...state,
      status: action.payload,
    }),
    query: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    clearQuery: state => ({
      ...state,
      query: '',
    }),
  },
});
