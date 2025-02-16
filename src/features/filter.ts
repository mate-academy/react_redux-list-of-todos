import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterTypes } from '../types/FilterTypes';

const initialState = {
  query: '',
  status: FilterTypes.all,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, { payload }: PayloadAction<string>) {
      return { ...state, query: payload };
    },
    setFilter(state, { payload }: PayloadAction<FilterTypes>) {
      return { ...state, status: payload };
    },
  },
});
