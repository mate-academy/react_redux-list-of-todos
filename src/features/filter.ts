import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

    setStatus(state, action) {
      return { ...state, status: action.payload };
    },

    clearQuery: state => {
      return { ...state, query: '' };
    },
  },
});
