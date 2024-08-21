import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type Filter = {
  query: string;
  status: Status;
};

const initialState: Filter = {
  query: '',
  status: Status.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state: Filter, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),

    clearQuery: (state: Filter) => ({ ...state, query: '' }),

    setStatus: (state: Filter, action: PayloadAction<Status>) => ({
      ...state,
      status: action.payload,
    }),
  },
});
