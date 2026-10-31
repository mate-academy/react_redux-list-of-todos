import { createSlice } from '@reduxjs/toolkit';

type FilterStatus = 'all' | 'active' | 'completed';

type FilterState = {
  query: string;
  status: FilterStatus;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: { payload: string }) => {
      return {
        ...state,
        query: action.payload,
      };
    },

    setStatus: (state, action: { payload: FilterStatus }) => {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
