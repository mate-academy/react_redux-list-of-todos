import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (value, action) => {
      return { status: action.payload, query: value.query };
    },

    setQuery: (value, action) => {
      return { status: value.status, query: action.payload };
    },
  },
});

export default filterSlice.reducer;

export const { actions } = filterSlice;
