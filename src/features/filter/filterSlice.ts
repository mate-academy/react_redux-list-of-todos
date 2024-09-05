/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filter } from '../../enums/Filter';

export interface FilterState {
  status: Filter;
  query: string;
}

const initialState: FilterState = {
  status: Filter.All,
  query: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Filter>) => {
      state.status = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setStatus, setQuery } = filterSlice.actions;

export default filterSlice.reducer;
