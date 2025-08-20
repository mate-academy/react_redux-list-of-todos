/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { FilterField } from '../types/FilterField';

export const { reducer, actions } = createSlice({
  name: 'filter',
  initialState: {
    filterField: FilterField.All,
    query: '',
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearQuery: state => {
      state.query = '';
    },
    setStatus: (state, action) => {
      state.filterField = action.payload;
    },
  },
});

export const { setQuery, clearQuery, setStatus } = actions;
export default reducer;
