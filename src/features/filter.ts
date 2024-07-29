import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: 'all',
};

export interface FilterState {
  query: string;
  status: Status;
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<Status>) => {
      return {
        ...state,
        status: action.payload,
      };
    },
    setQueryFilter: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },
  },
});

export const { setStatusFilter, setQueryFilter } = filterSlice.actions;
export default filterSlice.reducer;
