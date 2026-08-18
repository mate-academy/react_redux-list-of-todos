import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: Status.All,
};

export const filterSlice = createSlice({
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
  },
});

export const { setQuery, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
