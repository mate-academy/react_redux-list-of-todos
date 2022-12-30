/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  searchValue: string;
  optionValue: string;
};

const initialState: InitialState = {
  searchValue: '',
  optionValue: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    searchFilter: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    optionFilter: (state, action: PayloadAction<string>) => {
      state.optionValue = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { searchFilter, optionFilter } = filterSlice.actions;
