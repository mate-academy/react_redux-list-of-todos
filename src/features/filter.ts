import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type Filter = {
  query: string;
  status: Status;
};

const initialState: Filter = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (filter, action: PayloadAction<Status>) => {
      filter.status = action.payload;
    },
    setQuery: (filter, action: PayloadAction<string>) => {
      filter.query = action.payload;
    },
  },
});

export const { setFilter, setQuery } = filterSlice.actions;
export default filterSlice.reducer;
