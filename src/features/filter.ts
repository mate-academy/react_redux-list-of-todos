import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { FilterState } from '../types/Slice';

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => ({
      ...state,
      status: action.payload,
    }),
    setQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
  },
});

export const { setStatus, setQuery } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
