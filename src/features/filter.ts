/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoStatusFilter } from '../constants/StatusFilter';

type FilterState = {
  query: string;
  status: TodoStatusFilter;
};

const initialState: FilterState = {
  query: '',
  status: TodoStatusFilter.All,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearQuery: state => {
      state.query = '';
    },
    setStatus: (state, action: PayloadAction<TodoStatusFilter>) => {
      state.status = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { actions } = filterSlice;
