import { createSlice } from '@reduxjs/toolkit';

export type FilterStatus = 'all' | 'completed' | 'planned';

interface FilterState {
  query: string;
  status: FilterStatus;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterStatus: (state, action) => {
      return { ...state, ...action.payload };
    },
    setFilterQuery: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearFilterQuery: state => {
      return { ...state, query: '' };
    },
  },
});

export const { setFilterStatus, setFilterQuery, clearFilterQuery } =
  filterSlice.actions;
