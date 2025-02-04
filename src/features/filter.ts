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
    setStatus(state: Filter, action: PayloadAction<Status>): Filter {
      return { ...state, status: action.payload };
    },
    setQuery(state: Filter, action: PayloadAction<string>): Filter {
      return { ...state, query: action.payload };
    },
  },
});
