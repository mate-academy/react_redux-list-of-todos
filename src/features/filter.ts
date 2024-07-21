import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setQueryFilter: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setQueryFilter, setStatusFilter } = filterSlice.actions;
