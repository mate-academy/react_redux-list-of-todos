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
    filterStatus(state, { payload }: PayloadAction<FilterBy>) {
      return { ...state, status: payload };
    },
    filterQuery(state, { payload }: PayloadAction<string>) {
      return { ...state, query: payload };
    },
  },
});
