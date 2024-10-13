import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilterStatus: (state, action: PayloadAction<Status>) => {
      return { ...state, status: action.payload };
    },
    changeFilterQuery: (state, action: PayloadAction<string>) => {
      return { ...state, query: action.payload };
    },
    clearFilterQuery: state => {
      return { ...state, query: '' };
    },
  },
});

export const { changeFilterStatus, changeFilterQuery, clearFilterQuery } =
  filterSlice.actions;
export default filterSlice;
