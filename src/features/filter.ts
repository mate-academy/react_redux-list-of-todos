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
    setSearchQuery(state, action: PayloadAction<string>) {
      return {
        ...state,
        query: action.payload,
      };
    },
    setFilterStatus(state, action: PayloadAction<Status>) {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const { setFilterStatus, setSearchQuery } = filterSlice.actions;
export default filterSlice.reducer;
