import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

interface FilterState {
  status: Status;
  query: string;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterByStatus(state, action: PayloadAction<Status>) {
      return {
        ...state,
        status: action.payload,
      };
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      return {
        ...state,
        query: action.payload,
      };
    },
    clearSearchQuery(state) {
      return {
        ...state,
        query: '',
      };
    },
  },
});

export const { filterByStatus, setSearchQuery, clearSearchQuery } =
  filterSlice.actions;
