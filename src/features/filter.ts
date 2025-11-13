import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Status = 'all' | 'active' | 'completed';

const initialState = {
  query: '',
  status: 'all' as Status,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      return {
        ...state,
        query: action.payload,
      };
    },
    setStatus(state, action: PayloadAction<Status>) {
      return {
        ...state,
        status: action.payload,
      };
    },
    clearFilter(state) {
      return {
        ...state,
        query: '',
        status: 'all',
      };
    },
  },
});

export const { setQuery, setStatus, clearFilter } = filterSlice.actions;
