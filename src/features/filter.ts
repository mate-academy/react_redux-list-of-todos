/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectOption: (filter, action: PayloadAction<string>) => {
      filter.status = action.payload;
    },
    setQueryFilter: (filter, action: PayloadAction<string>) => {
      filter.query = action.payload;
    },
    cleanQueryFilter: filter => {
      filter.query = '';
    },
  },
});

export default filterSlice.reducer;
export const { setSelectOption, setQueryFilter, cleanQueryFilter } =
  filterSlice.actions;
