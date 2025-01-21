import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;

export default filterSlice.reducer;
