import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: 'all' as Status,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    setStatus: (state, action: PayloadAction<Status>) => ({
      ...state,
      status: action.payload,
    }),
    clearFilter: () => initialState,
  },
});

export const { setQuery, setStatus, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
