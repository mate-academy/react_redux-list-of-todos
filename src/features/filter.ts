import { createSlice } from '@reduxjs/toolkit';

type FilterState = {
  query: string;
  status: string;
};
const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
    setQuery: (state, action) => {
      return { ...state, query: action.payload };
    },
    clearQuery: state => {
      return { ...state, query: '' };
    },
  },
});

export default filterSlice.reducer;
export const filterActions = filterSlice.actions;
