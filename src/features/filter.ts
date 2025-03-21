import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterSelect: (state, action) => {
      return { ...state, status: action.payload };
    },
    setFilterSearch: (state, action) => {
      return { ...state, query: action.payload };
    },
  },
});
