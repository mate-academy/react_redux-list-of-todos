import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

const initialState = {
  query: '',
  status: Status.all,
};

type FilterState = {
  query: string;
  status: Status;
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      return {
        ...state,
        status: action.payload,
      };
    },

    setQuery: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },
  },
});

export const { setStatus, setQuery } = filterSlice.actions;
export default filterSlice;
