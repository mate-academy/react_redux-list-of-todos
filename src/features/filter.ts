import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

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
    setQuery: (state: Filter, action: PayloadAction<string>): Filter => ({
      ...state,
      query: action.payload,
    }),
    setStatus: (state: Filter, action: PayloadAction<Status>): Filter => ({
      ...state,
      status: action.payload,
    }),
  },
});
