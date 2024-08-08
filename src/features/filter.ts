import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { FilterType } from '../types/FilterType';
import { Status } from '../types/Status';

interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setQuery: (state: FilterState, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    setStatus: (state: FilterState, action: PayloadAction<Status>) => {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
