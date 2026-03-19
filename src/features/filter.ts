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
    setQuery(state, action: PayloadAction<string>) {
      return {
        ...state,
        query: action.payload,
      };
    },
    setStatus(state, action: PayloadAction<Status>) {
      return {
        ...state,
        status: action.payload,
      };
    },
    clear(state) {
      return { ...state, query: '' };
    },
  },
});

export const { setQuery, setStatus, clear } = filterSlice.actions;

export default filterSlice.reducer;
