import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterBy } from '../types/FilterBy';

const initialState = {
  query: '',
  status: FilterBy.All,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterStatus(state, { payload }: PayloadAction<FilterBy>) {
      return { ...state, status: payload };
    },
    setFilterQuery(state, { payload }: PayloadAction<string>) {
      return { ...state, query: payload };
    },
  },
});

export const { setFilterStatus, setFilterQuery } = filterSlice.actions;
