import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterStatus = 'all' | 'completed' | 'active';

type FilterState = {
  query: string;
  status: FilterStatus;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state: FilterState, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStatus: (state: FilterState, action: PayloadAction<FilterStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice;
