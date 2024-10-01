import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type Status = 'all' | 'completed' | 'active';

export type Filter = {
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
    addStatus: (state: Filter, action: PayloadAction<Status>) => ({
      ...state,
      status: action.payload,
    }),
    addQuery: (state: Filter, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    removeQuery: (state: Filter): Filter => ({
      ...state,
      query: '',
    }),
  },
});
