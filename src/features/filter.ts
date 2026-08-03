import { createSlice } from '@reduxjs/toolkit';

type FilterState = {
  query: string;
  status: 'all' | 'active' | 'completed';
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus(state, action) {
      return {
        ...state,
        status: action.payload,
      };
    },
    setQuery(state, action) {
      return {
        ...state,
        query: action.payload,
      };
    },
  },
});

export const { setStatus, setQuery } = filterSlice.actions;
export default filterSlice.reducer;
