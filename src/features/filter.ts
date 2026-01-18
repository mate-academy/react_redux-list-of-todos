import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState: {
  query: string;
  status: Status;
} = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action) {
      return { ...state, query: action.payload };
    },

    changeStatus(state, action: PayloadAction<Status>) {
      return { ...state, status: action.payload };
    },
  },
});

export const { changeStatus, setQuery } = filterSlice.actions;

export default filterSlice.reducer;
