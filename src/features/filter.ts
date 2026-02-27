import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterStatus } from '../types/Status';

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
    setStatus(state, action: PayloadAction<FilterStatus>) {
      /* eslint-disable no-param-reassign */
      state.status = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      /* eslint-disable no-param-reassign */
      state.query = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setStatus, setQuery } = filterSlice.actions;
